---
title: Vue Testing
date: 2019-08-20T23:00:00-0400
---


```js js-live scripts=vue!https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.10/vue.min.js autorun no-edit
const app = new Vue({
  el: '#vue-testing-entry',
  data: {
    message: 'Hello Vue!'
  }
})
```
```html html-live no-edit
<div id="vue-testing-entry">
    {{message}}
    <br>
    <input style="width: 100%" v-model="message"/>
</div>
```

```js js-live autorun no-edit
console.log(8 * 4)
```

```js
const apple = "meatloaf"
```

```jsx react-live scripts=react!https://cdnjs.cloudflare.com/ajax/libs/react/16.9.0/umd/react.production.min.js,react-dom!https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.8.6/umd/react-dom.production.min.js,styled!https://cdnjs.cloudflare.com/ajax/libs/styled-components/4.3.2/styled-components.min.js use-render no-edit
function testComponent() {
  //React.useEffect(() => console.log('styled is: ', styled), [])
  const Div = styled.div`
    color: red;
    font-weight: 900
  `
  return (
    <Div>Banana</Div>
  )
}
render(testComponent)
```