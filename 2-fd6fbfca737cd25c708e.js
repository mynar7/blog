(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{646:function(e,t,a){"use strict";a.d(t,"b",function(){return u});var r=a(1),n=a.n(r),i=a(24),o=a.n(i),s=a(93),l=a.n(s);a.d(t,"a",function(){return l.a});a(647);var c=n.a.createContext({});function d(e){var t=e.staticQueryData,a=e.data,r=e.query,i=e.render,o=a?a.data:t[r]&&t[r].data;return n.a.createElement(n.a.Fragment,null,o&&i(o),!o&&n.a.createElement("div",null,"Loading (StaticQuery)"))}var u=function(e){var t=e.data,a=e.query,r=e.render,i=e.children;return n.a.createElement(c.Consumer,null,function(e){return n.a.createElement(d,{data:t,query:a,render:r||i,staticQueryData:e})})};u.propTypes={data:o.a.object,query:o.a.string.isRequired,render:o.a.func,children:o.a.func}},647:function(e,t,a){var r;e.exports=(r=a(650))&&r.default||r},648:function(e,t,a){"use strict";a(40),a(17),a(5),a(4),a(3),a(10);var r=a(1),n=a.n(r),i=a(646),o=(a(641),a(59));function s(e){for(var t=1;t<arguments.length;t++)if(t%2){var a=null!=arguments[t]?arguments[t]:{},r=Object.keys(a);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(a).filter(function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable}))),r.forEach(function(t){l(e,t,a[t])})}else Object.defineProperties(e,Object.getOwnPropertyDescriptors(arguments[t]));return e}function l(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var c=function(e){var t,a;function r(){return e.apply(this,arguments)||this}return a=e,(t=r).prototype=Object.create(a.prototype),t.prototype.constructor=t,t.__proto__=a,r.prototype.render=function(){var e,t=this.props,a=t.location,r=t.title,l=t.children;return e="/"===a.pathname?n.a.createElement("h1",{style:s({},Object(o.b)(1.5),{marginBottom:Object(o.a)(1.5),marginTop:0})},n.a.createElement(i.a,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},r)):n.a.createElement("h3",{style:{marginTop:0,marginBottom:Object(o.a)(-1)}},n.a.createElement(i.a,{to:"/"},r)),n.a.createElement("div",{className:"wrapper"},e,l,n.a.createElement("footer",{style:{display:"flex",justifyContent:"space-between",flexWrap:"wrap"}},n.a.createElement("span",{style:{marginBottom:"10px"}},"© ",(new Date).getFullYear(),", Built with"," ",n.a.createElement("a",{href:"https://www.gatsbyjs.org"},"Gatsby"),", ",n.a.createElement("a",{href:"https://www.youtube.com/watch?v=HEXWRTEbj1I"},"Love"),", and ",n.a.createElement("a",{href:"https://cameronsworld.net"},"Inter-webs"),"."),"/"!==a.pathname&&n.a.createElement("span",null,n.a.createElement(i.a,{to:"/"},"Home"))))},r}(n.a.Component);t.a=c},649:function(e,t,a){"use strict";var r=a(651),n=a(1),i=a.n(n),o=a(24),s=a.n(o),l=a(655),c=a.n(l),d=a(646);function u(e){var t=e.description,a=e.lang,n=void 0===a?"en":a,o=e.meta,s=void 0===o?[]:o,l=e.keywords,u=void 0===l?[]:l,A=e.title;return i.a.createElement(d.b,{query:f,render:function(e){var a=t||e.site.siteMetadata.description;return i.a.createElement(c.a,{htmlAttributes:{lang:n},title:A,titleTemplate:A===e.site.siteMetadata.title?A:"%s | "+e.site.siteMetadata.title,meta:[{name:"description",content:a},{property:"og:title",content:A},{property:"og:description",content:a},{property:"og:type",content:"website"},{property:"og:image",content:e.site.siteMetadata.logo},{property:"twitter:image",content:e.site.siteMetadata.logo},{property:"twitter:alt:image",content:"Green, purple, and black Buddhist enso swirl logo"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:e.site.siteMetadata.author},{name:"twitter:title",content:A},{name:"twitter:description",content:a}].concat(u.length>0?{name:"keywords",content:u.join(", ")}:{name:"keywords",content:"blog, web development, developer, front-end developer"}).concat(s)})},data:r})}u.defaultProps={lang:"en",meta:[],keywords:[]},u.propTypes={description:s.a.string,lang:s.a.string,meta:s.a.array,keywords:s.a.arrayOf(s.a.string),title:s.a.string.isRequired},t.a=u;var f="4122501175"},650:function(e,t,a){"use strict";a.r(t);a(40),a(17),a(5),a(4),a(3),a(10);var r=a(1),n=a.n(r),i=a(24),o=a.n(i),s=a(120);function l(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var c=function(e){var t=e.location,a=e.pageResources;return a?n.a.createElement(s.a,function(e){for(var t=1;t<arguments.length;t++)if(t%2){var a=null!=arguments[t]?arguments[t]:{},r=Object.keys(a);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(a).filter(function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable}))),r.forEach(function(t){l(e,t,a[t])})}else Object.defineProperties(e,Object.getOwnPropertyDescriptors(arguments[t]));return e}({location:t,pageResources:a},a.json)):null};c.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},t.default=c},651:function(e){e.exports={data:{site:{siteMetadata:{title:"Strings and Things",description:"A blog that's mostly about code. I talk about front-end web development, give career advice, and sometimes ruminate on life lessons learned with connections to code",author:"Lee Warrick",logo:"https://leewarrick.com/blog/logo2.png"}}}}},653:function(e,t,a){"use strict";a(654);var r=a(660),n=a(1),i=a.n(n),o=a(646),s=a(661),l=a.n(s),c=a(59);var d="3223108409";t.a=function(){return i.a.createElement(o.b,{query:d,render:function(e){var t=e.site.siteMetadata,a=t.author;return t.social,i.a.createElement("div",{style:{marginBottom:Object(c.a)(2.5)}},i.a.createElement(l.a,{fixed:e.avatar.childImageSharp.fixed,alt:a,style:{marginRight:Object(c.a)(.5),marginBottom:0,minWidth:80,borderRadius:"100%",float:"left"}}),i.a.createElement("p",null,"Written by ",i.a.createElement("a",{href:"https://leewarrick.com"},i.a.createElement("strong",null,a)),", Front-end Developer, Guitarist, Gamer, and Co-host of the ",i.a.createElement("a",{href:"https://techjr.dev"},"Tech Jr Podcast"),". ","Feel free to ",i.a.createElement("a",{href:"https://tinyletter.com/leewarrick"},i.a.createElement("strong",null,"Subscribe")),"!"))},data:r})}},654:function(e,t,a){"use strict";a(167)("fixed",function(e){return function(){return e(this,"tt","","")}})},660:function(e){e.exports={data:{avatar:{childImageSharp:{fixed:{base64:"data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAUABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAME/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIDAP/aAAwDAQACEAMQAAABkvFKY1hWuUom8Yf/xAAcEAACAgIDAAAAAAAAAAAAAAABAgMhERMiIzH/2gAIAQEAAQUCcdnAM9PPkSIw2TIdslj0pa//xAAYEQACAwAAAAAAAAAAAAAAAAAAARARMf/aAAgBAwEBPwFYXP8A/8QAFhEAAwAAAAAAAAAAAAAAAAAAABAR/9oACAECAQE/ASP/xAAcEAACAgIDAAAAAAAAAAAAAAABEQACEBIxUmH/2gAIAQEABj8Co+sBo3LD2McaqDZqWQwMf//EABsQAQADAAMBAAAAAAAAAAAAAAEAESExQVFx/9oACAEBAAE/Icy1aamABa32S+5i7gHwBaUtWexCKi8hHTc20v2N0Z//2gAMAwEAAgADAAAAEMTY/wD/xAAXEQEBAQEAAAAAAAAAAAAAAAABEBEh/9oACAEDAQE/EEageT//xAAWEQEBAQAAAAAAAAAAAAAAAAABEBH/2gAIAQIBAT8QR2Mn/8QAGxABAQEBAAMBAAAAAAAAAAAAAREAITFRcaH/2gAIAQEAAT8QUZaDrpy/urgYKuzEbqMuDy95KowD1+ZKGgE+ihqXOiEc1pBih4aajiToHp8wJQjOb//Z",width:80,height:80,src:"/static/dbf37cd74f542721ca6dd973938d0a48/bd6c6/profile-pic.jpg",srcSet:"/static/dbf37cd74f542721ca6dd973938d0a48/bd6c6/profile-pic.jpg 1x,\n/static/dbf37cd74f542721ca6dd973938d0a48/1f6c0/profile-pic.jpg 1.5x"}}},site:{siteMetadata:{author:"Lee Warrick",social:{twitter:"leewarrickjr"}}}}}},661:function(e,t,a){"use strict";a(5),a(4),a(3),a(29),a(168),a(654);var r=a(31);t.__esModule=!0,t.default=void 0;var n,i=r(a(94)),o=r(a(95)),s=r(a(169)),l=r(a(170)),c=r(a(1)),d=r(a(24)),u=function(e){var t=(0,l.default)({},e),a=t.resolutions,r=t.sizes,n=t.critical;return a&&(t.fixed=a,delete t.resolutions),r&&(t.fluid=r,delete t.sizes),n&&(t.loading="eager"),t.fluid&&(t.fluid=E([].concat(t.fluid))),t.fixed&&(t.fixed=E([].concat(t.fixed))),t},f=function(e){var t=e.fluid,a=e.fixed;return(t&&t[0]||a&&a[0]).src},A=Object.create({}),p=function(e){var t=u(e),a=f(t);return A[a]||!1},g="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype,m="undefined"!=typeof window,h=m&&window.IntersectionObserver,b=new WeakMap;function y(e){return e.map(function(e){var t=e.src,a=e.srcSet,r=e.srcSetWebp,n=e.media,i=e.sizes;return c.default.createElement(c.default.Fragment,{key:t},r&&c.default.createElement("source",{type:"image/webp",media:n,srcSet:r,sizes:i}),c.default.createElement("source",{media:n,srcSet:a,sizes:i}))})}function E(e){var t=[],a=[];return e.forEach(function(e){return(e.media?t:a).push(e)}),t.concat(a)}function w(e){return e.map(function(e){var t=e.src,a=e.media,r=e.tracedSVG;return c.default.createElement("source",{key:t,media:a,srcSet:r})})}function v(e){return e.map(function(e){var t=e.src,a=e.media,r=e.base64;return c.default.createElement("source",{key:t,media:a,srcSet:r})})}function S(e,t){var a=e.srcSet,r=e.srcSetWebp,n=e.media,i=e.sizes;return"<source "+(t?"type='image/webp' ":"")+(n?'media="'+n+'" ':"")+'srcset="'+(t?r:a)+'" '+(i?'sizes="'+i+'" ':"")+"/>"}var j=function(e,t){var a=(void 0===n&&"undefined"!=typeof window&&window.IntersectionObserver&&(n=new window.IntersectionObserver(function(e){e.forEach(function(e){if(b.has(e.target)){var t=b.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(n.unobserve(e.target),b.delete(e.target),t())}})},{rootMargin:"200px"})),n);return a&&(a.observe(e),b.set(e,t)),function(){a.unobserve(e),b.delete(e)}},O=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',a=e.sizes?'sizes="'+e.sizes+'" ':"",r=e.srcSet?'srcset="'+e.srcSet+'" ':"",n=e.title?'title="'+e.title+'" ':"",i=e.alt?'alt="'+e.alt+'" ':'alt="" ',o=e.width?'width="'+e.width+'" ':"",s=e.height?'height="'+e.height+'" ':"",l=e.crossOrigin?'crossorigin="'+e.crossOrigin+'" ':"",c=e.loading?'loading="'+e.loading+'" ':"",d=e.draggable?'draggable="'+e.draggable+'" ':"";return"<picture>"+e.imageVariants.map(function(e){return(e.srcSetWebp?S(e,!0):"")+S(e)}).join("")+"<img "+c+o+s+a+r+t+i+n+l+d+'style="position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},I=function(e){var t=e.src,a=e.imageVariants,r=e.generateSources,n=e.spreadProps,i=c.default.createElement(R,(0,l.default)({src:t},n));return a.length>1?c.default.createElement("picture",null,r(a),i):i},R=c.default.forwardRef(function(e,t){var a=e.sizes,r=e.srcSet,n=e.src,i=e.style,o=e.onLoad,d=e.onError,u=e.loading,f=e.draggable,A=(0,s.default)(e,["sizes","srcSet","src","style","onLoad","onError","loading","draggable"]);return c.default.createElement("img",(0,l.default)({sizes:a,srcSet:r,src:n},A,{onLoad:o,onError:d,ref:t,loading:u,draggable:f,style:(0,l.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},i)}))});R.propTypes={style:d.default.object,onError:d.default.func,onLoad:d.default.func};var B=function(e){function t(t){var a;(a=e.call(this,t)||this).seenBefore=m&&p(t),a.addNoScript=!(t.critical&&!t.fadeIn),a.useIOSupport=!g&&h&&!t.critical&&!a.seenBefore;var r=t.critical||m&&(g||!a.useIOSupport);return a.state={isVisible:r,imgLoaded:!1,imgCached:!1,fadeIn:!a.seenBefore&&t.fadeIn},a.imageRef=c.default.createRef(),a.handleImageLoaded=a.handleImageLoaded.bind((0,o.default)((0,o.default)(a))),a.handleRef=a.handleRef.bind((0,o.default)((0,o.default)(a))),a}(0,i.default)(t,e);var a=t.prototype;return a.componentDidMount=function(){if(this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:p(this.props)}),this.props.critical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},a.componentWillUnmount=function(){this.cleanUpListeners&&this.cleanUpListeners()},a.handleRef=function(e){var t=this;this.useIOSupport&&e&&(this.cleanUpListeners=j(e,function(){var e=p(t.props);t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:e}),t.setState({isVisible:!0},function(){return t.setState({imgLoaded:e,imgCached:!!t.imageRef.current.currentSrc})})}))},a.handleImageLoaded=function(){var e,t,a;e=this.props,t=u(e),a=f(t),A[a]=!0,this.setState({imgLoaded:!0}),this.props.onLoad&&this.props.onLoad()},a.render=function(){var e=u(this.props),t=e.title,a=e.alt,r=e.className,n=e.style,i=void 0===n?{}:n,o=e.imgStyle,s=void 0===o?{}:o,d=e.placeholderStyle,f=void 0===d?{}:d,A=e.placeholderClassName,p=e.fluid,g=e.fixed,m=e.backgroundColor,h=e.durationFadeIn,b=e.Tag,E=e.itemProp,S=e.loading,j=e.draggable,B=!1===this.state.fadeIn||this.state.imgLoaded,L=!0===this.state.fadeIn&&!this.state.imgCached,x=(0,l.default)({opacity:B?1:0,transition:L?"opacity "+h+"ms":"none"},s),Q="boolean"==typeof m?"lightgray":m,P={transitionDelay:h+"ms"},C=(0,l.default)({opacity:this.state.imgLoaded?0:1},L&&P,s,f),k={title:t,alt:this.state.isVisible?"":a,style:C,className:A};if(p){var M=p,T=M[0];return c.default.createElement(b,{className:(r||"")+" gatsby-image-wrapper",style:(0,l.default)({position:"relative",overflow:"hidden"},i),ref:this.handleRef,key:"fluid-"+JSON.stringify(T.srcSet)},c.default.createElement(b,{style:{width:"100%",paddingBottom:100/T.aspectRatio+"%"}}),Q&&c.default.createElement(b,{title:t,style:(0,l.default)({backgroundColor:Q,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,right:0,left:0},L&&P)}),T.base64&&c.default.createElement(I,{src:T.base64,spreadProps:k,imageVariants:M,generateSources:v}),T.tracedSVG&&c.default.createElement(I,{src:T.tracedSVG,spreadProps:k,imageVariants:M,generateSources:w}),this.state.isVisible&&c.default.createElement("picture",null,y(M),c.default.createElement(R,{alt:a,title:t,sizes:T.sizes,src:T.src,crossOrigin:this.props.crossOrigin,srcSet:T.srcSet,style:x,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:E,loading:S,draggable:j})),this.addNoScript&&c.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:O((0,l.default)({alt:a,title:t,loading:S},T,{imageVariants:M}))}}))}if(g){var D=g,N=D[0],V=(0,l.default)({position:"relative",overflow:"hidden",display:"inline-block",width:N.width,height:N.height},i);return"inherit"===i.display&&delete V.display,c.default.createElement(b,{className:(r||"")+" gatsby-image-wrapper",style:V,ref:this.handleRef,key:"fixed-"+JSON.stringify(N.srcSet)},Q&&c.default.createElement(b,{title:t,style:(0,l.default)({backgroundColor:Q,width:N.width,opacity:this.state.imgLoaded?0:1,height:N.height},L&&P)}),N.base64&&c.default.createElement(I,{src:N.base64,spreadProps:k,imageVariants:D,generateSources:v}),N.tracedSVG&&c.default.createElement(I,{src:N.tracedSVG,spreadProps:k,imageVariants:D,generateSources:w}),this.state.isVisible&&c.default.createElement("picture",null,y(D),c.default.createElement(R,{alt:a,title:t,width:N.width,height:N.height,sizes:N.sizes,src:N.src,crossOrigin:this.props.crossOrigin,srcSet:N.srcSet,style:x,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:E,loading:S,draggable:j})),this.addNoScript&&c.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:O((0,l.default)({alt:a,title:t,loading:S},N,{imageVariants:D}))}}))}return null},t}(c.default.Component);B.defaultProps={fadeIn:!0,durationFadeIn:500,alt:"",Tag:"div",loading:"lazy"};var L=d.default.shape({width:d.default.number.isRequired,height:d.default.number.isRequired,src:d.default.string.isRequired,srcSet:d.default.string.isRequired,base64:d.default.string,tracedSVG:d.default.string,srcWebp:d.default.string,srcSetWebp:d.default.string,media:d.default.string}),x=d.default.shape({aspectRatio:d.default.number.isRequired,src:d.default.string.isRequired,srcSet:d.default.string.isRequired,sizes:d.default.string.isRequired,base64:d.default.string,tracedSVG:d.default.string,srcWebp:d.default.string,srcSetWebp:d.default.string,media:d.default.string});B.propTypes={resolutions:L,sizes:x,fixed:d.default.oneOfType([L,d.default.arrayOf(L)]),fluid:d.default.oneOfType([x,d.default.arrayOf(x)]),fadeIn:d.default.bool,durationFadeIn:d.default.number,title:d.default.string,alt:d.default.string,className:d.default.oneOfType([d.default.string,d.default.object]),critical:d.default.bool,crossOrigin:d.default.oneOfType([d.default.string,d.default.bool]),style:d.default.object,imgStyle:d.default.object,placeholderStyle:d.default.object,placeholderClassName:d.default.string,backgroundColor:d.default.oneOfType([d.default.string,d.default.bool]),onLoad:d.default.func,onError:d.default.func,onStartLoad:d.default.func,Tag:d.default.string,itemProp:d.default.string,loading:d.default.oneOf(["auto","lazy","eager"]),draggable:d.default.bool};var Q=B;t.default=Q}}]);
//# sourceMappingURL=2-fd6fbfca737cd25c708e.js.map