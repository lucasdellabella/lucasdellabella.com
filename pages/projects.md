---
title: Projects - Lucas Della Bella
display: Projects
subtitle: Some of my cool and recent projects
description: Some of my cool and recent projects
plum: true
projects:
  Upcoming:
    - name: "Machine Learning Experiments"
      desc: "A series of interactive ML artifacts"
      icon: "i-teenyicons-robot-outline"
  Interactive:
    - name: "Microinteractions"
      link: "https://lucasdellabella.com/microinteractions"
      desc: "Tiny but fun UI animations to make everyday web interactions pop!"
      icon: "i-fluent-sparkle-48-regular"
  Recent:
    - name: "Notion Ding!"
      link: "https://chrome.google.com/webstore/detail/notion-ding/joikmdcpokdfcmocfafpmbailndkpjim"
      desc: "Make notion go ding when you complete tasks. Yes that's it."
      icon: "i-simple-icons-notion"
    - name: "Lineage"
      link: "https://lineagenft.com"
      desc: "A fantasy NFT experimenting with on-chain family-ties."
      icon: "i-cil-shield-alt"
    - name: "Kiwis"
      link: "https://yourkiwis.com"
      desc: "Prevent burnout without building new habits"
      icon: "i-emojione-monotone-kiwi-fruit"
  Old:
    - name: "Solidify"
      link: "#"
      desc: "Wix-like builder for simple DAOs on Ethereum. Dead."
      icon: "i-fluent-organization-24-regular"
    - name: "Toast"
      link: "https://play.google.com/store/apps/details?id=com.kopdb.toast"
      desc: "Flick toast. Listen to adorable screams of terror."
      icon: "i-fluent-food-toast-24-filled"
---

<ListProjects :projects="frontmatter.projects"/>
