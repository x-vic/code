if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let a=Promise.resolve();return s[e]||(a=new Promise(async a=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=a}else importScripts(e),a()})),a.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},a=(a,s)=>{Promise.all(a.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(a)};self.define=(a,f,r)=>{s[a]||(s[a]=Promise.resolve().then(()=>{let s={};const i={uri:location.origin+a.slice(1)};return Promise.all(f.map(a=>{switch(a){case"exports":return s;case"module":return i;default:return e(a)}})).then(e=>{const a=r(...e);return s.default||(s.default=a),s})}))}}define("./service-worker.js",["./workbox-1bbb3e0e"],(function(e){"use strict";self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:"404.html",revision:"c6390f0976631454272f7836973af362"},{url:"article/index.html",revision:"28f506ac0a8ce795cf7c22c5857d3294"},{url:"assets/css/0.styles.c05efa9a.css",revision:"c3bc9d252e50403678d67fdb65dc8503"},{url:"assets/fonts/KaTeX_AMS-Regular.7f06b4e3.woff",revision:"7f06b4e30317f784d61d26686aed0ab2"},{url:"assets/fonts/KaTeX_AMS-Regular.aaf4eee9.ttf",revision:"aaf4eee9fba9907d61c3935e0b6a54ae"},{url:"assets/fonts/KaTeX_AMS-Regular.e78e28b4.woff2",revision:"e78e28b4834954df047e4925e9dbf354"},{url:"assets/fonts/KaTeX_Caligraphic-Bold.021dd4dc.ttf",revision:"021dd4dc61ee5f5cdf315f43b48c094b"},{url:"assets/fonts/KaTeX_Caligraphic-Bold.1e802ca9.woff",revision:"1e802ca9dedc4ed4e3c6f645e4316128"},{url:"assets/fonts/KaTeX_Caligraphic-Bold.4ec58bef.woff2",revision:"4ec58befa687e9752c3c91cd9bcf1bcb"},{url:"assets/fonts/KaTeX_Caligraphic-Regular.7edb53b6.woff2",revision:"7edb53b6693d75b8a2232481eea1a52c"},{url:"assets/fonts/KaTeX_Caligraphic-Regular.d3b46c3a.woff",revision:"d3b46c3a530116933081d9d74e3e9fe8"},{url:"assets/fonts/KaTeX_Caligraphic-Regular.d49f2d55.ttf",revision:"d49f2d55ce4f40f982d8ba63d746fbf9"},{url:"assets/fonts/KaTeX_Fraktur-Bold.a31e7cba.ttf",revision:"a31e7cba7b7221ebf1a2ae545fb306b2"},{url:"assets/fonts/KaTeX_Fraktur-Bold.c4c8cab7.woff",revision:"c4c8cab7d5be97b2bb283e531c077355"},{url:"assets/fonts/KaTeX_Fraktur-Bold.d5b59ec9.woff2",revision:"d5b59ec9764e10f4a82369ae29f3ac58"},{url:"assets/fonts/KaTeX_Fraktur-Regular.32a5339e.woff2",revision:"32a5339eb809f381a7357ba56f82aab3"},{url:"assets/fonts/KaTeX_Fraktur-Regular.a48dad4f.ttf",revision:"a48dad4f58c82e38a10da0ceebb86370"},{url:"assets/fonts/KaTeX_Fraktur-Regular.b7d9c46b.woff",revision:"b7d9c46bff5d51da6209e355cc4a235d"},{url:"assets/fonts/KaTeX_Main-Bold.22086eb5.woff",revision:"22086eb5d97009c3e99bcc1d16ce6865"},{url:"assets/fonts/KaTeX_Main-Bold.8e1e01c4.woff2",revision:"8e1e01c4b1207c0a383d9a2b4f86e637"},{url:"assets/fonts/KaTeX_Main-Bold.9ceff51b.ttf",revision:"9ceff51b3cb7ce6eb4e8efa8163a1472"},{url:"assets/fonts/KaTeX_Main-BoldItalic.284a17fe.woff2",revision:"284a17fe5baf72ff8217d4c7e70c0f82"},{url:"assets/fonts/KaTeX_Main-BoldItalic.4c57dbc4.woff",revision:"4c57dbc44bfff1fdf08a59cf556fdab3"},{url:"assets/fonts/KaTeX_Main-BoldItalic.e8b44b99.ttf",revision:"e8b44b990516dab7937bf240fde8b46a"},{url:"assets/fonts/KaTeX_Main-Italic.29c86397.ttf",revision:"29c86397e75cdcb3135af8295f1c2e28"},{url:"assets/fonts/KaTeX_Main-Italic.99be0e10.woff",revision:"99be0e10c38cd42466e6fe1665ef9536"},{url:"assets/fonts/KaTeX_Main-Italic.e533d5a2.woff2",revision:"e533d5a2506cf053cd671b335ec04dde"},{url:"assets/fonts/KaTeX_Main-Regular.5c734d78.woff2",revision:"5c734d78610fa35282f3379f866707f2"},{url:"assets/fonts/KaTeX_Main-Regular.5c94aef4.ttf",revision:"5c94aef490324b0925dbe5f643e8fd04"},{url:"assets/fonts/KaTeX_Main-Regular.b741441f.woff",revision:"b741441f6d71014d0453ca3ebc884dd4"},{url:"assets/fonts/KaTeX_Math-BoldItalic.9a2834a9.ttf",revision:"9a2834a9ff8ab411153571e0e55ac693"},{url:"assets/fonts/KaTeX_Math-BoldItalic.b13731ef.woff",revision:"b13731ef4e2bfc3d8d859271e39550fc"},{url:"assets/fonts/KaTeX_Math-BoldItalic.d747bd1e.woff2",revision:"d747bd1e7a6a43864285edd73dcde253"},{url:"assets/fonts/KaTeX_Math-Italic.291e76b8.ttf",revision:"291e76b8871b84560701bd29f9d1dcc7"},{url:"assets/fonts/KaTeX_Math-Italic.4ad08b82.woff2",revision:"4ad08b826b8065e1eab85324d726538c"},{url:"assets/fonts/KaTeX_Math-Italic.f0303906.woff",revision:"f0303906c2a67ac63bf1e8ccd638a89e"},{url:"assets/fonts/KaTeX_SansSerif-Bold.3fb41955.woff",revision:"3fb419559955e3ce75619f1a5e8c6c84"},{url:"assets/fonts/KaTeX_SansSerif-Bold.6e0830be.woff2",revision:"6e0830bee40435e72165345e0682fbfc"},{url:"assets/fonts/KaTeX_SansSerif-Bold.7dc027cb.ttf",revision:"7dc027cba9f7b11ec92af4a311372a85"},{url:"assets/fonts/KaTeX_SansSerif-Italic.4059868e.ttf",revision:"4059868e460d2d2e6be18e180d20c43d"},{url:"assets/fonts/KaTeX_SansSerif-Italic.727a9b0d.woff",revision:"727a9b0d97d72d2fc0228fe4e07fb4d8"},{url:"assets/fonts/KaTeX_SansSerif-Italic.fba01c9c.woff2",revision:"fba01c9c6fb2866a0f95bcacb2c187a5"},{url:"assets/fonts/KaTeX_SansSerif-Regular.2555754a.woff",revision:"2555754a67062cac3a0913b715ab982f"},{url:"assets/fonts/KaTeX_SansSerif-Regular.5c58d168.ttf",revision:"5c58d168c0b66d2c32234a6718e74dfb"},{url:"assets/fonts/KaTeX_SansSerif-Regular.d929cd67.woff2",revision:"d929cd671b19f0cfea55b6200fb47461"},{url:"assets/fonts/KaTeX_Script-Regular.755e2491.woff2",revision:"755e2491f13b5269f0afd5a56f7aa692"},{url:"assets/fonts/KaTeX_Script-Regular.d12ea9ef.ttf",revision:"d12ea9efb375f9dc331f562e69892638"},{url:"assets/fonts/KaTeX_Script-Regular.d524c9a5.woff",revision:"d524c9a5b62a17f98f4a97af37fea735"},{url:"assets/fonts/KaTeX_Size1-Regular.7342d45b.ttf",revision:"7342d45b052c3a2abc21049959fbab7f"},{url:"assets/fonts/KaTeX_Size2-Regular.eb130dcc.ttf",revision:"eb130dcc661de766c999c60ba1525a88"},{url:"assets/fonts/KaTeX_Size4-Regular.ad767252.ttf",revision:"ad7672524b64b730dfd176140a8945cb"},{url:"assets/fonts/KaTeX_Typewriter-Regular.25702356.ttf",revision:"257023560753aeb0b89b7e434d3da17f"},{url:"assets/fonts/KaTeX_Typewriter-Regular.3fe216d2.woff",revision:"3fe216d2a5f736c560cde71984554b64"},{url:"assets/fonts/KaTeX_Typewriter-Regular.6cc31ea5.woff2",revision:"6cc31ea5c223c88705a13727a71417fa"},{url:"assets/img/default-skin.b257fa9c.svg",revision:"b257fa9c5ac8c515ac4d77a667ce2943"},{url:"assets/img/homeImage.5ae9de9e.jpg",revision:"5ae9de9e15120d94e9892d0c15da9896"},{url:"assets/img/search.83621669.svg",revision:"83621669651b9a3d4bf64d1a670ad856"},{url:"assets/js/app.c3db9d98.js",revision:"fee267845af0ee866409408f8c77108d"},{url:"assets/js/layout-Blog.ad11205a.js",revision:"65cce4cd71740fc7c7ba5c52ad4ddfee"},{url:"assets/js/layout-NotFound.b8bd58f5.js",revision:"b27ebc5b6fd691874d909186159b60bf"},{url:"assets/js/page-Blob--8636b6e0.d1e133c7.js",revision:"36390488335a834a9e305c8ca8f1de47"},{url:"assets/js/page-ConcurrentModefiber--428f0236.42e64cd7.js",revision:"7df9489ca414eb8d72be590bd3f869fc"},{url:"assets/js/page-createAppmount--59c6962e.f0b585c6.js",revision:"ab850997617dd5833efda1f3802df7a2"},{url:"assets/js/page-createElementrender--4e0fce44.0bf00104.js",revision:"830a2204326621f71c104c1b584f58ac"},{url:"assets/js/page-effect--c37ff3b6.b77da04d.js",revision:"10f123de7ded59d3156d255489be4dd7"},{url:"assets/js/page-handlers代理方法--71d35776.1bf21ca2.js",revision:"75326105b3dbe6bf9d38fd38f745c456"},{url:"assets/js/page-koa--0da4005e.0e160c87.js",revision:"a98d626368791c79c983406adec0c42c"},{url:"assets/js/page-reactive--9fc44336.1ef7571c.js",revision:"ffb3d9651ee0db6f73247edcf43998d9"},{url:"assets/js/page-reactiveeffect--5bf69d3a.a78ba75d.js",revision:"327efa8461e12970f826f0736b235619"},{url:"assets/js/page-reconciliation--52aa2555.e1d5146d.js",revision:"0235a2cf361f1e718b3942eefcd90c2f"},{url:"assets/js/page-redux--6dd09404.d3d6ced9.js",revision:"b7c731b923011f2b1e39d968552f3b96"},{url:"assets/js/page-rendercommit--7f6091c5.1d9e09f2.js",revision:"707dc3d9554c5174185257a5fc6b8a15"},{url:"assets/js/page-useState--60c92407.f3bcf317.js",revision:"ba2824d2a6155a535df5ca2919313ee6"},{url:"assets/js/page-函数组件--2406c685.27fbaf81.js",revision:"f382ace012c66c7dfdf3480a954d333a"},{url:"assets/js/page-文件上传--f74d7bf6.0130f924.js",revision:"7f49c70ef3296611f02b02df1a10eb3a"},{url:"assets/js/page-组件渲染的细节--21758d7d.a632e802.js",revision:"4c950096f31837ae0281ca1f4e51dc97"},{url:"assets/js/page-首页--8fc477d4.71a88c3d.js",revision:"4e873cee30ffdfd67c072526d601a788"},{url:"assets/js/vendors~layout-Blog~layout-Layout.46f84fbc.js",revision:"9adcf8c4a9b19fa3db7bd584c01e6d7f"},{url:"assets/js/vendors~layout-Blog~layout-Layout~layout-NotFound.15460e54.js",revision:"b0d5ffdbbef5b2edb6fdfc12f7b9e3c0"},{url:"assets/js/vendors~layout-Layout.aa1b84d5.js",revision:"40272b3a9bce54ffa6134ae8a0d513fa"},{url:"category/index.html",revision:"570f36355c56a661ee31a3baa36ca77b"},{url:"fonts/dm-italic.ttf",revision:"42d2633a73e48a4a0f0c07035b20e9cc"},{url:"fonts/dm-regular.ttf",revision:"6d0dca36f4b308f1b05ac34f8b18c8d7"},{url:"fonts/汉仪旗黑50简.ttf",revision:"79781ea0063360f5ffed23d98954359f"},{url:"images/fiber.png",revision:"63a7f41b95f8f623b411cec105258d7b"},{url:"index.html",revision:"3a97fc54d0844ab164491ebc415a8303"},{url:"logo/logo200.png",revision:"dfc1cca5e2fec86474f3fc9a1b6a6c8b"},{url:"logo/logo500.png",revision:"8d1c3a2d6acd1ad3bc704027fd3606e6"},{url:"tag/index.html",revision:"1c4a59387ec78e6eb3307a492f7311e9"},{url:"timeline/index.html",revision:"bd4e600f3c388009c7a77f524bbf9734"},{url:"views/JS/index.html",revision:"411fea0c97f6c5f16ca64a545b61d006"},{url:"views/JS/upload/index.html",revision:"8c6f7833b8bd1de2ddbf743c51d74ebf"},{url:"views/owner-koa/index.html",revision:"bd4a52d4e9d01839deb4ab3ba1b6989d"},{url:"views/owner-react/fiber/index.html",revision:"4bcded00032e624d538cbc72220eabbf"},{url:"views/owner-react/functionComponent/index.html",revision:"b700587f2a9671f5555e013565de6f4f"},{url:"views/owner-react/index.html",revision:"49d732cbc9abcddcc3f7e5c412f7029b"},{url:"views/owner-react/reconciliation/index.html",revision:"16f9a479a32fd6b8dadc9a15de1ae648"},{url:"views/owner-react/render&commit/index.html",revision:"36318f95fe959d0c488701521b57ee63"},{url:"views/owner-react/useState/index.html",revision:"cdd6fd7e240799ad439995b92f0237e2"},{url:"views/owner-redux/index.html",revision:"3d77407e83ed2765964bffb77c7e3905"},{url:"views/owner-vue-next/index.html",revision:"7c241a15c9a39220901dfb8725e96fbf"},{url:"views/vue-next/componentDetail/index.html",revision:"5da235aa93cb340ebe95f19358cffd77"},{url:"views/vue-next/createApp&mount/index.html",revision:"255a6facb8ef4629fa95232f671d8d8a"},{url:"views/vue-next/effect/index.html",revision:"be74b3f030dd9be8f71bd81f838a2c9a"},{url:"views/vue-next/handler/index.html",revision:"0380346c33064c3f085e07883d555ad2"},{url:"views/vue-next/reactive/index.html",revision:"26d16423d6006b34dc2360e7ea7a706d"},{url:"xuan200.png",revision:"337c9efc9e84b65cfe4b29fe0d909ab4"},{url:"xuan500.png",revision:"7afeb05055b35382431eeee9f3953d56"}],{})}));
//# sourceMappingURL=service-worker.js.map
addEventListener("message", (event) => {
  const replyPort = event.ports[0];
  const message = event.data;
  if (replyPort && message && message.type === "skip-waiting")
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        (error) => replyPort.postMessage({ error })
      )
    );
});
