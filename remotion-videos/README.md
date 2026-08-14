# Remotion video

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

## Purpose

Shared video-generation tool, not tied to any single site — used to produce videos (obложки, TG-post video snippets, promo clips) for any of the projects: SINOTECH (globaltechtour.ru), AURA (aura-robotics.ru), etc. Rendered output goes into `out/` and is committed to this repo, so it doubles as video storage.

## Sandbox note

The default Remotion setup downloads its own headless-Chromium build from `remotion.media` on first render. That host is not in this sandbox's network egress allowlist, so `remotion.config.ts` points `Config.setBrowserExecutable()` at the Playwright-managed `chromium_headless_shell` binary that's already preinstalled here instead (`/opt/pw-browsers/chromium_headless_shell-*/chrome-linux/headless_shell`). On a machine without that restriction, this override can be removed to use Remotion's own managed browser.

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npx remotion render
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
