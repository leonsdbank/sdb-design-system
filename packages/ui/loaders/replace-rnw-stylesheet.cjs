/**
 * Custom webpack/Turbopack loader that replaces react-native-web's
 * createOrderedCSSStyleSheet with a version that wraps base styles
 * in @layer rnw, so Tailwind utilities always take priority.
 *
 * This is the same approach Uniwind's Vite plugin uses.
 */
module.exports = function () {
  return `
var slice = Array.prototype.slice;

function originalCreateOrderedCSSStyleSheet(sheet) {
  var groups = {};
  var selectors = {};
  if (sheet != null) {
    var group;
    slice.call(sheet.cssRules).forEach(function(cssRule, i) {
      var cssText = cssRule.cssText;
      if (cssText.indexOf('stylesheet-group') > -1) {
        group = decodeGroupRule(cssRule);
        groups[group] = { start: i, rules: [cssText] };
      } else {
        var selectorText = getSelectorText(cssText);
        if (selectorText != null) {
          selectors[selectorText] = true;
          groups[group].rules.push(cssText);
        }
      }
    });
  }
  function sheetInsert(sheet, group, text) {
    var orderedGroups = getOrderedGroups(groups);
    var groupIndex = orderedGroups.indexOf(group);
    var nextGroupIndex = groupIndex + 1;
    var nextGroup = orderedGroups[nextGroupIndex];
    var position = nextGroup != null && groups[nextGroup].start != null ? groups[nextGroup].start : sheet.cssRules.length;
    var isInserted = insertRuleAt(sheet, text, position);
    if (isInserted) {
      if (groups[group].start == null) { groups[group].start = position; }
      for (var i = nextGroupIndex; i < orderedGroups.length; i += 1) {
        var groupNumber = orderedGroups[i];
        var previousStart = groups[groupNumber].start || 0;
        groups[groupNumber].start = previousStart + 1;
      }
    }
    return isInserted;
  }
  return {
    getTextContent: function() {
      return getOrderedGroups(groups).map(function(group) {
        var rules = groups[group].rules;
        var marker = rules.shift();
        rules.sort();
        rules.unshift(marker);
        return rules.join('\\n');
      }).join('\\n');
    },
    insert: function(cssText, groupValue) {
      var group = Number(groupValue);
      if (groups[group] == null) {
        var markerRule = encodeGroupRule(group);
        groups[group] = { start: null, rules: [markerRule] };
        if (sheet != null) { sheetInsert(sheet, group, markerRule); }
      }
      var selectorText = getSelectorText(cssText);
      if (selectorText != null && selectors[selectorText] == null) {
        selectors[selectorText] = true;
        groups[group].rules.push(cssText);
        if (sheet != null) {
          var isInserted = sheetInsert(sheet, group, cssText);
          if (!isInserted) { groups[group].rules.pop(); }
        }
      }
    }
  };
}

// Layered wrapper — wraps RNW base styles in @layer rnw
export default function createOrderedCSSStyleSheet(sheet) {
  var layerRule = null;
  var fakeSheet = null;
  if (sheet !== null) {
    if (typeof CSSLayerBlockRule !== 'undefined' && sheet.cssRules[0] instanceof CSSLayerBlockRule) {
      layerRule = sheet.cssRules[0];
    } else {
      var layerIndex = sheet.insertRule('@layer rnw {}', 0);
      layerRule = sheet.cssRules[layerIndex];
    }
    fakeSheet = {
      insertRule: function(text, index) { return sheet.insertRule(text, index === void 0 ? 1 : index + 1); },
      get cssRules() { return Array.from(sheet.cssRules).slice(1); }
    };
  }
  var originalLayered = originalCreateOrderedCSSStyleSheet(layerRule);
  var original = originalCreateOrderedCSSStyleSheet(fakeSheet);
  return {
    getTextContent: function() {
      return '@layer rnw { ' + originalLayered.getTextContent() + ' }\\n' + original.getTextContent();
    },
    insert: function(cssText, groupValue) {
      if (groupValue <= 1) {
        originalLayered.insert(cssText, groupValue);
        return;
      }
      original.insert(cssText, groupValue);
    }
  };
}

function encodeGroupRule(group) { return '[stylesheet-group="' + group + '"]{}'; }
var groupPattern = /["']/g;
function decodeGroupRule(cssRule) { return Number(cssRule.selectorText.split(groupPattern)[1]); }
function getOrderedGroups(obj) { return Object.keys(obj).map(Number).sort(function(a, b) { return a > b ? 1 : -1; }); }
var selectorPattern = /\\s*([,])\\s*/g;
function getSelectorText(cssText) {
  var selector = cssText.split('{')[0].trim();
  return selector !== '' ? selector.replace(selectorPattern, '$1') : null;
}
function insertRuleAt(root, cssText, position) {
  try { root.insertRule(cssText, position); return true; }
  catch (e) { return false; }
}
`;
};
