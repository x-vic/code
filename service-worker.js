if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let a=Promise.resolve();return s[e]||(a=new Promise(async a=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=a}else importScripts(e),a()})),a.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},a=(a,s)=>{Promise.all(a.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(a)};self.define=(a,f,i)=>{s[a]||(s[a]=Promise.resolve().then(()=>{let s={};const c={uri:location.origin+a.slice(1)};return Promise.all(f.map(a=>{switch(a){case"exports":return s;case"module":return c;default:return e(a)}})).then(e=>{const a=i(...e);return s.default||(s.default=a),s})}))}}define("./service-worker.js",["./workbox-1bbb3e0e"],(function(e){"use strict";self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:"404.html",revision:"45c6a4295df8fc942b7bd057be4adfde"},{url:"article/index.html",revision:"bf6cd34703d1153e0e7fdbc41d75a2eb"},{url:"assets/css/0.styles.c05efa9a.css",revision:"c3bc9d252e50403678d67fdb65dc8503"},{url:"assets/fonts/KaTeX_AMS-Regular.7f06b4e3.woff",revision:"7f06b4e30317f784d61d26686aed0ab2"},{url:"assets/fonts/KaTeX_AMS-Regular.aaf4eee9.ttf",revision:"aaf4eee9fba9907d61c3935e0b6a54ae"},{url:"assets/fonts/KaTeX_AMS-Regular.e78e28b4.woff2",revision:"e78e28b4834954df047e4925e9dbf354"},{url:"assets/fonts/KaTeX_Caligraphic-Bold.021dd4dc.ttf",revision:"021dd4dc61ee5f5cdf315f43b48c094b"},{url:"assets/fonts/KaTeX_Caligraphic-Bold.1e802ca9.woff",revision:"1e802ca9dedc4ed4e3c6f645e4316128"},{url:"assets/fonts/KaTeX_Caligraphic-Bold.4ec58bef.woff2",revision:"4ec58befa687e9752c3c91cd9bcf1bcb"},{url:"assets/fonts/KaTeX_Caligraphic-Regular.7edb53b6.woff2",revision:"7edb53b6693d75b8a2232481eea1a52c"},{url:"assets/fonts/KaTeX_Caligraphic-Regular.d3b46c3a.woff",revision:"d3b46c3a530116933081d9d74e3e9fe8"},{url:"assets/fonts/KaTeX_Caligraphic-Regular.d49f2d55.ttf",revision:"d49f2d55ce4f40f982d8ba63d746fbf9"},{url:"assets/fonts/KaTeX_Fraktur-Bold.a31e7cba.ttf",revision:"a31e7cba7b7221ebf1a2ae545fb306b2"},{url:"assets/fonts/KaTeX_Fraktur-Bold.c4c8cab7.woff",revision:"c4c8cab7d5be97b2bb283e531c077355"},{url:"assets/fonts/KaTeX_Fraktur-Bold.d5b59ec9.woff2",revision:"d5b59ec9764e10f4a82369ae29f3ac58"},{url:"assets/fonts/KaTeX_Fraktur-Regular.32a5339e.woff2",revision:"32a5339eb809f381a7357ba56f82aab3"},{url:"assets/fonts/KaTeX_Fraktur-Regular.a48dad4f.ttf",revision:"a48dad4f58c82e38a10da0ceebb86370"},{url:"assets/fonts/KaTeX_Fraktur-Regular.b7d9c46b.woff",revision:"b7d9c46bff5d51da6209e355cc4a235d"},{url:"assets/fonts/KaTeX_Main-Bold.22086eb5.woff",revision:"22086eb5d97009c3e99bcc1d16ce6865"},{url:"assets/fonts/KaTeX_Main-Bold.8e1e01c4.woff2",revision:"8e1e01c4b1207c0a383d9a2b4f86e637"},{url:"assets/fonts/KaTeX_Main-Bold.9ceff51b.ttf",revision:"9ceff51b3cb7ce6eb4e8efa8163a1472"},{url:"assets/fonts/KaTeX_Main-BoldItalic.284a17fe.woff2",revision:"284a17fe5baf72ff8217d4c7e70c0f82"},{url:"assets/fonts/KaTeX_Main-BoldItalic.4c57dbc4.woff",revision:"4c57dbc44bfff1fdf08a59cf556fdab3"},{url:"assets/fonts/KaTeX_Main-BoldItalic.e8b44b99.ttf",revision:"e8b44b990516dab7937bf240fde8b46a"},{url:"assets/fonts/KaTeX_Main-Italic.29c86397.ttf",revision:"29c86397e75cdcb3135af8295f1c2e28"},{url:"assets/fonts/KaTeX_Main-Italic.99be0e10.woff",revision:"99be0e10c38cd42466e6fe1665ef9536"},{url:"assets/fonts/KaTeX_Main-Italic.e533d5a2.woff2",revision:"e533d5a2506cf053cd671b335ec04dde"},{url:"assets/fonts/KaTeX_Main-Regular.5c734d78.woff2",revision:"5c734d78610fa35282f3379f866707f2"},{url:"assets/fonts/KaTeX_Main-Regular.5c94aef4.ttf",revision:"5c94aef490324b0925dbe5f643e8fd04"},{url:"assets/fonts/KaTeX_Main-Regular.b741441f.woff",revision:"b741441f6d71014d0453ca3ebc884dd4"},{url:"assets/fonts/KaTeX_Math-BoldItalic.9a2834a9.ttf",revision:"9a2834a9ff8ab411153571e0e55ac693"},{url:"assets/fonts/KaTeX_Math-BoldItalic.b13731ef.woff",revision:"b13731ef4e2bfc3d8d859271e39550fc"},{url:"assets/fonts/KaTeX_Math-BoldItalic.d747bd1e.woff2",revision:"d747bd1e7a6a43864285edd73dcde253"},{url:"assets/fonts/KaTeX_Math-Italic.291e76b8.ttf",revision:"291e76b8871b84560701bd29f9d1dcc7"},{url:"assets/fonts/KaTeX_Math-Italic.4ad08b82.woff2",revision:"4ad08b826b8065e1eab85324d726538c"},{url:"assets/fonts/KaTeX_Math-Italic.f0303906.woff",revision:"f0303906c2a67ac63bf1e8ccd638a89e"},{url:"assets/fonts/KaTeX_SansSerif-Bold.3fb41955.woff",revision:"3fb419559955e3ce75619f1a5e8c6c84"},{url:"assets/fonts/KaTeX_SansSerif-Bold.6e0830be.woff2",revision:"6e0830bee40435e72165345e0682fbfc"},{url:"assets/fonts/KaTeX_SansSerif-Bold.7dc027cb.ttf",revision:"7dc027cba9f7b11ec92af4a311372a85"},{url:"assets/fonts/KaTeX_SansSerif-Italic.4059868e.ttf",revision:"4059868e460d2d2e6be18e180d20c43d"},{url:"assets/fonts/KaTeX_SansSerif-Italic.727a9b0d.woff",revision:"727a9b0d97d72d2fc0228fe4e07fb4d8"},{url:"assets/fonts/KaTeX_SansSerif-Italic.fba01c9c.woff2",revision:"fba01c9c6fb2866a0f95bcacb2c187a5"},{url:"assets/fonts/KaTeX_SansSerif-Regular.2555754a.woff",revision:"2555754a67062cac3a0913b715ab982f"},{url:"assets/fonts/KaTeX_SansSerif-Regular.5c58d168.ttf",revision:"5c58d168c0b66d2c32234a6718e74dfb"},{url:"assets/fonts/KaTeX_SansSerif-Regular.d929cd67.woff2",revision:"d929cd671b19f0cfea55b6200fb47461"},{url:"assets/fonts/KaTeX_Script-Regular.755e2491.woff2",revision:"755e2491f13b5269f0afd5a56f7aa692"},{url:"assets/fonts/KaTeX_Script-Regular.d12ea9ef.ttf",revision:"d12ea9efb375f9dc331f562e69892638"},{url:"assets/fonts/KaTeX_Script-Regular.d524c9a5.woff",revision:"d524c9a5b62a17f98f4a97af37fea735"},{url:"assets/fonts/KaTeX_Size1-Regular.7342d45b.ttf",revision:"7342d45b052c3a2abc21049959fbab7f"},{url:"assets/fonts/KaTeX_Size2-Regular.eb130dcc.ttf",revision:"eb130dcc661de766c999c60ba1525a88"},{url:"assets/fonts/KaTeX_Size4-Regular.ad767252.ttf",revision:"ad7672524b64b730dfd176140a8945cb"},{url:"assets/fonts/KaTeX_Typewriter-Regular.25702356.ttf",revision:"257023560753aeb0b89b7e434d3da17f"},{url:"assets/fonts/KaTeX_Typewriter-Regular.3fe216d2.woff",revision:"3fe216d2a5f736c560cde71984554b64"},{url:"assets/fonts/KaTeX_Typewriter-Regular.6cc31ea5.woff2",revision:"6cc31ea5c223c88705a13727a71417fa"},{url:"assets/img/default-skin.b257fa9c.svg",revision:"b257fa9c5ac8c515ac4d77a667ce2943"},{url:"assets/img/homeImage.5ae9de9e.jpg",revision:"5ae9de9e15120d94e9892d0c15da9896"},{url:"assets/img/search.83621669.svg",revision:"83621669651b9a3d4bf64d1a670ad856"},{url:"assets/js/app.1340ca1f.js",revision:"6e6ac811e21e68c8d13760364bd62474"},{url:"assets/js/layout-Blog.ad11205a.js",revision:"65cce4cd71740fc7c7ba5c52ad4ddfee"},{url:"assets/js/layout-NotFound.b8bd58f5.js",revision:"b27ebc5b6fd691874d909186159b60bf"},{url:"assets/js/page-Blob--8636b6e0.d1e133c7.js",revision:"36390488335a834a9e305c8ca8f1de47"},{url:"assets/js/page-ConcurrentModefiber--428f0236.42e64cd7.js",revision:"7df9489ca414eb8d72be590bd3f869fc"},{url:"assets/js/page-createAppmount--59c6962e.1c532878.js",revision:"104f6911bb412fdbda280cb79fdbe9b8"},{url:"assets/js/page-createElementrender--4e0fce44.d2a82234.js",revision:"17fc7f544fedc7a6e16c0ab5410ec976"},{url:"assets/js/page-effect--c37ff3b6.e880b6ad.js",revision:"933f2fd503b5bf69bc8e05ad487e3904"},{url:"assets/js/page-handlers代理方法--71d35776.615a02aa.js",revision:"ce498b7a12efd1e3b358db4a77b0e8ca"},{url:"assets/js/page-koa--0da4005e.50386391.js",revision:"349bed32926ceab5dc781072d385b021"},{url:"assets/js/page-react-redux--476f3c76.b324bf7a.js",revision:"70c1967640d2fd3591304ec92a01a6f5"},{url:"assets/js/page-reactive--9fc44336.5ee427be.js",revision:"a9d7097bd33b8f6df5e4ac820fa859b5"},{url:"assets/js/page-reactiveeffect--5bf69d3a.d9bff858.js",revision:"1ab760d5eb80b95f5a1ba3707b9e2ceb"},{url:"assets/js/page-reconciliation--52aa2555.8945e60b.js",revision:"5482b6fdb5f061107d3ab627f6c96b8e"},{url:"assets/js/page-redux--6dd09404.8f2fd4b6.js",revision:"9db455d4119897db45b6e208423a253a"},{url:"assets/js/page-rendercommit--7f6091c5.16d453f3.js",revision:"3449e1d4d204115eaa2a6e977cc36445"},{url:"assets/js/page-useState--60c92407.e4fd97c9.js",revision:"484cd1596aa54bf8a04c3a41c5e44d1f"},{url:"assets/js/page-函子--e5be893e.5d83d0d1.js",revision:"b8414c3744d0d6f1e274aba226a7394e"},{url:"assets/js/page-函数式编程--37b59b1c.d80acde2.js",revision:"435dd690f9043923b2d8f49ffc7c631f"},{url:"assets/js/page-函数的组合--60414ba3.1308803e.js",revision:"1f49f52c5eb2379ac9722c9f4a935f0c"},{url:"assets/js/page-函数组件--2406c685.36be9bc2.js",revision:"a26eecf56005ca23e6c6387bf103f872"},{url:"assets/js/page-函数输入处理--151f0a76.993036f0.js",revision:"baf889ed245a121d47dccbdf5d75ab0d"},{url:"assets/js/page-文件上传--f74d7bf6.c04c5cd2.js",revision:"3ac46fbc7ab70c5093d783fb5326c4b6"},{url:"assets/js/page-组件渲染的细节--21758d7d.92a29632.js",revision:"00eab455cb0879d70e5eb7abb1a19b18"},{url:"assets/js/page-首页--8fc477d4.40289db3.js",revision:"615964ba725a36f7603f14d3ef4c6aaa"},{url:"assets/js/vendors~layout-Blog~layout-Layout.46f84fbc.js",revision:"9adcf8c4a9b19fa3db7bd584c01e6d7f"},{url:"assets/js/vendors~layout-Blog~layout-Layout~layout-NotFound.15460e54.js",revision:"b0d5ffdbbef5b2edb6fdfc12f7b9e3c0"},{url:"assets/js/vendors~layout-Layout.e7af67ad.js",revision:"d71e8d08f1bc43f69137c57ad50f9ca7"},{url:"category/index.html",revision:"5850d74b24e8794a766ab1a84b3c69e1"},{url:"fonts/dm-italic.ttf",revision:"42d2633a73e48a4a0f0c07035b20e9cc"},{url:"fonts/dm-regular.ttf",revision:"6d0dca36f4b308f1b05ac34f8b18c8d7"},{url:"fonts/汉仪旗黑50简.ttf",revision:"79781ea0063360f5ffed23d98954359f"},{url:"images/fiber.png",revision:"63a7f41b95f8f623b411cec105258d7b"},{url:"index.html",revision:"da7b4af08f3513c37d621e7b242138b4"},{url:"logo/logo200.png",revision:"dfc1cca5e2fec86474f3fc9a1b6a6c8b"},{url:"logo/logo500.png",revision:"8d1c3a2d6acd1ad3bc704027fd3606e6"},{url:"tag/index.html",revision:"b39ee631ac24f35c25288cd938760765"},{url:"timeline/index.html",revision:"011249d2d186d8c5e947dde45daf70fa"},{url:"views/functional/compose/index.html",revision:"cca02dcf1ae613ba9f28e41695c20456"},{url:"views/functional/functor/index.html",revision:"87c1b379b1dbf33d9c3000f34578cb13"},{url:"views/functional/index.html",revision:"c14869bf7aca8eae4ffad9bc5566f30a"},{url:"views/functional/inputs/index.html",revision:"faa3c0b20c51c103af8435db64c7b403"},{url:"views/JS/index.html",revision:"edf908ae9947dc3a421f7fe7a7960a0f"},{url:"views/JS/upload/index.html",revision:"778f0872ca9dc59f84ed4010555500e2"},{url:"views/owner-koa/index.html",revision:"5658352ccc1aa3cb543118c67da5ea21"},{url:"views/owner-react/fiber/index.html",revision:"662bfaa788880b517bebcdb499c6339c"},{url:"views/owner-react/functionComponent/index.html",revision:"e6ea8a1f7bcd9b9fda9ee23094d230c6"},{url:"views/owner-react/index.html",revision:"24730aa7ff73930bb23f7ec40c028183"},{url:"views/owner-react/reconciliation/index.html",revision:"6cee77f835a709c3379d39c4c1758ac2"},{url:"views/owner-react/render&commit/index.html",revision:"611d7d2274edfaed7a04d29463cedf0b"},{url:"views/owner-react/useState/index.html",revision:"3d4988e52fc5fbc3299f8b7058aeb868"},{url:"views/owner-redux/index.html",revision:"7e2b513d07be35a86135bdd7dc99c848"},{url:"views/owner-redux/react-redux/index.html",revision:"a47e1b1ad4cfe71cbf7f895e13b43627"},{url:"views/owner-vue-next/index.html",revision:"6b2fab2fc01ed5077dd5e5a761b7ccc5"},{url:"views/vue-next/componentDetail/index.html",revision:"9f6e7cf9c6364efb6b5f6f2b99331589"},{url:"views/vue-next/createApp&mount/index.html",revision:"85ae127c1aafdc6a8c9898bac7681c19"},{url:"views/vue-next/effect/index.html",revision:"482702c510c6c837be686e5a198b3fd8"},{url:"views/vue-next/handler/index.html",revision:"e369bf46ab0807caed670ed74c66b63f"},{url:"views/vue-next/reactive/index.html",revision:"5f44e248c4fbcfa5d9ec7cb1eb6df5d3"},{url:"xuan200.png",revision:"337c9efc9e84b65cfe4b29fe0d909ab4"},{url:"xuan500.png",revision:"7afeb05055b35382431eeee9f3953d56"}],{})}));
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
