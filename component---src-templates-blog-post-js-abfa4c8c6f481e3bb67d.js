(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{637:function(t,e,r){"use strict";r.r(e),r.d(e,"pageQuery",function(){return b});r(24),r(5),r(4),r(3),r(12);var a=r(2),n=r.n(a),A=r(640),o=r(657),i=r.n(o),c=r(648),l=r(645),s=r(646),u=r(641);function p(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},a=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(r).filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),a.forEach(function(e){f(t,e,r[e])})}return t}function f(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var d=function(t){var e,r;function a(){return t.apply(this,arguments)||this}return r=t,(e=a).prototype=Object.create(r.prototype),e.prototype.constructor=e,e.__proto__=r,a.prototype.render=function(){var t=this.props.data.mdx,e=this.props.data.site.siteMetadata.title,r=this.props.pageContext,a=r.previous,o=r.next;return n.a.createElement(l.a,{location:this.props.location,title:e},n.a.createElement(s.a,{title:t.frontmatter.title,description:t.excerpt}),n.a.createElement("h1",null,t.frontmatter.title),n.a.createElement("p",{style:p({},Object(u.b)(-.2),{display:"block",marginBottom:Object(u.a)(1),marginTop:Object(u.a)(-1)})},t.frontmatter.date),n.a.createElement(i.a,null,t.code.body),n.a.createElement("hr",{style:{marginBottom:Object(u.a)(1)}}),n.a.createElement(c.a,null),n.a.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},n.a.createElement("li",null,a&&n.a.createElement(A.a,{to:a.fields.slug,rel:"prev"},"← ",a.frontmatter.title)),n.a.createElement("li",null,o&&n.a.createElement(A.a,{to:o.fields.slug,rel:"next"},o.frontmatter.title," →"))))},a}(n.a.Component);e.default=d;var b="3250015227"},640:function(t,e,r){"use strict";r.d(e,"b",function(){return u});var a=r(2),n=r.n(a),A=r(25),o=r.n(A),i=r(84),c=r.n(i);r.d(e,"a",function(){return c.a});r(642);var l=n.a.createContext({});function s(t){var e=t.staticQueryData,r=t.data,a=t.query,A=t.render,o=r?r.data:e[a]&&e[a].data;return n.a.createElement(n.a.Fragment,null,o&&A(o),!o&&n.a.createElement("div",null,"Loading (StaticQuery)"))}var u=function(t){var e=t.data,r=t.query,a=t.render,A=t.children;return n.a.createElement(l.Consumer,null,function(t){return n.a.createElement(s,{data:e,query:r,render:a||A,staticQueryData:t})})};u.propTypes={data:o.a.object,query:o.a.string.isRequired,render:o.a.func,children:o.a.func}},641:function(t,e,r){"use strict";r.d(e,"a",function(){return c}),r.d(e,"b",function(){return l});var a=r(652),n=r.n(a),A=r(653),o=r.n(A);o.a.overrideThemeStyles=function(){return{"a.gatsby-resp-image-link":{boxShadow:"none"}}},delete o.a.googleFonts;var i=new n.a(o.a);var c=i.rhythm,l=i.scale},642:function(t,e,r){var a;t.exports=(a=r(643))&&a.default||a},643:function(t,e,r){"use strict";r.r(e);r(24),r(5),r(4),r(3),r(12);var a=r(2),n=r.n(a),A=r(25),o=r.n(A),i=r(109);function c(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var l=function(t){var e=t.location,r=t.pageResources;return r?n.a.createElement(i.a,function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},a=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(r).filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),a.forEach(function(e){c(t,e,r[e])})}return t}({location:e,pageResources:r},r.json)):null};l.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},e.default=l},645:function(t,e,r){"use strict";r(24),r(5),r(4),r(3),r(12);var a=r(2),n=r.n(a),A=r(640),o=r(641);function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},a=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(r).filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),a.forEach(function(e){c(t,e,r[e])})}return t}function c(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var l=function(t){var e,r;function a(){return t.apply(this,arguments)||this}return r=t,(e=a).prototype=Object.create(r.prototype),e.prototype.constructor=e,e.__proto__=r,a.prototype.render=function(){var t,e=this.props,r=e.location,a=e.title,c=e.children;return t="/blog/"===r.pathname?n.a.createElement("h1",{style:i({},Object(o.b)(1.5),{marginBottom:Object(o.a)(1.5),marginTop:0})},n.a.createElement(A.a,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},a)):n.a.createElement("h3",{style:{fontFamily:"Montserrat, sans-serif",marginTop:0,marginBottom:Object(o.a)(-1)}},n.a.createElement(A.a,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},a)),n.a.createElement("div",{style:{marginLeft:"auto",marginRight:"auto",maxWidth:Object(o.a)(24),padding:Object(o.a)(1.5)+" "+Object(o.a)(.75)}},t,c,n.a.createElement("footer",null,"© ",(new Date).getFullYear(),", Built with"," ",n.a.createElement("a",{href:"https://www.gatsbyjs.org"},"Gatsby")))},a}(n.a.Component);e.a=l},646:function(t,e,r){"use strict";var a=r(647),n=r(2),A=r.n(n),o=r(25),i=r.n(o),c=r(654),l=r.n(c),s=r(640);function u(t){var e=t.description,r=t.lang,n=t.meta,o=t.keywords,i=t.title;return A.a.createElement(s.b,{query:p,render:function(t){var a=e||t.site.siteMetadata.description;return A.a.createElement(l.a,{htmlAttributes:{lang:r},title:i,titleTemplate:"%s | "+t.site.siteMetadata.title,meta:[{name:"description",content:a},{property:"og:title",content:i},{property:"og:description",content:a},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:t.site.siteMetadata.author},{name:"twitter:title",content:i},{name:"twitter:description",content:a}].concat(o.length>0?{name:"keywords",content:o.join(", ")}:[]).concat(n)})},data:a})}u.defaultProps={lang:"en",meta:[],keywords:[]},u.propTypes={description:i.a.string,lang:i.a.string,meta:i.a.array,keywords:i.a.arrayOf(i.a.string),title:i.a.string.isRequired},e.a=u;var p="1025518380"},647:function(t){t.exports={data:{site:{siteMetadata:{title:"Gatsby Starter Blog MDX",description:"An extension of the gatsby starter blog, with support for MDX",author:"Lee Warrick"}}}}},648:function(t,e,r){"use strict";r(644);var a=r(650),n=r(2),A=r.n(n),o=r(640),i=r(651),c=r.n(i),l=r(641);var s="4007731267";e.a=function(){return A.a.createElement(o.b,{query:s,render:function(t){var e=t.site.siteMetadata,r=e.author,a=e.social;return A.a.createElement("div",{style:{display:"flex",marginBottom:Object(l.a)(2.5)}},A.a.createElement(c.a,{fixed:t.avatar.childImageSharp.fixed,alt:r,style:{marginRight:Object(l.a)(.5),marginBottom:0,minWidth:50,borderRadius:"100%"}}),A.a.createElement("p",null,"Written by ",A.a.createElement("strong",null,r)," who lives and works in Minneapolis building silly things."," ",A.a.createElement("a",{href:"https://twitter.com/"+a.twitter},"You should follow him on Twitter")))},data:a})}},650:function(t){t.exports={data:{avatar:{childImageSharp:{fixed:{base64:"data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAUABQDASIAAhEBAxEB/8QAGQABAQEAAwAAAAAAAAAAAAAAAAUDAQQG/8QAFwEAAwEAAAAAAAAAAAAAAAAAAAECA//aAAwDAQACEAMQAAABwy5oTU9WNedtjO2Mq//EABsQAAMAAgMAAAAAAAAAAAAAAAECAwAREBIh/9oACAEBAAEFArEA6biejkV9aSsynqZULYTo/wD/xAAWEQEBAQAAAAAAAAAAAAAAAAAQAWH/2gAIAQMBAT8B0h//xAAWEQEBAQAAAAAAAAAAAAAAAAAQAjH/2gAIAQIBAT8BKw//xAAaEAACAwEBAAAAAAAAAAAAAAAAARARIUED/9oACAEBAAY/AkvJb0pqH00bowp1H//EABoQAAMBAQEBAAAAAAAAAAAAAAABESExUWH/2gAIAQEAAT8hpFi6xG2KonwgcPdNzFfR3Id3ujKB1KEPwP/aAAwDAQACAAMAAAAQvAcC/8QAFxEBAQEBAAAAAAAAAAAAAAAAAQARIf/aAAgBAwEBPxBOTZyG3//EABcRAQEBAQAAAAAAAAAAAAAAAAEAESH/2gAIAQIBAT8QOcsgahcv/8QAHBABAAMAAwEBAAAAAAAAAAAAAQARITFBcVGB/9oACAEBAAE/ELJqWcKYb3BElWFGJ37N6W8iO7W3q/mdQUE4IsOyHkCQNKgFWuZBqU0w1YFiFJ+xqLOZ/9k=",width:50,height:50,src:"/blog/static/bfd79473fcbb228b5f5a7c6ac39268cc/9b664/profile-pic.jpg",srcSet:"/blog/static/bfd79473fcbb228b5f5a7c6ac39268cc/9b664/profile-pic.jpg 1x,\n/blog/static/bfd79473fcbb228b5f5a7c6ac39268cc/06a10/profile-pic.jpg 1.5x,\n/blog/static/bfd79473fcbb228b5f5a7c6ac39268cc/f1b5a/profile-pic.jpg 2x"}}},site:{siteMetadata:{author:"Lee Warrick",social:{twitter:"leewarrickjr"}}}}}}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-abfa4c8c6f481e3bb67d.js.map