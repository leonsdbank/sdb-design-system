<div align="center">
  <br />
  <h1>@sdbank/ui</h1>
  <p><strong>Cross-platform React Native components styled with Tailwind CSS.</strong></p>
  <p>One codebase. iOS, Android, and Web.</p>
  <br />

  [![npm](https://img.shields.io/npm/v/@sdbank/ui?style=flat-square&color=0969da)](https://www.npmjs.com/package/@sdbank/ui)
  [![license](https://img.shields.io/npm/l/@sdbank/ui?style=flat-square)](./LICENSE)
  [![types](https://img.shields.io/npm/types/@sdbank/ui?style=flat-square)](https://www.npmjs.com/package/@sdbank/ui)

  <br />
</div>

---

<br />

> **Write once, render everywhere.** Build with React Native primitives, style with Tailwind utility classes, and ship to every platform.

<br />

## Highlights

<table>
<tr>
<td width="50%">

### Cross-Platform
React Native + React Native Web.
Write components once, run on iOS, Android, and the browser.

</td>
<td width="50%">

### Tailwind CSS
Style with utility classes powered by
<a href="https://github.com/nicepkg/uniwind">Uniwind</a> and Tailwind CSS v4.

</td>
</tr>
<tr>
<td width="50%">

### `className` Prop
Every component accepts `className` with
full TypeScript IntelliSense support.

</td>
<td width="50%">

### Composable API
Card system with flexible sub-components.
Mix and match to build any layout.

</td>
</tr>
<tr>
<td width="50%">

### Tree-Shakeable
ESM + CJS dual output.
Import only what you need.

</td>
<td width="50%">

### Next.js Ready
First-class integration with Turbopack
via `withSdbUI()` config wrapper.

</td>
</tr>
</table>

<br />

## Install

```bash
# Expo
bun add @sdbank/ui uniwind tailwindcss react-native-web

# Next.js
bun add @sdbank/ui react-native-web
```

<br />

## Quick Start

```tsx
import { Button, Text, Card, CardHeader, CardTitle, CardContent, Input } from "@sdbank/ui";

function App() {
  return (
    <>
      <Text variant="heading" size="2xl">
        Hello World
      </Text>

      <Button variant="default" size="lg" onPress={() => alert("Pressed!")}>
        Get Started
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          <Input label="Email" placeholder="you@example.com" />
        </CardContent>
      </Card>
    </>
  );
}
```

<br />

## Components

### `<Button />`

Pressable button with variant and size control.

```tsx
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
```

<details>
<summary><strong>Props</strong></summary>

| Prop | Type | Default |
|---|---|---|
| `variant` | `"default"` \| `"secondary"` \| `"destructive"` \| `"outline"` \| `"ghost"` | `"default"` |
| `size` | `"sm"` \| `"default"` \| `"lg"` \| `"icon"` | `"default"` |
| `disabled` | `boolean` | `false` |
| `className` | `string` | — |

</details>

---

### `<Text />`

Typography component with semantic variants.

```tsx
<Text variant="heading" size="2xl">Heading</Text>
<Text variant="muted" size="sm">Caption text</Text>
<Text variant="destructive">Error message</Text>
```

<details>
<summary><strong>Props</strong></summary>

| Prop | Type | Default |
|---|---|---|
| `variant` | `"default"` \| `"heading"` \| `"subheading"` \| `"muted"` \| `"destructive"` | `"default"` |
| `size` | `"xs"` \| `"sm"` \| `"base"` \| `"lg"` \| `"xl"` \| `"2xl"` \| `"3xl"` | `"base"` |
| `className` | `string` | — |

</details>

---

### `<Card />`

Composable card system with flexible sub-components.

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    <Text>Body content</Text>
  </CardContent>
  <CardFooter>
    <Button size="sm">Action</Button>
  </CardFooter>
</Card>
```

Sub-components: `Card` `CardHeader` `CardTitle` `CardDescription` `CardContent` `CardFooter`

All accept `className` for custom styling.

---

### `<Input />`

Text input with built-in label and error states.

```tsx
<Input label="Email" placeholder="you@example.com" />
<Input label="Password" error="This field is required" />
<Input label="Controlled" value={value} onChangeText={setValue} />
```

<details>
<summary><strong>Props</strong></summary>

| Prop | Type | Default |
|---|---|---|
| `label` | `string` | — |
| `error` | `string` | — |
| `placeholder` | `string` | — |
| `value` | `string` | — |
| `onChangeText` | `(text: string) => void` | — |
| `editable` | `boolean` | `true` |
| `className` | `string` | — |

</details>

---

### `cn()`

Utility for merging Tailwind classes. Powered by `clsx` + `tailwind-merge`.

```tsx
import { cn } from "@sdbank/ui";

cn("px-4 py-2", isActive && "bg-blue-500", className);
```

<br />

## Setup Guides

<details>
<summary><strong>Expo</strong></summary>

<br />

**1. metro.config.js**

```js
const { getDefaultConfig } = require("expo/metro-config");
const { withUniwindConfig } = require("uniwind/metro");

const config = getDefaultConfig(__dirname);
module.exports = withUniwindConfig(config, { cssEntryFile: "./global.css" });
```

**2. global.css**

```css
@layer rnw;
@import "tailwindcss";
@source "./node_modules/@sdbank/ui/src";
```

**3. app/_layout.tsx** — CSS import must come first

```tsx
import "../global.css";
```

**4. tsconfig.json** — enable `className` types

```json
{
  "include": ["**/*.ts", "**/*.tsx", "node_modules/@sdbank/ui/src/types/**/*.d.ts"]
}
```

</details>

<details>
<summary><strong>Next.js</strong></summary>

<br />

**1. next.config.ts**

```ts
import { withSdbUI } from "@sdbank/ui/next";
export default withSdbUI({ /* your config */ });
```

**2. globals.css**

```css
@import "@sdbank/ui/global.css";
@import "tailwindcss";
@source "./node_modules/@sdbank/ui/src";
```

**3. tsconfig.json** — enable `className` types

```json
{
  "include": ["**/*.ts", "**/*.tsx", "node_modules/@sdbank/ui/src/types/**/*.d.ts"]
}
```

</details>

<br />

## Exports

```
@sdbank/ui            → Components + cn utility
@sdbank/ui/next       → withSdbUI() Next.js config wrapper
@sdbank/ui/web        → React Native Web shim
@sdbank/ui/global.css → CSS layer ordering fix
```

<br />

## Requirements

| Dependency | Version |
|---|---|
| React | >= 18 |
| React Native | >= 0.74 |
| React Native Web | >= 0.19 *(optional, for web)* |

<br />

## License

[MIT](./LICENSE)
