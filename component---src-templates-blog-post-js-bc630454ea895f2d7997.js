(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{644:function(e,t,n){"use strict";n.r(t),n.d(t,"pageQuery",function(){return y});n(40),n(17),n(5),n(4),n(3),n(10);var r=n(1),o=n.n(r),c=n(647),a=n(658),u=n(654),i=n(649),l=n(650),f=n(59);function p(e){for(var t=1;t<arguments.length;t++)if(t%2){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){s(e,t,n[t])})}else Object.defineProperties(e,Object.getOwnPropertyDescriptors(arguments[t]));return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}t.default=function(e){var t=e.data.mdx,n=e.data.site.siteMetadata.title,r=e.pageContext,s=r.previous,y=r.next;return o.a.createElement(i.a,{location:e.location,title:n},o.a.createElement(l.a,{title:t.frontmatter.title,description:t.excerpt}),o.a.createElement("h1",{style:{marginTop:Object(f.a)(2.5)}},t.frontmatter.title),o.a.createElement("p",{style:p({},Object(f.b)(-.2),{display:"block",marginBottom:Object(f.a)(1),marginTop:Object(f.a)(-1)})},t.frontmatter.date),o.a.createElement(a.MDXRenderer,null,t.body),o.a.createElement("hr",{style:{marginBottom:Object(f.a)(1)}}),o.a.createElement(u.a,null),o.a.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},o.a.createElement("li",null,s&&o.a.createElement(c.a,{to:s.fields.slug,rel:"prev"},"← ",s.frontmatter.title)),o.a.createElement("li",null,y&&o.a.createElement(c.a,{to:y.fields.slug,rel:"next"},y.frontmatter.title," →"))))};var y="1876540457"},653:function(e,t,n){var r=n(6),o=n(64),c=n(63),a=n(14),u=n(13),i=n(12),l=n(660),f=(n(7).Reflect||{}).construct,p=i(function(){function e(){}return!(f(function(){},[],e)instanceof e)}),s=!i(function(){f(function(){})});r(r.S+r.F*(p||s),"Reflect",{construct:function(e,t){c(e),a(t);var n=arguments.length<3?e:c(arguments[2]);if(s&&!p)return f(e,t,n);if(e==n){switch(t.length){case 0:return new e;case 1:return new e(t[0]);case 2:return new e(t[0],t[1]);case 3:return new e(t[0],t[1],t[2]);case 4:return new e(t[0],t[1],t[2],t[3])}var r=[null];return r.push.apply(r,t),new(l.apply(e,r))}var i=n.prototype,y=o(u(i)?i:Object.prototype),b=Function.apply.call(e,y,t);return u(b)?b:y}})},658:function(e,t,n){var r=n(659);e.exports={MDXRenderer:r}},659:function(e,t,n){function r(e,t,n){return(r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()?Reflect.construct:function(e,t,n){var r=[null];r.push.apply(r,t);var c=new(Function.bind.apply(e,r));return n&&o(c,n.prototype),c}).apply(null,arguments)}function o(e,t){return(o=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function c(e){for(var t=1;t<arguments.length;t++)if(t%2){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){a(e,t,n[t])})}else Object.defineProperties(e,Object.getOwnPropertyDescriptors(arguments[t]));return e}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n(40),n(17),n(5),n(4),n(10),n(77),n(23),n(3),n(653),n(23),n(653),n(77),n(40),n(17),n(5),n(4),n(3),n(10);var u=n(1),i=n(74),l=i.useMDXComponents,f=i.mdx,p=n(141).useMDXScope;e.exports=function(e){var t=e.scope,n=e.components,o=e.children,a=function(e,t){if(null==e)return{};var n,r,o={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,["scope","components","children"]),i=l(n),s=p(t),y=u.useMemo(function(){if(!o)return null;var e=c({React:u,mdx:f},s),t=Object.keys(e),n=t.map(function(t){return e[t]});return r(Function,["_fn"].concat(t,[""+o])).apply(void 0,[{}].concat(n))},[o,t]);return u.createElement(y,c({components:i},a))}},660:function(e,t,n){"use strict";var r=n(63),o=n(13),c=n(168),a=[].slice,u={};e.exports=Function.bind||function(e){var t=r(this),n=a.call(arguments,1),i=function(){var r=n.concat(a.call(arguments));return this instanceof i?function(e,t,n){if(!(t in u)){for(var r=[],o=0;o<t;o++)r[o]="a["+o+"]";u[t]=Function("F,a","return new F("+r.join(",")+")")}return u[t](e,n)}(t,r.length,r):c(t,r,e)};return o(t.prototype)&&(i.prototype=t.prototype),i}}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-bc630454ea895f2d7997.js.map