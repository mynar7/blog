---
title: Staying Sane while Organizing CSS
date: 2020-08-20T23:00:00-0400
---

![Mug with 'CSS is Awesome' written on it, but 'Awesome' overflows the border of the text](./mugcss.jpg)

In my time as a front-end developer, I've seen and heard a lot of gripes about CSS.

Some of you out there would probably rather go learn Haskell or GoLang over a weekend than spend an hour or two than have to style a component on a website.

If you _do_ get stuck on a UI task as someone at odds with CSS, you might reach for a CSS framework like Bootstrap, Materialize, Bulma, Tailwind, etc.

While CSS frameworks can be great accelerators, they often require excellent CSS skills to use them well. If you want to customize beyond what the framework gives you out of the box, it often means integrating with or overriding those styles, which can be a tall-order at times. (Raise your hand if you've cursed while typing `!important`)

It doesn't have to be that way, though. After spending some time learning CSS, I'm a lot better and faster at it. Sure, I get salty over CSS from time to time still, but now I mostly find it enjoyable.

I also find myself writing _less_ CSS, not more, to achieve the look I want.

## Preparing for Success: Reset vs Normalize

HTML elements come with their own default styling. Unfortunately, much of it is flat-out ugly (Looking at you, form input elements).

To make things worse, browsers _still_ have not reached 100% parity on that default styling. This means certain elements appear differently on different browsers.

In the worst case scenario, you end up overriding that default styling over and over again in your stylesheet to achieve the look or positioning you want. Don't fall into this trap.

For default styles, we can stand on the shoulders of those brave developers that came before us with two powerful solutions: Reset and Normalize.

These are both mini-stylesheets that you can include (**before** all other styles--remember the cascade) to help reduce the pain of default styling.

### CSS Reset

[CSS Reset](https://cssreset.com/scripts/eric-meyer-reset-css/) is essentially the nuclear option. It wipes out all the styles from all of the elements, more or less making them differ in name only. `<h1>`'s look like `<p>` tags, for example.

This is a valid solution if you need to start from scratch, but you typically don't need to obliterate the default styles completely. If you do, you're going to have to go back in and make that `<h1>` large and bold again with _more_ CSS, and you're reading this to write less CSS, right?

### Normalize CSS

[Normalize CSS](https://necolas.github.io/normalize.css/) is the more elegant solution than a reset. Its goal is to even out the kinks between browsers and address the most common issues with default styles, while leaving the rest intact.

Most CSS frameworks have a normalize built into them already, so you won't need to add this in if you're using Bootstrap, Materialize, etc.

### The Quick and Dirty Reset

There's a third option here worth mentioning. If you're trying to get things done quickly and not using a framework, you can quickly eliminate 90% of the funk with something like this:

```css
* {
    margin: 0;
    padding: 0;
    /* box-sizing: border-box */
    /* border: 1px solid black */
}
```

This ends up stripping out all the micro-adjustments you typically have to come in and do later if you roll with the default padding and margin on elements. (The `*` is a wildcard selector that selects all elements)

You can optionally toss in the `box-sizing` bit to make sure that your widths/heights are not additive. This means if you say an element is `500px`, it will be exactly that regardless of padding, margin, or border that you add in later. I don't typically find myself reaching for this, but it can help when you're doing pixel-perfect layouts.

The last bit is a little 🔥 **hot-tip** 🔥 for debugging CSS layouts. If you're wondering how big or what shape an element is, simply uncomment that line to outline all of the elements on the page.

## Writing Good Markup and 'Going with the Flow'

[CSS Zen Garden](http://www.csszengarden.com/) showed us the awesome power of CSS to style HTML regardless of how it is written.

_What's that quote about power and responsibility...?_ 🤔🕷

HTML has a certain [flow](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Normal_Flow) to it. It's read and rendered Top to Bottom, certain elements are `block` or `inline`, etc. The greater your knowledge of this default behavior, the better you can use it to your advantage, and the less CSS you'll have to write to change it.

Yes, CSS can do amazing things to change the default behavior of markup. However, if you write your HTML with your end goal in mind, you'll end up weaponizing CSS less often to make your markup behave appropriately.


## Mastering Layouts with Flexbox and Utility Classes

Layouts and positioning of elements is probably the biggest source of strife when learning CSS. You want an element to be in a particular spot, so you write ten lines of CSS that _almost_ positions it perfectly. Then you write ten more lines of CSS, but now it's vertically off-center, etc.

There's a few tools and tricks that can dramatically reduce the amount of time you spend attempting to place elements where you want them to go.

### Floats

Let's squash this before we get to the fun bits. If you're using floats for layouts, _please stop_. Flexbox is [highly compatible](https://caniuse.com/#feat=flexbox) with older browsers, and it's way easier to use.

Here's probably the only time you'll want to reach for a float:

```html html-live
<img src="https://picsum.photos/200" id="floatImage"/>
<!-- Let's say we want this blob of text to wrap around our example image -->
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultricies sem id ante ullamcorper, a commodo eros molestie. Phasellus leo justo, malesuada scelerisque ullamcorper et, finibus ut metus. Integer egestas tellus leo, et consectetur tortor bibendum at. Sed non imperdiet risus. Sed at metus mauris. Donec ullamcorper, nunc sit amet ullamcorper mattis, diam sapien viverra nisi, sit amet pretium ligula mi in est. Nulla finibus imperdiet fringilla. Proin fringilla augue et turpis placerat, sit amet commodo enim dictum. Vivamus viverra mollis augue, in fermentum odio placerat eu. Aenean porta tellus quis urna tristique sagittis.
```

```css css-live
#floatImage {
    /* 'float' makes the text wrap around the image, try 'right' */
    float: left;
    /* the rest of this is to better illustrate the wrapping effect */
    shape-outside: circle();
    border-radius: 100px;
    margin: 5px;
}
```

If you're not wrapping text around an element, you probably don't want to use a float.

```css css-live
.row, .column {
    display: flex;
    flex-wrap: wrap;
}
.column {
    flex-direction: column;
}

 /* add some styles to prettify */
header {
    background-color: lightblue;
    height: 50px;
    padding: 0 5px;
}

header p {
  color: #eee
}
```

```html html-live
<header class="row">
    <h1>Logo</h1>
    <p>Link</p>
    <p>Link</p>
    <p>Link</p>
</header>
```