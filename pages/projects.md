---
title: Projects - Lucas Della Bella
display: Projects
subtitle: List of projects I'm proud of
description: List of projects I'm proud of
plum: true
projects:
  Upcoming:
    - name: "Zeitreise"
      link: "https://twitter.com/antfu7/status/1504639906232307712"
      desc: "Time traveling for the Web"
      icon: "i-mdi-clock-fast"
    - name: "reTypewriter"
      link: "https://twitter.com/antfu7/status/1505236765447458817"
      desc: "Smartly replay the steps of your changes at ease."
      icon: "i-carbon-keyboard"

  Latest:
    - name: "Vue Starport"
      link: "https://github.com/antfu/vue-starport"
      desc: "Shared component across routes with animations."
      icon: "i-carbon-plane-sea"
    - name: "Smart Clicks"
      link: "https://github.com/antfu/vscode-smart-clicks"
      desc: "Smart selection with double clicks for VS Code."
      icon: "i-heroicons-solid-cursor-click"
    - name: "SponsorKit"
      link: "https://github.com/antfu/sponsorkit"
      desc: "Toolkit for generating sponsors images"
      icon: "i-carbon-favorite"
    - name: "Vitest"
      link: "https://vitest.dev"
      desc: "A blazing fast unit-test framework powered by Vite. In collaboration with @patak-dev"
      icon: "vitest"
    - name: "UnoCSS"
      link: "https://github.com/antfu/unocss"
      desc: "The instant on-demand atomic CSS engine"
      icon: "unocss"
---

<ListProjects :projects="frontmatter.projects"/>

<StarsRanking/>
