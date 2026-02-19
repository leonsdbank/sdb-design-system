import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ButtonPreview } from '@/components/preview/button-preview';
import { TextPreview } from '@/components/preview/text-preview';
import { CardPreview } from '@/components/preview/card-preview';
import { InputPreview } from '@/components/preview/input-preview';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ButtonPreview,
    TextPreview,
    CardPreview,
    InputPreview,
    ...components,
  };
}
