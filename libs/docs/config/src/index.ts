import { Config } from '@docusaurus/types';
import lightTheme from 'prism-react-renderer/themes/github';
import darkTheme from 'prism-react-renderer/themes/dracula';
import { Options, ThemeConfig } from '@docusaurus/preset-classic';

const presetsClassic: Options = {
  docs: {
    sidebarPath: './sidebars.js',
    // Please change this to your repo.
    editUrl: 'https://github.com/watheia/typed-css/edit/main/apps/docs/',
  },
  blog: {
    showReadingTime: true,
    // Please change this to your repo.
    editUrl: 'https://github.com/watheia/typed-css/edit/main/apps/docs/blog/',
  },
  theme: {
    customCss: './src/css/custom.css',
  },
};

const themeConfig: ThemeConfig = {
  navbar: {
    title: 'Typed CSS',
    logo: {
      alt: 'Watheia Labs',
      src: 'img/logo.svg',
    },
    items: [
      {
        type: 'doc',
        docId: 'intro',
        position: 'left',
        label: 'Tutorial',
      },
      { to: '/blog', label: 'Blog', position: 'left' },
      {
        href: 'https://github.com/watheia/typed-css',
        label: 'GitHub',
        position: 'right',
      },
    ],
  },
  footer: {
    style: 'dark',
    links: [
      {
        title: 'Docs',
        items: [
          {
            label: 'Tutorial',
            to: '/docs/intro',
          },
        ],
      },
      {
        title: 'Community',
        items: [
          {
            label: 'Stack Overflow',
            href: 'https://stackoverflow.com/questions/tagged/watheia',
          },
          {
            label: 'Discord',
            href: 'https://discordapp.com/invite/watheia',
          },
          {
            label: 'Twitter',
            href: 'https://twitter.com/watheia',
          },
        ],
      },
      {
        title: 'More',
        items: [
          {
            label: 'Blog',
            to: '/blog',
          },
          {
            label: 'GitHub',
            href: 'https://github.com/watheia/typed-css',
          },
        ],
      },
    ],
    copyright: `Copyright © ${new Date().getFullYear()} Watheia Labs, LLC. All rights reserved.`,
  },
  prism: {
    theme: lightTheme,
    darkTheme: darkTheme,
  },
};

const config: Config = {
  title: 'My Site',
  tagline: 'Dinosaurs are cool',
  url: 'https://typed-css.vercel.app',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'favicon.ico',
  organizationName: 'watheia', // Usually your GitHub org/user name.
  projectName: 'typed-css', // Usually your repo name.

  presets: [['classic', presetsClassic]],
  themeConfig,
};

export default config;
