(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{636:function(e,t,a){"use strict";a.d(t,"b",function(){return u});var r=a(2),n=a.n(r),i=a(22),o=a.n(i),s=a(87),l=a.n(s);a.d(t,"a",function(){return l.a});a(638);var d=n.a.createContext({});function c(e){var t=e.staticQueryData,a=e.data,r=e.query,i=e.render,o=a?a.data:t[r]&&t[r].data;return n.a.createElement(n.a.Fragment,null,o&&i(o),!o&&n.a.createElement("div",null,"Loading (StaticQuery)"))}var u=function(e){var t=e.data,a=e.query,r=e.render,i=e.children;return n.a.createElement(d.Consumer,null,function(e){return n.a.createElement(c,{data:t,query:a,render:r||i,staticQueryData:e})})};u.propTypes={data:o.a.object,query:o.a.string.isRequired,render:o.a.func,children:o.a.func}},637:function(e,t,a){"use strict";a.d(t,"a",function(){return i}),a.d(t,"b",function(){return o});var r=a(646),n=new(a.n(r).a)({baseFontSize:"20px",baseLineHeight:1.5,headerFontFamily:["Titillium Web","sans-serif"],headerWeight:"900",bodyFontFamily:["Titillium Web","sans-serif"]});var i=n.rhythm,o=n.scale},638:function(e,t,a){var r;e.exports=(r=a(641))&&r.default||r},639:function(e,t,a){"use strict";a(50),a(18),a(5),a(4),a(3),a(11);var r=a(2),n=a.n(r),i=a(636),o=(a(631),a(637));function s(e){for(var t=1;t<arguments.length;t++)if(t%2){var a=null!=arguments[t]?arguments[t]:{},r=Object.keys(a);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(a).filter(function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable}))),r.forEach(function(t){l(e,t,a[t])})}else Object.defineProperties(e,Object.getOwnPropertyDescriptors(arguments[t]));return e}function l(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var d=function(e){var t,a;function r(){return e.apply(this,arguments)||this}return a=e,(t=r).prototype=Object.create(a.prototype),t.prototype.constructor=t,t.__proto__=a,r.prototype.render=function(){var e,t=this.props,a=t.location,r=t.title,l=t.children;return e="/blog/"===a.pathname?n.a.createElement("h1",{style:s({},Object(o.b)(1.5),{marginBottom:Object(o.a)(1.5),marginTop:0})},n.a.createElement(i.a,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},r)):n.a.createElement("h3",{style:{marginTop:0,marginBottom:Object(o.a)(-1)}},n.a.createElement(i.a,{to:"/"},r)),n.a.createElement("div",{style:{margin:"auto",maxWidth:Object(o.a)(32),padding:Object(o.a)(1.5)+" "+Object(o.a)(1.5),background:"var(--white)",boxShadow:"2px 4px 3px var(--gray)"}},e,l,n.a.createElement("footer",{style:{display:"flex",justifyContent:"space-between",flexWrap:"wrap"}},n.a.createElement("span",{style:{marginBottom:"10px"}},"© ",(new Date).getFullYear(),", Built with"," ",n.a.createElement("a",{href:"https://www.gatsbyjs.org"},"Gatsby"),", Love, and ",n.a.createElement("a",{href:"https://cameronsworld.net"},"Inter-webs")),"/blog/"!==a.pathname&&n.a.createElement("span",null,n.a.createElement(i.a,{to:"/"},"Home"))))},r}(n.a.Component);t.a=d},640:function(e,t,a){"use strict";var r=a(642),n=a(2),i=a.n(n),o=a(22),s=a.n(o),l=a(647),d=a.n(l),c=a(636);function u(e){var t=e.description,a=e.lang,n=e.meta,o=e.keywords,s=e.title;return i.a.createElement(c.b,{query:f,render:function(e){var r=t||e.site.siteMetadata.description;return i.a.createElement(d.a,{htmlAttributes:{lang:a},title:s,titleTemplate:"%s | "+e.site.siteMetadata.title,meta:[{name:"description",content:r},{property:"og:title",content:s},{property:"og:description",content:r},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:e.site.siteMetadata.author},{name:"twitter:title",content:s},{name:"twitter:description",content:r}].concat(o.length>0?{name:"keywords",content:o.join(", ")}:[]).concat(n)})},data:r})}u.defaultProps={lang:"en",meta:[],keywords:[]},u.propTypes={description:s.a.string,lang:s.a.string,meta:s.a.array,keywords:s.a.arrayOf(s.a.string),title:s.a.string.isRequired},t.a=u;var f="1025518380"},641:function(e,t,a){"use strict";a.r(t);a(50),a(18),a(5),a(4),a(3),a(11);var r=a(2),n=a.n(r),i=a(22),o=a.n(i),s=a(113);function l(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var d=function(e){var t=e.location,a=e.pageResources;return a?n.a.createElement(s.a,function(e){for(var t=1;t<arguments.length;t++)if(t%2){var a=null!=arguments[t]?arguments[t]:{},r=Object.keys(a);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(a).filter(function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable}))),r.forEach(function(t){l(e,t,a[t])})}else Object.defineProperties(e,Object.getOwnPropertyDescriptors(arguments[t]));return e}({location:t,pageResources:a},a.json)):null};d.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},t.default=d},642:function(e){e.exports={data:{site:{siteMetadata:{title:"Strings and Things",description:"A blog about that's mostly about code by Lee Warrick.",author:"Lee Warrick"}}}}},644:function(e,t,a){"use strict";a(645);var r=a(652),n=a(2),i=a.n(n),o=a(636),s=a(653),l=a.n(s),d=a(637);var c="3223108409";t.a=function(){return i.a.createElement(o.b,{query:c,render:function(e){var t=e.site.siteMetadata,a=t.author,r=t.social;return i.a.createElement("div",{style:{marginBottom:Object(d.a)(2.5)}},i.a.createElement(l.a,{fixed:e.avatar.childImageSharp.fixed,alt:a,style:{marginRight:Object(d.a)(.5),marginBottom:0,minWidth:80,borderRadius:"100%",float:"left"}}),i.a.createElement("p",null,"Written by ",i.a.createElement("a",{href:"https://leewarrick.com"},i.a.createElement("strong",null,a)),", Front-end Developer, Guitarist, Gamer, and Co-host of the ",i.a.createElement("a",{href:"https://techjr.dev"},"Tech Jr Podcast"),". Follow him on"," ",i.a.createElement("a",{href:"https://twitter.com/"+r.twitter},"Twitter"),"."))},data:r})}},645:function(e,t,a){"use strict";a(160)("fixed",function(e){return function(){return e(this,"tt","","")}})},652:function(e){e.exports={data:{avatar:{childImageSharp:{fixed:{base64:"data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAUABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAME/8QAFwEBAQEBAAAAAAAAAAAAAAAAAgMAAf/aAAwDAQACEAMQAAABkvEUxrOmuUod4x//xAAdEAACAgEFAAAAAAAAAAAAAAABAgMhEwARIiMx/9oACAEBAAEFAnHZwDPTz7iRGGSZDlkvXpS1/8QAGBEAAgMAAAAAAAAAAAAAAAAAAAEQETH/2gAIAQMBAT8BWFz/AP/EABYRAAMAAAAAAAAAAAAAAAAAAAAQEf/aAAgBAgEBPwEj/8QAHBAAAgICAwAAAAAAAAAAAAAAAREAAhASQVJh/9oACAEBAAY/AqPrAatyw9j41UGzUshgY//EABoQAQADAQEBAAAAAAAAAAAAAAEAESExQXH/2gAIAQEAAT8hzLVpqYCFrfpL7mL2AY4FpS1ZmxCKi9COpc3U/YnpP//aAAwDAQACAAMAAAAQxNi//8QAFxEBAQEBAAAAAAAAAAAAAAAAARARMf/aAAgBAwEBPxBGoOM//8QAFxEBAQEBAAAAAAAAAAAAAAAAARARUf/aAAgBAgEBPxBHY5P/xAAbEAEAAwADAQAAAAAAAAAAAAABABEhQVFxof/aAAgBAQABPxBSxoOtOfstxMFbZpG4ki+w7iV0wDr5EpaUr0WEsudEIxhpBRQcbJYaSaB08hBUVmT/2Q==",width:80,height:80,src:"/blog/static/dbf37cd74f542721ca6dd973938d0a48/bd6c6/profile-pic.jpg",srcSet:"/blog/static/dbf37cd74f542721ca6dd973938d0a48/bd6c6/profile-pic.jpg 1x,\n/blog/static/dbf37cd74f542721ca6dd973938d0a48/1f6c0/profile-pic.jpg 1.5x"}}},site:{siteMetadata:{author:"Lee Warrick",social:{twitter:"leewarrickjr"}}}}}},653:function(e,t,a){"use strict";a(5),a(4),a(3),a(31),a(159),a(645);var r=a(30);t.__esModule=!0,t.default=void 0;var n,i=r(a(88)),o=r(a(89)),s=r(a(161)),l=r(a(162)),d=r(a(2)),c=r(a(22)),u=function(e){var t=(0,l.default)({},e),a=t.resolutions,r=t.sizes,n=t.critical;return a&&(t.fixed=a,delete t.resolutions),r&&(t.fluid=r,delete t.sizes),n&&(t.loading="eager"),t.fluid&&(t.fluid=E([].concat(t.fluid))),t.fixed&&(t.fixed=E([].concat(t.fixed))),t},f=function(e){var t=e.fluid,a=e.fixed;return(t&&t[0]||a&&a[0]).src},A=Object.create({}),p=function(e){var t=u(e),a=f(t);return A[a]||!1},g="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype,m="undefined"!=typeof window,h=m&&window.IntersectionObserver,b=new WeakMap;function y(e){return e.map(function(e){var t=e.src,a=e.srcSet,r=e.srcSetWebp,n=e.media,i=e.sizes;return d.default.createElement(d.default.Fragment,{key:t},r&&d.default.createElement("source",{type:"image/webp",media:n,srcSet:r,sizes:i}),d.default.createElement("source",{media:n,srcSet:a,sizes:i}))})}function E(e){var t=[],a=[];return e.forEach(function(e){return(e.media?t:a).push(e)}),t.concat(a)}function w(e){return e.map(function(e){var t=e.src,a=e.media,r=e.tracedSVG;return d.default.createElement("source",{key:t,media:a,srcSet:r})})}function v(e){return e.map(function(e){var t=e.src,a=e.media,r=e.base64;return d.default.createElement("source",{key:t,media:a,srcSet:r})})}function S(e,t){var a=e.srcSet,r=e.srcSetWebp,n=e.media,i=e.sizes;return"<source "+(t?"type='image/webp' ":"")+(n?'media="'+n+'" ':"")+'srcset="'+(t?r:a)+'" '+(i?'sizes="'+i+'" ':"")+"/>"}var j=function(e,t){var a=(void 0===n&&"undefined"!=typeof window&&window.IntersectionObserver&&(n=new window.IntersectionObserver(function(e){e.forEach(function(e){if(b.has(e.target)){var t=b.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(n.unobserve(e.target),b.delete(e.target),t())}})},{rootMargin:"200px"})),n);return a&&(a.observe(e),b.set(e,t)),function(){a.unobserve(e),b.delete(e)}},O=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',a=e.sizes?'sizes="'+e.sizes+'" ':"",r=e.srcSet?'srcset="'+e.srcSet+'" ':"",n=e.title?'title="'+e.title+'" ':"",i=e.alt?'alt="'+e.alt+'" ':'alt="" ',o=e.width?'width="'+e.width+'" ':"",s=e.height?'height="'+e.height+'" ':"",l=e.crossOrigin?'crossorigin="'+e.crossOrigin+'" ':"",d=e.loading?'loading="'+e.loading+'" ':"",c=e.draggable?'draggable="'+e.draggable+'" ':"";return"<picture>"+e.imageVariants.map(function(e){return(e.srcSetWebp?S(e,!0):"")+S(e)}).join("")+"<img "+d+o+s+a+r+t+i+n+l+c+'style="position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},B=function(e){var t=e.src,a=e.imageVariants,r=e.generateSources,n=e.spreadProps,i=d.default.createElement(x,(0,l.default)({src:t},n));return a.length>1?d.default.createElement("picture",null,r(a),i):i},x=d.default.forwardRef(function(e,t){var a=e.sizes,r=e.srcSet,n=e.src,i=e.style,o=e.onLoad,c=e.onError,u=e.loading,f=e.draggable,A=(0,s.default)(e,["sizes","srcSet","src","style","onLoad","onError","loading","draggable"]);return d.default.createElement("img",(0,l.default)({sizes:a,srcSet:r,src:n},A,{onLoad:o,onError:c,ref:t,loading:u,draggable:f,style:(0,l.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},i)}))});x.propTypes={style:c.default.object,onError:c.default.func,onLoad:c.default.func};var R=function(e){function t(t){var a;(a=e.call(this,t)||this).seenBefore=m&&p(t),a.addNoScript=!(t.critical&&!t.fadeIn),a.useIOSupport=!g&&h&&!t.critical&&!a.seenBefore;var r=t.critical||m&&(g||!a.useIOSupport);return a.state={isVisible:r,imgLoaded:!1,imgCached:!1,fadeIn:!a.seenBefore&&t.fadeIn},a.imageRef=d.default.createRef(),a.handleImageLoaded=a.handleImageLoaded.bind((0,o.default)((0,o.default)(a))),a.handleRef=a.handleRef.bind((0,o.default)((0,o.default)(a))),a}(0,i.default)(t,e);var a=t.prototype;return a.componentDidMount=function(){if(this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:p(this.props)}),this.props.critical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},a.componentWillUnmount=function(){this.cleanUpListeners&&this.cleanUpListeners()},a.handleRef=function(e){var t=this;this.useIOSupport&&e&&(this.cleanUpListeners=j(e,function(){var e=p(t.props);t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:e}),t.setState({isVisible:!0},function(){return t.setState({imgLoaded:e,imgCached:!!t.imageRef.current.currentSrc})})}))},a.handleImageLoaded=function(){var e,t,a;e=this.props,t=u(e),a=f(t),A[a]=!0,this.setState({imgLoaded:!0}),this.props.onLoad&&this.props.onLoad()},a.render=function(){var e=u(this.props),t=e.title,a=e.alt,r=e.className,n=e.style,i=void 0===n?{}:n,o=e.imgStyle,s=void 0===o?{}:o,c=e.placeholderStyle,f=void 0===c?{}:c,A=e.placeholderClassName,p=e.fluid,g=e.fixed,m=e.backgroundColor,h=e.durationFadeIn,b=e.Tag,E=e.itemProp,S=e.loading,j=e.draggable,R=!1===this.state.fadeIn||this.state.imgLoaded,L=!0===this.state.fadeIn&&!this.state.imgCached,P=(0,l.default)({opacity:R?1:0,transition:L?"opacity "+h+"ms":"none"},s),I="boolean"==typeof m?"lightgray":m,Q={transitionDelay:h+"ms"},T=(0,l.default)({opacity:this.state.imgLoaded?0:1},L&&Q,s,f),k={title:t,alt:this.state.isVisible?"":a,style:T,className:A};if(p){var C=p,N=C[0];return d.default.createElement(b,{className:(r||"")+" gatsby-image-wrapper",style:(0,l.default)({position:"relative",overflow:"hidden"},i),ref:this.handleRef,key:"fluid-"+JSON.stringify(N.srcSet)},d.default.createElement(b,{style:{width:"100%",paddingBottom:100/N.aspectRatio+"%"}}),I&&d.default.createElement(b,{title:t,style:(0,l.default)({backgroundColor:I,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,right:0,left:0},L&&Q)}),N.base64&&d.default.createElement(B,{src:N.base64,spreadProps:k,imageVariants:C,generateSources:v}),N.tracedSVG&&d.default.createElement(B,{src:N.tracedSVG,spreadProps:k,imageVariants:C,generateSources:w}),this.state.isVisible&&d.default.createElement("picture",null,y(C),d.default.createElement(x,{alt:a,title:t,sizes:N.sizes,src:N.src,crossOrigin:this.props.crossOrigin,srcSet:N.srcSet,style:P,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:E,loading:S,draggable:j})),this.addNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:O((0,l.default)({alt:a,title:t,loading:S},N,{imageVariants:C}))}}))}if(g){var V=g,M=V[0],z=(0,l.default)({position:"relative",overflow:"hidden",display:"inline-block",width:M.width,height:M.height},i);return"inherit"===i.display&&delete z.display,d.default.createElement(b,{className:(r||"")+" gatsby-image-wrapper",style:z,ref:this.handleRef,key:"fixed-"+JSON.stringify(M.srcSet)},I&&d.default.createElement(b,{title:t,style:(0,l.default)({backgroundColor:I,width:M.width,opacity:this.state.imgLoaded?0:1,height:M.height},L&&Q)}),M.base64&&d.default.createElement(B,{src:M.base64,spreadProps:k,imageVariants:V,generateSources:v}),M.tracedSVG&&d.default.createElement(B,{src:M.tracedSVG,spreadProps:k,imageVariants:V,generateSources:w}),this.state.isVisible&&d.default.createElement("picture",null,y(V),d.default.createElement(x,{alt:a,title:t,width:M.width,height:M.height,sizes:M.sizes,src:M.src,crossOrigin:this.props.crossOrigin,srcSet:M.srcSet,style:P,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:E,loading:S,draggable:j})),this.addNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:O((0,l.default)({alt:a,title:t,loading:S},M,{imageVariants:V}))}}))}return null},t}(d.default.Component);R.defaultProps={fadeIn:!0,durationFadeIn:500,alt:"",Tag:"div",loading:"lazy"};var L=c.default.shape({width:c.default.number.isRequired,height:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string}),P=c.default.shape({aspectRatio:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,sizes:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string});R.propTypes={resolutions:L,sizes:P,fixed:c.default.oneOfType([L,c.default.arrayOf(L)]),fluid:c.default.oneOfType([P,c.default.arrayOf(P)]),fadeIn:c.default.bool,durationFadeIn:c.default.number,title:c.default.string,alt:c.default.string,className:c.default.oneOfType([c.default.string,c.default.object]),critical:c.default.bool,crossOrigin:c.default.oneOfType([c.default.string,c.default.bool]),style:c.default.object,imgStyle:c.default.object,placeholderStyle:c.default.object,placeholderClassName:c.default.string,backgroundColor:c.default.oneOfType([c.default.string,c.default.bool]),onLoad:c.default.func,onError:c.default.func,onStartLoad:c.default.func,Tag:c.default.string,itemProp:c.default.string,loading:c.default.oneOf(["auto","lazy","eager"]),draggable:c.default.bool};var I=R;t.default=I}}]);
//# sourceMappingURL=2-dd8b94f3322e20a78725.js.map