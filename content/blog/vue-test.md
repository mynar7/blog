---
title: Vue Testing
date: 2019-08-20T23:00:00-0400
---

```html html-live
<div id="vue-testing-entry">
    {{message}}
</div>
```

```js js-live scripts=vue!https://cdn.jsdelivr.net/npm/vue/dist/vue.js autorun
const app = new Vue({
  el: '#vue-testing-entry',
  data: {
    message: 'Hello Vue!'
  }
})
```

```js js-live autorun
console.log(8 * 4)
```
