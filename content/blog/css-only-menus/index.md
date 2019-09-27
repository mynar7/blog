---
title: How to make menus with CSS—no JavaScript or Bootstrap required!
date: 2019-09-27T12:00:00-0400
---

I think a lot of new developers, myself included, are really excited about CSS until it comes time to start building more modern website features like menus.

I remember building my first site, feeling empowered by CSS to do my own styles, and feeling really proud of myself ...until I needed a navigation menu.

![Pouring coffee into a mug marked "UGH". Photo by Nathan Dumlao](./ugh.jpg)

As soon as I added a few links to my header, I began to run out of room on smaller screens. My site had to look good on mobile, so I was left with a choice:

1. Use Bootstrap menus and include a bunch of JavaScript/jQuery on the page, or
1. Use fewer links

I've made that choice many times since then, assuming that those were the only options when building navigation menus.

## Creativity through Constraint

It wasn't until I had to do a coding challenge for a developer job that I had to reckon with the real power of CSS.

I was presented a set of mock-ups of a modern website and told to create the website as close to the provided assets as possible. That's a pretty typical request, except there was one catch: **no JavaScript allowed**.

I thought, _"No way! There's menus everywhere! How can I pull that off without JS?"_

There were **dropdown menus**, **drawers**, and even a Bootstrap-esque **mobile hamburger menu** on one of the mocks.

Being the intrepid developer that I am, I saw this as a fun challenge. I hopped on Codepen and began searching for CSS-only versions of these common UI components.

After a little digging, I found examples for all of them! While there were some tricks involved that I would have never thought of, the tricks themselves were simple.

I took those new tricks and used them to finish the coding challenge. And yes, I got the job!

I had always been told that CSS was super powerful, but I don't think I believed it until that point.

So without further adieu, here's how I managed to recreate all of those menus with CSS alone.

## The Classic Dropdown Menu

The first menu I want to talk about is the dropdown menu. You've probably seen this on any e-commerce site or anything with lots of categories and navigation. There's a header up top with a list of categories, and when you mouse over one, a new menu appears with more related items.

Here's an example:
```css css-live
.dropdown__header * {
  padding: 0;
  margin: 0;
}
.dropdown__header {
  display: flex;
  align-items: center;
  background: lightblue;
}

.dropdown__header strong {
  margin-left: 5px;
  margin-right: auto;
  font-size: 1.6rem;
}

.dropdown__header .dropdown__categories,
.dropdown__header .dropdown__menu {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown__header li {
  padding: 10px;
  position: relative;
}

.dropdown__header li:hover {
  background: #d2f2fc;
}

.dropdown__header .dropdown__category .dropdown__menu {
  display: none;
  position: absolute;
  background: #ebfaff;
  width: 200px;
  top: 50px;
  right: 0;
}

.dropdown__header .dropdown__category:hover .dropdown__menu {
  display: block;
}
```

```html html-live
<header class="dropdown__header">
  <strong>Logo</strong>
  <ul class="dropdown__categories">
    <li class="dropdown__category">
      <span>Cat 1</span>
      <ul class="dropdown__menu">
        <li>Cat 1 Thing</li>
        <li>Cat 1 Thing</li>
        <li>Cat 1 Thing</li>
        <li>Cat 1 Thing</li>
      </ul>
    </li>
    <li class="dropdown__category">
      <span>Cat 2</span>
      <ul class="dropdown__menu">
        <li>Cat 2 Thing</li>
        <li>Cat 2 Thing</li>
        <li>Cat 2 Thing</li>
        <li>Cat 2 Thing</li>
      </ul>
    </li>
  </ul>
</header>
<br>
<h3>CSS Only Dropdown!</h3>
<p>Hover over the Categories above</p>
<p>Pretty cool, right?</p>
```

### What makes this work?

There's three main concepts here that make this possible: **Showing/Hiding with Psuedoselectors**, **absolute positioning**, and **mindful HTML structure**.

#### Showing/Hiding with Pseudoselectors

I think most people are comfortable showing/hiding things with `display: none` and `display: block`. The real trick here is the selectors.

We're targetting `.dropdown__menu`, but notice the nesting structure. We're looking for a `.dropdown__menu` class that's within a `.dropdown__category` class. Then we can apply the `:hover` pseudoselector to the parent, which means we're targetting the menu based on a hover over the parent.

```css
.dropdown__header .dropdown__category .dropdown__menu {
  display: none;
}

.dropdown__header .dropdown__category:hover .dropdown__menu {
  display: block;
}
```

#### Mindful HTML Structure

Are you wondering why our menu stays open even when you move your mouse into the menu?

Going along with our nesting explanation above, note that our `.dropdown__menu` is contained within `.dropdown__category`:

```html
<li class="dropdown__category">
  <span>Cat 1</span>
  <ul class="dropdown__menu">
    <li>Cat 1 Thing</li>
    <li>Cat 1 Thing</li>
    <li>Cat 1 Thing</li>
    <li>Cat 1 Thing</li>
  </ul>
</li>
```

This means that although we're no longer over the words "Cat 1", the mouse is still within the `.dropdown__category` list item, keeping the `:hover` selector trigger active.

**Note**: The menu and category elements must be adjacent to each other so that your mouse stays within one or the other--you can't position the menu off by itself somewhere and be able to mouse into it. More on that when we get to positioning.

#### Absolute Positioning

We position the hovered menu next to the category in the header using `position: absolute;`.

W3 Schools has a [great breakdown](https://www.w3schools.com/css/css_positioning.asp) of CSS positioning, but here's the short version:

When you set positioning, items can be moved around with `top`, `bottom`, `left`, and `right` options.

* **Static**: The default. The element behaves normally, and is unaffected by top/bottom/left/right.
* **Fixed**: The element is positioned relative to the viewport. Eg: `top: 0;` would be the top of the viewer's screen.
* **Relative**: The element is positioned based on where it would be normally. So `top: 0` wouldn't move it at all, and `top: 10px` would push it down 10 pixels.
* **Sticky**: This is a newer, trickier positioning. The element stays where it is, but when the user scrolls the page, before the element moves out of view, it will still stick to whatever top/bottom/left/right position is set.

And lastly, there's **Absolute** positioning. This is the most complicated. The behavior depends on whether this element is within an element that has some kind of positioning set. **If it has a positioned ancestor, it positions relative to that ancestor element. If not, it is positioned relative to the whole page.**

In the case of our dropdown menus, we make the `li` tag that contains the menu `relative`. Then within it we can use `position: absolute;` to position the expanded menu around our category title.

```css
.dropdown__header li {
  position: relative;
}

.dropdown__header .dropdown__category .dropdown__menu {
  position: absolute;
  top: 50px;
  right: 0;
}
```

Here we right-align the menu, and bump it down just far enough so that it's at the bottom of "Cat 1" under our mouse.

## Nested Dropdown Menus

Using the same techniques, we can create a more complicated dropdown menu:

```css css-live
.nested-dropdown__header * {
  padding: 0;
  margin: 0;
}
.nested-dropdown__header {
  display: flex;
  align-items: center;
  background: lightblue;
}

.nested-dropdown__header strong {
  margin-left: 5px;
  margin-right: auto;
  font-size: 1.6rem;
}

.nested-dropdown__header ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nested-dropdown__header li {
  padding: 10px;
  position: relative;
}

.nested-dropdown__header li:hover {
  background: #d2f2fc;
}

.nested-dropdown__header .nested-dropdown__menu,
.nested-dropdown__header .nested-dropdown__submenu {
  display: none;
  position: absolute;
  background: #ebfaff;
  width: 150px;
  top: 50px;
  right: 0;
}

.nested-dropdown__header .nested-dropdown__category:hover .nested-dropdown__menu,
.nested-dropdown__header .nested-dropdown__subcategory:hover .nested-dropdown__submenu {
  display: block;
}

.nested-dropdown__header .nested-dropdown__submenu {
  top: 0;
  right: 100%;
}
```

```html html-live
<header class="nested-dropdown__header">
  <strong>Logo</strong>
  <ul class="nested-dropdown__categories">
    <li class="nested-dropdown__category">
      <span>Cat 1</span>
      <ul class="nested-dropdown__menu">
        <li class="nested-dropdown__subcategory">
          <span>Sub Cat 1</span>
          <ul class="nested-dropdown__submenu">
            <li>Sub Cat 1 Thing</li>
            <li>Sub Cat 1 Thing</li>
            <li>Sub Cat 1 Thing</li>
            <li>Sub Cat 1 Thing</li>
          </ul>
        </li>
        <li class="nested-dropdown__subcategory">
          <span>Sub Cat 2</span>
          <ul class="nested-dropdown__submenu">
            <li>Sub Cat 2 Thing</li>
            <li>Sub Cat 2 Thing</li>
            <li>Sub Cat 2 Thing</li>
          </ul>
        </li>
        <li>Cat 1 Thing</li>
        <li>Cat 1 Thing</li>
      </ul>
    </li>
  </ul>
</header>
<br>
<h3>CSS Only NESTED Dropdown!</h3>
<p>Hover over 'Cat 1' above,</p>
<p>Then check out the Sub Categories!</p>
```

There's only two caveats to this nested menu.

The first is that it doesn't work well on mobile devices. This type of menu requires a lot of real-estate and hovers don't translate to touchscreens very well. This isn't a fault of CSS, though. Most sites will switch to a different style of menu on smaller devices, regardless of CSS vs JS.

The second is that if your user wants to jump from a menu to a nested menu, she may take the shortest path and unintentionally move her mouse cursor out of the current element. Deeply nested menus are a little perilous for the user, so use with caution.

## Content Drawers

Creating drawers with CSS alone seemed impossible. Hover effects don't work, because when you open a drawer, you expect it to stay open. However, I learned that it _is_ possible with some very clever uses of HTML input elements and CSS selectors.

This example has quite a bit of CSS, but don't fret, I promise to explain the important bits:

```css css-live
.drawer {
  position: relative;
  box-sizing: border-box;
  width: 300px;
}
.drawer input {
  width: 100%;
  height: 60px;
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  margin: 0;
  z-index: 3;
  cursor: pointer;
}
.drawer__name {
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  padding: 10px;
  background: lightblue;
}
.drawer__content {
  border: 1px solid black;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
  list-style: none;
  transition: padding 0.2s;
}
.drawer input:checked ~ .drawer__content {
  height: 100%;
  opacity: 1;
  pointer-events: initial;
  padding: 10px 0;
}
.drawer__arrow {
  font-weight: 900;
  font-size: 1.2rem;
  transition: transform 0.2s;
}
.drawer input:checked ~ .drawer__name > .drawer__arrow {
  transform: rotateZ(90deg);
}
.drawer__content li {
  padding: 10px;
  cursor: pointer;
}
.drawer__content li:hover {
  color: rebeccapurple;
  text-decoration: underline;
}
```
```html html-live
<div class="drawer">
  <input type="checkbox">
  <span class="drawer__name">
    <span><strong>Bananas</strong></span>
    <span class="drawer__arrow">></span>
  </span>
  <ul class="drawer__content">
    <li>Bruised</li>
    <li>Green</li>
    <li>Perfect</li>
  </ul>
</div>
<div class="drawer">
  <input type="checkbox">
  <span class="drawer__name">
    <span><strong>Apples</strong></span>
    <span class="drawer__arrow">></span>
  </span>
  <ul class="drawer__content">
    <li>Mealy</li>
    <li>Crisp</li>
    <li>Green</li>
  </ul>
</div>
<div class="drawer">
  <input type="checkbox">
  <span class="drawer__name">
    <span><strong>Oranges</strong></span>
    <span class="drawer__arrow">></span>
  </span>
  <ul class="drawer__content">
    <li>Bitter</li>
    <li>Sour</li>
    <li>Sweet</li>
  </ul>
</div>
```

Ta-da! ✨ Pure CSS drawers!

It seems like a lot of code is required to make this happen, but there's just a few key pieces to this puzzle that make it possible.

### What makes this work?

The main trick here really did blow my mind. The secret is **HTML checkbox elements**.

**Note:** I would have never thought of this in a million years. When I saw an example of this on Codepen I experienced the same feelings I had when seeing an awesome magic trick explained; I felt amazement of the ingenuity involved, and also anger at being duped by such a simple trick that I should have been able to figure out for myself.

If we position the checkbox over the drawer and stretch it to the same size as the drawer, then target siblings on a `:checked` state, we can eliminate the need for JavaScript to trigger the open/close events. The CSS sibling selector is `~`, meaning target any neighbor elements coming after this element.

It's important to note that the **checkbox must come first in the HTML**. You can select sibling/neighbor elements that come after, but not before. We also use `~` and not `+` because `+` targets only the first adjacent sibling element, whereas `~` will give you any following sibling.

```css css-live no-code
.ex2-drawer {
  position: relative;
  box-sizing: border-box;
  width: 300px;
}
.ex2-drawer input {
  width: 100%;
  height: 60px;
  outline: 2px solid red;
  position: absolute;
  /* opacity: 0; */
  top: 0;
  left: 0;
  margin: 0;
  z-index: 3;
  cursor: pointer;
}
.ex2-drawer__name {
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  padding: 10px;
  background: lightblue;
}
.ex2-drawer__content {
  border: 1px solid black;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
  list-style: none;
  transition: padding 0.2s;
}
.ex2-drawer input:checked ~ .ex2-drawer__content {
  height: 100%;
  opacity: 1;
  pointer-events: initial;
  padding: 10px 0;
}
.ex2-drawer__arrow {
  font-weight: 900;
  font-size: 1.2rem;
  transition: transform 0.2s;
}
.ex2-drawer input:checked ~ .ex2-drawer__name > .ex2-drawer__arrow {
  transform: rotateZ(90deg);
}
.ex2-drawer__content li {
  padding: 10px;
  cursor: pointer;
}
.ex2-drawer__content li:hover {
  color: rebeccapurple;
  text-decoration: underline;
}
```
```html html-live no-code
<div class="ex2-drawer">
  <input type="checkbox">
  <span class="ex2-drawer__name">
    <span><strong>Bananas</strong></span>
    <span class="ex2-drawer__arrow">></span>
  </span>
  <ul class="ex2-drawer__content">
    <li>Bruised</li>
    <li>Green</li>
    <li>Perfect</li>
  </ul>
</div>
<div class="ex2-drawer">
  <input type="checkbox">
  <span class="ex2-drawer__name">
    <span><strong>Apples</strong></span>
    <span class="ex2-drawer__arrow">></span>
  </span>
  <ul class="ex2-drawer__content">
    <li>Mealy</li>
    <li>Crisp</li>
    <li>Green</li>
  </ul>
</div>
<div class="ex2-drawer">
  <input type="checkbox">
  <span class="ex2-drawer__name">
    <span><strong>Oranges</strong></span>
    <span class="ex2-drawer__arrow">></span>
  </span>
  <ul class="ex2-drawer__content">
    <li>Bitter</li>
    <li>Sour</li>
    <li>Sweet</li>
  </ul>
</div>
```

The other important piece to this puzzle is the transition. Notice we didn't use `display` here to show and hide the drawer. If you do, you won't be able to use CSS transitions to animate. **You can't animate an element that's hidden with `display: none`**

Instead, we use a combo of `height`, `padding`, `opacity`, and `pointer-events`. (That seems like a lot, but hear me out).

Here's the main code that makes this possible for reference:
```css
.drawer {
  position: relative;
}
.drawer input {
  width: 100%;
  height: 60px;
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  z-index: 3;
  cursor: pointer;
}
.drawer__content {
  height: 0;
  opacity: 0;
  pointer-events: none;
  transition: padding 0.2s;
}
.drawer input:checked ~ .drawer__content {
  height: 100%;
  opacity: 1;
  pointer-events: initial;
  padding: 10px 0;
}
```
```html
<div class="drawer">
  <input type="checkbox">
  <span class="drawer__name">
    <span><strong>Oranges</strong></span>
    <span class="drawer__arrow">></span>
  </span>
  <ul class="drawer__content">
    <li>Bitter</li>
    <li>Sour</li>
    <li>Sweet</li>
  </ul>
</div>
```

First we squash the `.drawer__content` with `height: 0`, and hide it with `opacity: 0`. However, because it's still on the page, the user would be able to click the things within, even though the content isn't visible. The solution is to disable mouse interaction with `pointer-events: none`. This allows us to animate the content while not letting the use see or interact with it.

Finally, we use `padding` as our animation. Animating the `height` causes some weird behavior, but animating the padding allows some for some subtle animation while keeping the drawer itself very responsive.

**Note:** It's possible to make drawers with just HTML alone using the `details` element. You lose out on the ability to animate with CSS, though.

Here's a quick example. None of the CSS is necessary for the drawer behavior:

```css css-live
details {
  background: rebeccapurple;
  color: #ddd;
  width: 300px;
  border-radius: 4px;
  margin-bottom: 5px;
}
summary {
  padding: 10px;
}
summary:focus {
  outline: none;
}
details ul {
  background: #ddd;
  margin: 0;
  color: black;
  padding: 10px;
  border-radius: 0 0 4px 4px;
}

details li {
  margin-left: 30px;
  margin-top: 10px;
}
```
```html html-live
<details open>
  <summary>Drawer 1</summary>
  <ul>
    <li>Thing 1</li>
    <li>Thing 2</li>
    <li>Thing 3</li>
    <li>Thing 4</li>
  </ul>
</details>
<details>
  <summary>Drawer 2</summary>
  <ul>
    <li>Thing 1</li>
    <li>Thing 2</li>
    <li>Thing 3</li>
    <li>Thing 4</li>
  </ul>
</details>
```
## CSS Only Hamburger Menus

Now for the coup de grâce, CSS-only Hamburger menus!

What's a hamburger menu? It gets its name from the three stacked dashes that indicate "hey this is a menu". I guess someone was awful hungry for three lines to look like a hamburger, but I digress.

You may have some ideas on how to pull this off in your head after seeing the previous examples. Let's take a look (Warning, incoming a ton of CSS):

```css css-live
.hamburger-menu__wrapper {
  min-height: 400px;
  position: relative;
  text-align: center;
}
.hamburger-menu {
  height: 100%;
  width: 300px;
  position: absolute;
  top: 0;
  left: 0;
}
.hamburger-menu__button {
  width: 40px;
  height: 40px;
  border: 2px solid #777;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 3;
}

.hamburger-menu__button span {
  line-height: 8px;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 400;
}

.hamburger-menu__button span:last-child {
  padding-bottom: 5px;
}
.hamburger-menu__wrapper {
  position: relative;
  height: 100%;
  overflow: hidden;
}
.hamburger-menu__wrapper input[type='checkbox'] {
  width: 40px;
  height: 40px;
  outline: 3px solid red;
  opacity: 0;
  position: absolute;
  top: 6px;
  left: 6px;
  z-index: 4;
  cursor: pointer;
}

.hamburger-menu__wrapper input:checked ~ .hamburger-menu__button {
  background: #d2f2fc;
}

.hamburger-menu__wrapper input:checked ~ .hamburger-menu__slider {
  transform: none;
}

.hamburger-menu__slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  background-color: lightblue;
  z-index: 2;
  transform: translateX(-310px);
  transition: transform 0.3s;
  text-align: left;
}

.hamburger-menu__item {
  padding: 10px 0 10px 10px;
}

.hamburger-menu__item:hover {
  background-color: #d2f2fc;
}

.hamburger-menu__item:first-of-type {
  margin-top: 60px;
}
```

```html html-live
<div class="hamburger-menu__wrapper">
  <div class="hamburger-menu">
    <div class="hamburger-menu__wrapper">
      <input type="checkbox" />
      <div class="hamburger-menu__button">
        <span>&mdash;</span>
        <span>&mdash;</span>
        <span>&mdash;</span>
      </div>
      <div class="hamburger-menu__slider">
        <div class="hamburger-menu__item">Thing 1</div>
        <div class="hamburger-menu__item">Thing 2</div>
        <div class="hamburger-menu__item">Thing 3</div>
        <div class="hamburger-menu__item">Thing 4</div>
      </div>
    </div>
  </div>
  <h2>Hamburger!!</h2>
  <p>Click the Button to toggle the menu</p>
</div>
```

Take ***that***, bootstrap. 🤠

### What makes it work?

A lot of the CSS above is for creating that silly hamburger style button. I literally stacked dashes and put a border around them, but you can use an icon if you like.

As for the menu, it uses **absolute positioning**, the **input checkbox trick**, as well as a new trick, which is using **transform** to slide the drawer in and out.

Here's the code that makes the menu slide:
```css
.hamburger-menu__wrapper {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.hamburger-menu__wrapper input:checked ~ .hamburger-menu__slider {
  transform: none;
}

.hamburger-menu__slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  z-index: 2;
  transform: translateX(-310px);
  transition: transform 0.3s;
}
```

We style the menu to sit on top of the page, then add in `transform: translateX(-310px)` to pull the menu to the left so it's no longer visible. When the `input` is checked, we remove that `transform` and the transition animates the drawer sliding into view.

There's a ton of other neat things you can do with the `transform` property. We used it above on our drawers to turn our arrow to point downward when the drawer is open, for example.

We also use `overflow: hidden` on the wrapper to make sure our menu isn't visible when the menu is closed.

**Note:** We also use `z-index` here to make sure things stack on top of each other. Absolute positioning breaks items out of normal HTML flow, so making sure the menu is on top is crucial. Even more critical, we apply a higher z-index to the checkbox to make sure the user can always open and close the menu. We applied `z-index` to our drawer checkboxes as well above.

## But about JavaScript?

So yes, the point of this click-baity article title was that these things are possible _without_ JavaScript. But does that make sense?

CSS is incredibly performant in general compared to using JavaScript. So it's a good rule of thumb to use CSS instead of JS for most things.

That said, some of these examples could be improved with JavaScript. Certainly toggling open/closed states would be much simpler using JS. Also, our hamburger example could benefit from being able to click outside of the menu to close the drawer. For the drawers, you might want to only have one of the drawers open above at a time. And for the dropdown menus you might want to slow the closing of the menus when the mouse cursor moves outside of the menu.

If you're already using an SPA like React, you may as well use a touch of JavaScript with your CSS to build the menus.

The point here is that **for a simple site, you don't need to reach for CSS frameworks or JS frameworks.**

## Parting Thoughts

CSS is powerful, and we could all use more excuses to practice and learn more and do more with it. HTML deserves a shout-out here as well. You can build a lot with HTML and CSS alone. Certainly more than I thought was possible when I started out.

JavaScript may rule the world, but CSS and HTML deserve your attention as a front-end developer as well.