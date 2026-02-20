import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2">
          <Image
            src="/sdb-logo-white.svg"
            alt="SDB"
            width={80}
            height={32}
            className="dark:invert-0"
          />
          <span className="font-semibold">@sdbank/ui</span>
        </span>
      ),
    },
    links: [
      {
        text: 'Documentation',
        url: '/docs',
      },
      {
        text: 'Components',
        url: '/docs/components/button',
      },
    ],
    githubUrl: 'https://github.com/nicmangroup/sdb-ui',
    themeSwitch: { enabled: false },
  };
}
