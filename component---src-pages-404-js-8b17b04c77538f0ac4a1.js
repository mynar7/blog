(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{650:function(e,t,r){"use strict";r.r(t);var n=r(1),a=r.n(n),o=r(654),i=r(655);r(55);var c=function(e){var t,r;function n(){return e.apply(this,arguments)||this}return r=e,(t=n).prototype=Object.create(r.prototype),t.prototype.constructor=t,t.__proto__=r,n.prototype.render=function(){return a.a.createElement(o.a,{location:this.props.location},a.a.createElement(i.a,{title:"404: Not Found"}),a.a.createElement("h1",null,"Not Found"),a.a.createElement("p",null,"You just hit a route that doesn't exist... the sadness."))},n}(a.a.Component);t.default=c},652:function(e,t,r){"use strict";r.d(t,"b",function(){return p});var n=r(1),a=r.n(n),o=r(26),i=r.n(o),c=r(97),s=r.n(c);r.d(t,"a",function(){return s.a});r(653);var l=a.a.createContext({});function u(e){var t=e.staticQueryData,r=e.data,n=e.query,o=e.render,i=r?r.data:t[n]&&t[n].data;return a.a.createElement(a.a.Fragment,null,i&&o(i),!i&&a.a.createElement("div",null,"Loading (StaticQuery)"))}var p=function(e){var t=e.data,r=e.query,n=e.render,o=e.children;return a.a.createElement(l.Consumer,null,function(e){return a.a.createElement(u,{data:t,query:r,render:n||o,staticQueryData:e})})};p.propTypes={data:i.a.object,query:i.a.string.isRequired,render:i.a.func,children:i.a.func}},653:function(e,t,r){var n;e.exports=(n=r(656))&&n.default||n},654:function(e,t,r){"use strict";r(32),r(12),r(5),r(4),r(3),r(7);var n=r(1),a=r.n(n),o=r(652),i=(r(647),r(22));function c(e){for(var t=1;t<arguments.length;t++)if(t%2){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(t){s(e,t,r[t])})}else Object.defineProperties(e,Object.getOwnPropertyDescriptors(arguments[t]));return e}function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var l=function(e){var t,r;function n(){return e.apply(this,arguments)||this}return r=e,(t=n).prototype=Object.create(r.prototype),t.prototype.constructor=t,t.__proto__=r,n.prototype.render=function(){var e,t=this.props,r=t.location,n=t.title,s=t.children;return e="/"===r.pathname?a.a.createElement("h1",{style:c({},Object(i.b)(1.5),{marginBottom:Object(i.a)(1.5),marginTop:0})},a.a.createElement(o.a,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},n)):a.a.createElement("h3",{style:{marginTop:0,marginBottom:Object(i.a)(-1)}},a.a.createElement(o.a,{to:"/"},n)),a.a.createElement("div",{className:"wrapper"},e,s,a.a.createElement("footer",{style:{display:"flex",justifyContent:"space-between",flexWrap:"wrap"}},a.a.createElement("span",{style:{marginBottom:"10px"}},"© ",(new Date).getFullYear(),", Built with  ",a.a.createElement("a",{href:"https://www.gatsbyjs.org"},"Gatsby"),",  ",a.a.createElement("a",{href:"https://www.youtube.com/watch?v=HEXWRTEbj1I"},"Love"),", and ",a.a.createElement("a",{href:"https://cameronsworld.net"},"Inter-webs"),".   ...",a.a.createElement("a",{href:"https://teespring.com/stores/tech-jr-store"},"Buy somethin', will ya?")),"/"!==r.pathname&&a.a.createElement("span",null,a.a.createElement(o.a,{to:"/"},"Home"))))},n}(a.a.Component);t.a=l},655:function(e,t,r){"use strict";var n=r(657),a=r(1),o=r.n(a),i=r(26),c=r.n(i),s=r(661),l=r.n(s),u=r(652);function p(e){var t=e.description,r=e.lang,a=void 0===r?"en":r,i=e.meta,c=void 0===i?[]:i,s=e.keywords,p=void 0===s?[]:s,d=e.title,y=e.twitterImageUrl,f=e.twitterImageAltText;return o.a.createElement(u.b,{query:m,render:function(e){var r=t||e.site.siteMetadata.description;return o.a.createElement(l.a,{htmlAttributes:{lang:a},title:d,titleTemplate:d===e.site.siteMetadata.title?d:"%s | "+e.site.siteMetadata.title,meta:[{name:"description",content:r},{property:"og:title",content:d},{property:"og:description",content:r},{property:"og:type",content:"website"},{property:"og:image",content:y||e.site.siteMetadata.logo},{property:"twitter:image",content:y||e.site.siteMetadata.logo},{property:"twitter:alt:image",content:f||"Buddhist enso swirl logo"},{name:"twitter:card",content:y?"summary_large_image":"summary"},{name:"twitter:creator",content:e.site.siteMetadata.author},{name:"twitter:site",content:e.site.siteMetadata.social.twitter},{name:"twitter:title",content:d},{name:"twitter:description",content:r}].concat(p.length>0?{name:"keywords",content:p.join(", ")}:{name:"keywords",content:"blog, web development, developer, front-end developer"}).concat(c)})},data:n})}p.defaultProps={lang:"en",meta:[],keywords:[]},p.propTypes={description:c.a.string,lang:c.a.string,meta:c.a.array,keywords:c.a.arrayOf(c.a.string),title:c.a.string.isRequired},t.a=p;var m="2838703103"},656:function(e,t,r){"use strict";r.r(t);r(32),r(12),r(5),r(4),r(3),r(7);var n=r(1),a=r.n(n),o=r(26),i=r.n(o),c=r(126);function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var l=function(e){var t=e.location,r=e.pageResources;return r?a.a.createElement(c.a,function(e){for(var t=1;t<arguments.length;t++)if(t%2){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(t){s(e,t,r[t])})}else Object.defineProperties(e,Object.getOwnPropertyDescriptors(arguments[t]));return e}({location:t,pageResources:r},r.json)):null};l.propTypes={location:i.a.shape({pathname:i.a.string.isRequired}).isRequired},t.default=l},657:function(e){e.exports={data:{site:{siteMetadata:{title:"Strings and Things",description:"A blog that's mostly about code. I talk about front-end web development, give career advice, and sometimes ruminate on life lessons learned with connections to code",author:"Lee Warrick",logo:"https://leewarrick.com/blog/logo2.png",social:{twitter:"leewarrickjr"}}}}}}}]);
//# sourceMappingURL=component---src-pages-404-js-8b17b04c77538f0ac4a1.js.map