---
title: How to make menus with CSS—no JavaScript or Bootstrap required!
date: 2019-09-23T12:00:00-0400
---
I think a lot of new developers, myself included, are really excited about CSS until it comes time to start building more modern website features like menus.

I remember building my first site, feeling empowered by CSS to do my own styles, and feeling really proud of myself ...until I needed a navigation menu.

As soon as I added a few links to my header, I began to run out of room on smaller screens. My site had to look good on mobile, so I was left with a choice:

1. Use Bootstrap and include a bunch of JavaScript/jQuery, or
1. Use fewer links

I've made that choice many times since then, assuming that those were the only options when building navigation menus.

## Creativity through Constraint

It wasn't until I had to do a coding challenge for a developer job that I had to reckon with the real power of CSS.

I was presented a set of mock-ups of a modern website and told to create the website as close to the provided assets as possible. That's a pretty typical request, except there was one catch: **no JavaScript allowed**.

I thought, _"No way! There's menus everywhere! How can I pull that off without JS?"_

There were dropdown menus, drawers, and even a Bootstrap-esque mobile hamburger menu on one of the mocks.

I had always heard, _"CSS is super powerful"_, but I don't know if I believed it at that point.  So, I hopped on codepen and searched for CSS-only versions of these common UI components.

After a little digging, I found CSS-only examples of all of them!

```css css-live no-code
.ex1-dropdown__header * {
  padding: 0;
  margin: 0;
}
.ex1-dropdown__header {
  display: flex;
  align-items: center;
  background: lightblue;
}

.ex1-dropdown__header strong {
  margin-left: 5px;
  margin-right: auto;
  font-size: 1.6rem;
}

.ex1-dropdown__header .ex1-dropdown__categories,
.ex1-dropdown__header .ex1-dropdown__menu {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.ex1-dropdown__header li {
  padding: 10px;
  position: relative;
}

.ex1-dropdown__header li:hover {
  background: #d2f2fc;
}

.ex1-dropdown__header .ex1-dropdown__category .ex1-dropdown__menu {
  display: none;
  position: absolute;
  background: #ebfaff;
  width: 200px;
  top: 50px;
  right: 0;
}

.ex1-dropdown__header .ex1-dropdown__category:hover .ex1-dropdown__menu {
  display: block;
}
```

```html html-live no-code
<header class="ex1-dropdown__header">
  <strong>Logo</strong>
  <ul class="ex1-dropdown__categories">
    <li class="ex1-dropdown__category">
      <span>Cat 1</span>
      <ul class="ex1-dropdown__menu">
        <li>Cat 1 Thing</li>
        <li>Cat 1 Thing</li>
        <li>Cat 1 Thing</li>
        <li>Cat 1 Thing</li>
      </ul>
    </li>
    <li class="ex1-dropdown__category">
      <span>Cat 2</span>
      <ul class="ex1-dropdown__menu">
        <li>Cat 2 Thing</li>
        <li>Cat 2 Thing</li>
        <li>Cat 2 Thing</li>
        <li>Cat 2 Thing</li>
      </ul>
    </li>
  </ul>
</header>
<br>
<h2>CSS Only Dropdown!</h2>
<p>Hover over the Categories above</p>
<p>Pretty cool, right?</p>
```
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
<h2>CSS Only Dropdown!</h2>
<p>Hover over the Categories above</p>
<p>Pretty cool, right?</p>
```
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
<h2>CSS Only NESTED Dropdown!</h2>
<p>Hover over 'Cat 1' above,</p>
<p>Then check out the Sub Categories!</p>
```

```css css-live no-code
.ex1-drawer {
  position: relative;
  box-sizing: border-box;
  width: 300px;
}
.ex1-drawer input {
  width: 100%;
  height: 100%;
  outline: 2px solid red;
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  margin: 0;
  z-index: 3;
  cursor: pointer;
}
.ex1-drawer__name {
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  padding: 10px;
  background: lightblue;
}
.ex1-drawer__content {
  border: 1px solid black;
  box-sizing: border-box;
  top: 40px;
  left: 0;
  width: 100%;
  height: 0;
  margin: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
  list-style: none;
  transition: padding 0.2s;
}
.ex1-drawer input:checked ~ .ex1-drawer__content {
  height: 100%;
  opacity: 1;
  pointer-events: initial;
  padding: 10px 0;
}
.ex1-drawer__arrow {
  font-weight: 900;
  font-size: 1.2rem;
  transition: transform 0.2s;
}
.ex1-drawer input:checked ~ .ex1-drawer__name > .ex1-drawer__arrow {
  transform: rotateZ(90deg);
}
.ex1-drawer__content li {
  padding: 10px;
  cursor: pointer;
}
.ex1-drawer__content li:hover {
  color: rebeccapurple;
  text-decoration: underline;
}
```
```html html-live no-code
<div class="ex1-drawer">
  <input type="checkbox">
  <span class="ex1-drawer__name">
    <span><strong>Bananas</strong></span>
    <span class="ex1-drawer__arrow">></span>
  </span>
  <ul class="ex1-drawer__content">
    <li>Bruised</li>
    <li>Green</li>
    <li>Perfect</li>
  </ul>
</div>
<div class="ex1-drawer">
  <input type="checkbox">
  <span class="ex1-drawer__name">
    <span><strong>Apples</strong></span>
    <span class="ex1-drawer__arrow">></span>
  </span>
  <ul class="ex1-drawer__content">
    <li>Mealy</li>
    <li>Crisp</li>
    <li>Green</li>
  </ul>
</div>
<div class="ex1-drawer">
  <input type="checkbox">
  <span class="ex1-drawer__name">
    <span><strong>Oranges</strong></span>
    <span class="ex1-drawer__arrow">></span>
  </span>
  <ul class="ex1-drawer__content">
    <li>Bitter</li>
    <li>Sour</li>
    <li>Sweet</li>
  </ul>
</div>
```
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
  top: 40px;
  left: 0;
  width: 100%;
  height: 0;
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
```css css-live
.drawer {
  position: relative;
  box-sizing: border-box;
  width: 300px;
}
.drawer input {
  width: 100%;
  height: 100%;
  outline: 2px solid red;
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
  top: 40px;
  left: 0;
  width: 100%;
  height: 0;
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

```css css-live no-code
.hidden-hamburger-menu__wrapper {
  min-height: 400px;
  position: relative;
  text-align: center;
}
.hidden-hamburger-menu {
  height: 100%;
  width: 300px;
  position: absolute;
  top: 0;
  left: 0;
}
.hidden-hamburger-menu__button {
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

.hidden-hamburger-menu__button span {
  line-height: 8px;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 400;
}

.hidden-hamburger-menu__button span:last-child {
  padding-bottom: 5px;
}
.hidden-hamburger-menu__wrapper {
  position: relative;
  height: 100%;
  overflow: hidden;
}
.hidden-hamburger-menu__wrapper input[type='checkbox'] {
  width: 40px;
  height: 40px;
  opacity: 0;
  position: absolute;
  top: 6px;
  left: 6px;
  z-index: 4;
  cursor: pointer;
}

.hidden-hamburger-menu__wrapper input:checked ~ .hidden-hamburger-menu__button {
  background: #d2f2fc;
}

.hidden-hamburger-menu__wrapper input:checked ~ .hidden-hamburger-menu__slider {
  transform: none;
}

.hidden-hamburger-menu__slider {
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

.hidden-hamburger-menu__item {
  padding: 10px 0 10px 10px;
}

.hidden-hamburger-menu__item:hover {
  background-color: #d2f2fc;
}

.hidden-hamburger-menu__item:first-of-type {
  margin-top: 60px;
}
```

```html html-live no-code
<div class="hidden-hamburger-menu__wrapper">
  <div class="hidden-hamburger-menu">
    <div class="hidden-hamburger-menu__wrapper">
      <input type="checkbox" />
      <div class="hidden-hamburger-menu__button">
        <span>&mdash;</span>
        <span>&mdash;</span>
        <span>&mdash;</span>
      </div>
      <div class="hidden-hamburger-menu__slider">
        <div class="hidden-hamburger-menu__item">Thing 1</div>
        <div class="hidden-hamburger-menu__item">Thing 2</div>
        <div class="hidden-hamburger-menu__item">Thing 3</div>
        <div class="hidden-hamburger-menu__item">Thing 4</div>
      </div>
    </div>
  </div>
  <h2>Hamburger!!</h2>
  <p>Click the Button to toggle the menu</p>
</div>
```

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
