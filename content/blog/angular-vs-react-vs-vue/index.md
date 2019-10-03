---
title: "Front-end Fisticuffs: Angular vs React vs Vue in 2019"
date: 2019-10-04T10:00:00-0400
---

When I started learning web development from a boot camp, there was a simple progression: make sites with HTML, begin styling with CSS, and then add functionality with JavaScript. We even jumped into jQuery and started making applications.

I was amazed with the things I could build with HTML/CSS/JS and 3 weeks of experience under my belt. I even made [a dice-roll based RPG for the browser](https://leewarrick.com/rpg) (If you had told me then that I could make a legitimate real-time battle system RPG with a few weeks of programming knowledge, I'd have called you crazy).

## Why Frameworks?

I've often wanted to make improvements to that game, but the thought of adding features or refactoring it has held me back. The fact is, [it's written with a thousand lines of spaghetti jQuery](https://github.com/mynar7/rpg/blob/master/assets/script.js).

**Front-end frameworks are a response to the challenge of complexity and scope at scale in web applications.** As far as the browser is concerned, every script that you include on the page is part of one giant program that's running. So if you name a variable `isLoading` and you're using a third party library as a global script that happens to have the same variable, you're going to run into problems.

**Frameworks handle the problem of scope by separating code into components**. A component can be purely visual, functional, or both. For the most part, JavaScript you write in a component is scoped to that component. **Components are also reusable**, meaning you can accomplish more with less code.

There are also performance benefits to using a framework over JavaScript/jQuery. Specifically, they **optimize re-rendering**, or in laymen's terms, updating the page's HTML. JavaScript's DOM API (all the `document.getElementById` stuff), is resource intensive for the browser. **Frameworks increase performance by minimizing the actual changes to the HTML**.

This all sounds great, but there's always a catch.

## The Cost of Frameworks