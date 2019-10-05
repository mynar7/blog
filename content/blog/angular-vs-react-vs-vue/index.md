---
title: 'Front-end Fisticuffs: Angular vs React vs Vue in 2019'
date: 2019-10-05T10:00:00-0400
---

![Cowboy riding horse and kicking up dirt by Lee Pigott](./cowboy.jpg)

Being a front-end developer is a bit like being a cowboy in a rodeo. As a developer, you'll find yourself wrangling a new framework over and over because of the speed at which the front-end landscape evolves. Sure, learning comes with the territory as a developer, but front-end development in particular is becoming quite the skillset to maintain.

The fact is, you're likely going to need to know at least one if you're going to become a web developer. Before we talk about choosing one to spend your time on, let's first highlight the problems they solve.

## Why use a framework?

Three weeks into a boot camp, I was amazed with the things I could build with HTML/CSS/JS, including [a dice-roll based RPG for the browser.](https://leewarrick.com/rpg)

I've often wanted to make improvements to that game, but the thought of adding features or refactoring has held me back. The problem is, [it's written with a thousand lines of spaghetti jQuery.](https://github.com/mynar7/rpg/blob/master/assets/script.js) I can only imagine the challenge of working on a project like a banking application before frameworks came onto the scene.

**Front-end frameworks are a response to the challenge of increased complexity and scale in web applications.** As we began making bigger web applications that do more and more for the user, we had to find a way to wrangle increasing amounts of logic, traffic, and code.

**Frameworks handle the problem of scope by separating code into components**. A component can be purely visual, functional, or both. For the most part, JavaScript you write in a component is scoped to that component, providing isolation from other parts of the codebase. You don't have to worry as much about conflicting code when using components. **Components are also reusable**, meaning you can accomplish more with less code.

Frameworks have performance benefits over plain JavaScript or jQuery. Specifically, **frameworks optimize re-rendering**, or in laymen's terms, updating the page's HTML. JavaScript's DOM API (all the `document.getElementById` stuff), is resource intensive for the browser. **Frameworks increase performance by minimizing the actual changes to the HTML**.

**Frameworks also help mitigate large amounts of traffic to a website.** Instead of having one server build a new HTML file for each user and request, we can simply send the entire app to each user and let the user's browser handle re-rendering. This way the server only has to serve HTML/CSS/JS once, and can communicate to the browser with only data after that.

### But...

There's a few downsides to frameworks. It's more JavaScript for the browser to run, which can be costly in terms of load times when a user first visits your site. It's also another layer of complexity for you to deal with as a developer, adding to your growing list of skills to maintain.

If you're building a static site like a business information page, you might not need a framework. But for complex applications like your banking website or the game I mentioned above, a framework can bring a lot to the table, albeit with its own costs.

## The Big 3: Angular, React, and Vue

![Three Horses, Photo by Doruk Yemenici](./threehorses.jpg)

Before we talk about picking a framework, let's talk about the differences between them. As of 2019, there's three big players in the JavaScript front-end framework game: Angular, React and Vue.

### Angular

Angular is a Google invention. It all started with AngularJS, which exploded onto the scene and saw widespread use. Then came React, and the Angular team rewrote the entire framework completely and called it Angular 2 (Then they skipped version 3 and went directly to 4 and we're currently on version 7).

Basically AngularJS and Angular 2+ are completely different beasts, and so a large amount of the AngularJS crowd switched to React when version 2 came out.

#### The Good

Angular absolutely rocks for enterprise development. If you want to work for a big company, Angular is a fantastic choice. Angular is **batteries included**, meaning it comes with its own packages and solutions for the common things you want to do. For example, if you want to make an API call, there's a feature for that. Internationalization, Global State Management and other Angular libraries/features are all built and maintained by the Angular team.

**Angular is also the most opinionated of the Big 3.** And because of its opinionated nature, **most Angular projects look the same**. When I say "opinionated" I mean that Angular has a particular method or way of doing what you want to accomplish. This means that once you learn it, you likely can work on any other Angular codebase with little effort.

#### The Bad

Being opinionated is a double-edged sword. Yes, it means that everyone is probably doing something the same way, but remember that Angular was written by Google Engineers. So the "Angular Way" does not necessarily mean the easy way.

**TypeScript is mandatory** in Angular, and **the Angular team loves RxJS**, so that's also rolled into the framework. NGRX, Angular's state management library, makes Redux look lightweight by comparison. All this adds up to a **fairly steep learning curve for the novice developer.**

Angular also wraps its components in HTML elements in such a way that CSS is scoped by default. There's no way to turn it off either. Because of this, it can be incredibly difficult to override a component's CSS when you need to.

#### The Ugly

Working with the module pattern in Angular is frustrating for beginners. Every component comes with an HTML, CSS, TypeScript, and Test file by default. You then have to register that component in a higher level module that tells Angular and TypeScript where it can find everything. The CLI has commands to generate a new component and auto-register it in a module because of how laborious it can be to do manually.

If you're still learning front-end development and you're new to frameworks, **Angular can feel like building a rocket launcher to swat a fly.** It's honestly overkill for a small application, the type of which you need to build a lot of when learning.

To boot, the documentation is not great, and the community is not as prolific as React or Vue's. This means it's harder to find solutions for your problems via Google, and there's not many tutorials out there for you to learn from.

That said, I recommend [Todd Motto's courses](https://ultimatecourses.com/author/toddmotto) and the [Angular Firebase fellow on YouTube](https://www.youtube.com/channel/UCsBjURrPoezykLs9EqgamOA) if you're hoping to learn Angular.

### React

React, created by Facebook, launched after AngularJS and quickly became the most popular front-end framework.

If I had to put the React philosophy into words, I might say that **React wants to be as unobstrusive as possible and make you feel like you're just working with JavaScript**. React also highly values immutabililty and one-way data flow.

#### The Good

Because of its popularity, **there are an absolute ton of resources to learn React.** You can hop onto Google or YouTube and easily find entire free courses for React. Any questions you may have about React have likely been answered and posted to Stack Overflow or some other forum.

React's popularity also means there is **plenty of 3rd party support**. If you need any kind of pre-built solution for any aspect of a React project, someone has undoubtedly already built it and published it to NPM.

React's API is also very small, meaning there's just not that much to it. **Writing React is a lot like writing JavaScript**, particularly with the new hooks API which emphasizes a **functional approach** to writing components. **This makes learning React beginner-friendly**.

The popularity of React also makes it a great skill for finding a job. Plenty of companies use React.

#### The Bad

**Because React is so small and un-opinionated, you're going to have to bring in your own solutions for everything.** This means you may be using lots of 3rd party libraries to accomplish things that might come standard in Angular or Vue. For example, if you want to make an API call, you'll probably use Axios or JS's fetch. If you want global state management, you're going to use Redux or some other solution, where Angular has NGRX and Vue has Vuex.

Being a "bring your own everything" framework, **one React project may look wildly different from another.** So just because you have worked with React at one company for a length of time, you might change jobs to another React-based team and find yourself on a strange and foreign codebase that you have to learn.

#### The Ugly

Because it's "just JavaScript", **React will let you write a bunch of JavaScript and logic in your template.** This can make your code confusing and obtuse to other developers, and even yourself on a second pass. **It can be incredibly difficult to write JSX in a way that's readable.**

React is un-opinionated, so you can absolutely turn it into a footgun and begin writing code that's not performant and full of bugs. **It's incredibly easy to write bad React code.**

### Vue

Vue is the underdog, and everyone loves a good underdog. It's written by Evan You, a former AngularJS team member. This the only one of the Big 3 not backed by a huge company in Silicon Valley.

#### The Good

Vue's API is **incredibly easy to learn**. There's plenty of stories of designers and developers that were turned-off or confused by Angular/React that gravitated towards Vue and loved it.

Vue provides just enough opinion to keep your code readable and sane without making you feel like you're jumping through hoops to use it. It also provides some excellent built-in solutions for common framework problems. For instance, state management is greatly simplifed through Vuex, Vue's version of Redux/NGRX.

There's also a **good amount of community support**; there's plenty of third party libraries and packages for Vue. There's also plenty of tutorials and info to be found on Google for Vue. **And the official documentation is excellent.**

If you're worried about jobs with Vue, it's a valid concern. You're probably not as likely to find a Vue job in the states as an Angular or React job. However, the PHP community loves Vue. **Laravel ships with Vue, and so if you find a company writing PHP, you're likely to also find them using Vue.** Vue is also huge in Asia likely because the documentation has been translated to Asian languages.

#### The Bad

Sharing logic between components with Vue is currently a bit of a mess. "Mixins" let you write logic that can be shared between components. They're easy enough to use, but it can be devilish trying to figure out how mixins interact with a components logic. **Mixins are terrible.**

Vue also doesn't really play well with TypeScript currently, which is a concern for big codebases that could benefit from it.

And as I noted above, you _might_ have a harder time finding work in the West as a Vue dev than you would if you had learned React/Angular.

#### The ...Uncertain

Vue isn't ugly. It's _vuetiful_.

That said, Version 3 of Vue is coming, and it's bringing a different API with it that mimics React hooks.

Now, React hooks are **excellent**, but it remains to be seen how well Vue hooks (or the Composition API) will be embraced by the community. Regardless, Vue 3 will be backwards compatible, so hooks will be opt-in.

Having used React hooks, and having seen what Vue hooks are bringing to the table, I am excited to give them a try.

### What about Ember, Svelte, Backbone, etc?

There's a lot of front-end frameworks out there that aren't the big 3. Someone probably published a new one while you were reading this article. Here's a few I didn't mention:

- **Ember** is another highly-opinionated framework, and while it's not as popular, there are teams out there using it.
- **Svelte** is so new that nobody is using it yet. The creator is brilliant, and this may blow up, so who knows?
- Nobody uses **backbone**. Sorry backbone.
- **Lit-HTML/Polymer** is an ultra-lightweight framework (like 30 lines of JS small or something). I don't know of anyone using it.

## Choosing a Framework

![Man riding a horse, lighting his path with a lanterm by Priscilla De Preez](./lanternrider.jpg)

Now that we've talked about the big 3, how do you pick one to learn?

You'll probably spend most of your time using one framework. A codebase is unlikely to pull in multiple frameworks, and as a developer you likely only have time to specialize in one framework at a time.

The truth is: **it doesn't really matter which framework you know, as long as you know one**.

All of these frameworks do the same thing. You write a template, variables and logic and they re-render the template based on those variables and logic.

They all use webpack and babel, they all have build-steps and CLIs, and you can get the same apps written using all of them. **They're all just HTML, CSS and JavaScript at the end of the day.**

Your skills in one will transfer to another, because you're really learning web development before you're learning Angular or React development.

With that said, **choose the framework that aligns with your goals and preferences**.

If you want to move to Asia and work as a developer, Vue is a solid choice. Are you a Java developer or want to work at a big corporation? Angular might be best for you. Are you self-taught? Maybe React is the best choice simply for the amount of free tutorials that are available.

## Parting Thoughts

Learning the conventions and basics of a front-end framework is the hard part. **Once you learn one, it becomes trivial to switch to another.** I learned React in a boot camp, got hired at a big company that used Angular, and then changed jobs to another that used Vue.

**Note**: If you're curious about how web development evolved from Geocities to React, I did [a brief talk on the history of web development and its current landscape.](https://www.youtube.com/watch?v=-W2hZadx8fE)