if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let a=Promise.resolve();return s[e]||(a=new Promise(async a=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=a}else importScripts(e),a()})),a.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},a=(a,s)=>{Promise.all(a.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(a)};self.define=(a,f,r)=>{s[a]||(s[a]=Promise.resolve().then(()=>{let s={};const i={uri:location.origin+a.slice(1)};return Promise.all(f.map(a=>{switch(a){case"exports":return s;case"module":return i;default:return e(a)}})).then(e=>{const a=r(...e);return s.default||(s.default=a),s})}))}}define("./service-worker.js",["./workbox-1bbb3e0e"],(function(e){"use strict";self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:"404.html",revision:"137020fa8aedab08c6597f6b1b598542"},{url:"article/index.html",revision:"bfd06d590645902a5eef11360ccd0460"},{url:"assets/css/0.styles.c05efa9a.css",revision:"c3bc9d252e50403678d67fdb65dc8503"},{url:"assets/fonts/KaTeX_AMS-Regular.7f06b4e3.woff",revision:"7f06b4e30317f784d61d26686aed0ab2"},{url:"assets/fonts/KaTeX_AMS-Regular.aaf4eee9.ttf",revision:"aaf4eee9fba9907d61c3935e0b6a54ae"},{url:"assets/fonts/KaTeX_AMS-Regular.e78e28b4.woff2",revision:"e78e28b4834954df047e4925e9dbf354"},{url:"assets/fonts/KaTeX_Caligraphic-Bold.021dd4dc.ttf",revision:"021dd4dc61ee5f5cdf315f43b48c094b"},{url:"assets/fonts/KaTeX_Caligraphic-Bold.1e802ca9.woff",revision:"1e802ca9dedc4ed4e3c6f645e4316128"},{url:"assets/fonts/KaTeX_Caligraphic-Bold.4ec58bef.woff2",revision:"4ec58befa687e9752c3c91cd9bcf1bcb"},{url:"assets/fonts/KaTeX_Caligraphic-Regular.7edb53b6.woff2",revision:"7edb53b6693d75b8a2232481eea1a52c"},{url:"assets/fonts/KaTeX_Caligraphic-Regular.d3b46c3a.woff",revision:"d3b46c3a530116933081d9d74e3e9fe8"},{url:"assets/fonts/KaTeX_Caligraphic-Regular.d49f2d55.ttf",revision:"d49f2d55ce4f40f982d8ba63d746fbf9"},{url:"assets/fonts/KaTeX_Fraktur-Bold.a31e7cba.ttf",revision:"a31e7cba7b7221ebf1a2ae545fb306b2"},{url:"assets/fonts/KaTeX_Fraktur-Bold.c4c8cab7.woff",revision:"c4c8cab7d5be97b2bb283e531c077355"},{url:"assets/fonts/KaTeX_Fraktur-Bold.d5b59ec9.woff2",revision:"d5b59ec9764e10f4a82369ae29f3ac58"},{url:"assets/fonts/KaTeX_Fraktur-Regular.32a5339e.woff2",revision:"32a5339eb809f381a7357ba56f82aab3"},{url:"assets/fonts/KaTeX_Fraktur-Regular.a48dad4f.ttf",revision:"a48dad4f58c82e38a10da0ceebb86370"},{url:"assets/fonts/KaTeX_Fraktur-Regular.b7d9c46b.woff",revision:"b7d9c46bff5d51da6209e355cc4a235d"},{url:"assets/fonts/KaTeX_Main-Bold.22086eb5.woff",revision:"22086eb5d97009c3e99bcc1d16ce6865"},{url:"assets/fonts/KaTeX_Main-Bold.8e1e01c4.woff2",revision:"8e1e01c4b1207c0a383d9a2b4f86e637"},{url:"assets/fonts/KaTeX_Main-Bold.9ceff51b.ttf",revision:"9ceff51b3cb7ce6eb4e8efa8163a1472"},{url:"assets/fonts/KaTeX_Main-BoldItalic.284a17fe.woff2",revision:"284a17fe5baf72ff8217d4c7e70c0f82"},{url:"assets/fonts/KaTeX_Main-BoldItalic.4c57dbc4.woff",revision:"4c57dbc44bfff1fdf08a59cf556fdab3"},{url:"assets/fonts/KaTeX_Main-BoldItalic.e8b44b99.ttf",revision:"e8b44b990516dab7937bf240fde8b46a"},{url:"assets/fonts/KaTeX_Main-Italic.29c86397.ttf",revision:"29c86397e75cdcb3135af8295f1c2e28"},{url:"assets/fonts/KaTeX_Main-Italic.99be0e10.woff",revision:"99be0e10c38cd42466e6fe1665ef9536"},{url:"assets/fonts/KaTeX_Main-Italic.e533d5a2.woff2",revision:"e533d5a2506cf053cd671b335ec04dde"},{url:"assets/fonts/KaTeX_Main-Regular.5c734d78.woff2",revision:"5c734d78610fa35282f3379f866707f2"},{url:"assets/fonts/KaTeX_Main-Regular.5c94aef4.ttf",revision:"5c94aef490324b0925dbe5f643e8fd04"},{url:"assets/fonts/KaTeX_Main-Regular.b741441f.woff",revision:"b741441f6d71014d0453ca3ebc884dd4"},{url:"assets/fonts/KaTeX_Math-BoldItalic.9a2834a9.ttf",revision:"9a2834a9ff8ab411153571e0e55ac693"},{url:"assets/fonts/KaTeX_Math-BoldItalic.b13731ef.woff",revision:"b13731ef4e2bfc3d8d859271e39550fc"},{url:"assets/fonts/KaTeX_Math-BoldItalic.d747bd1e.woff2",revision:"d747bd1e7a6a43864285edd73dcde253"},{url:"assets/fonts/KaTeX_Math-Italic.291e76b8.ttf",revision:"291e76b8871b84560701bd29f9d1dcc7"},{url:"assets/fonts/KaTeX_Math-Italic.4ad08b82.woff2",revision:"4ad08b826b8065e1eab85324d726538c"},{url:"assets/fonts/KaTeX_Math-Italic.f0303906.woff",revision:"f0303906c2a67ac63bf1e8ccd638a89e"},{url:"assets/fonts/KaTeX_SansSerif-Bold.3fb41955.woff",revision:"3fb419559955e3ce75619f1a5e8c6c84"},{url:"assets/fonts/KaTeX_SansSerif-Bold.6e0830be.woff2",revision:"6e0830bee40435e72165345e0682fbfc"},{url:"assets/fonts/KaTeX_SansSerif-Bold.7dc027cb.ttf",revision:"7dc027cba9f7b11ec92af4a311372a85"},{url:"assets/fonts/KaTeX_SansSerif-Italic.4059868e.ttf",revision:"4059868e460d2d2e6be18e180d20c43d"},{url:"assets/fonts/KaTeX_SansSerif-Italic.727a9b0d.woff",revision:"727a9b0d97d72d2fc0228fe4e07fb4d8"},{url:"assets/fonts/KaTeX_SansSerif-Italic.fba01c9c.woff2",revision:"fba01c9c6fb2866a0f95bcacb2c187a5"},{url:"assets/fonts/KaTeX_SansSerif-Regular.2555754a.woff",revision:"2555754a67062cac3a0913b715ab982f"},{url:"assets/fonts/KaTeX_SansSerif-Regular.5c58d168.ttf",revision:"5c58d168c0b66d2c32234a6718e74dfb"},{url:"assets/fonts/KaTeX_SansSerif-Regular.d929cd67.woff2",revision:"d929cd671b19f0cfea55b6200fb47461"},{url:"assets/fonts/KaTeX_Script-Regular.755e2491.woff2",revision:"755e2491f13b5269f0afd5a56f7aa692"},{url:"assets/fonts/KaTeX_Script-Regular.d12ea9ef.ttf",revision:"d12ea9efb375f9dc331f562e69892638"},{url:"assets/fonts/KaTeX_Script-Regular.d524c9a5.woff",revision:"d524c9a5b62a17f98f4a97af37fea735"},{url:"assets/fonts/KaTeX_Size1-Regular.7342d45b.ttf",revision:"7342d45b052c3a2abc21049959fbab7f"},{url:"assets/fonts/KaTeX_Size2-Regular.eb130dcc.ttf",revision:"eb130dcc661de766c999c60ba1525a88"},{url:"assets/fonts/KaTeX_Size4-Regular.ad767252.ttf",revision:"ad7672524b64b730dfd176140a8945cb"},{url:"assets/fonts/KaTeX_Typewriter-Regular.25702356.ttf",revision:"257023560753aeb0b89b7e434d3da17f"},{url:"assets/fonts/KaTeX_Typewriter-Regular.3fe216d2.woff",revision:"3fe216d2a5f736c560cde71984554b64"},{url:"assets/fonts/KaTeX_Typewriter-Regular.6cc31ea5.woff2",revision:"6cc31ea5c223c88705a13727a71417fa"},{url:"assets/img/default-skin.b257fa9c.svg",revision:"b257fa9c5ac8c515ac4d77a667ce2943"},{url:"assets/img/homeImage.5ae9de9e.jpg",revision:"5ae9de9e15120d94e9892d0c15da9896"},{url:"assets/img/search.83621669.svg",revision:"83621669651b9a3d4bf64d1a670ad856"},{url:"assets/js/app.a31280ec.js",revision:"ecfb5d806829f6f788200f362d28bbf3"},{url:"assets/js/layout-Blog.ad11205a.js",revision:"65cce4cd71740fc7c7ba5c52ad4ddfee"},{url:"assets/js/layout-NotFound.b8bd58f5.js",revision:"b27ebc5b6fd691874d909186159b60bf"},{url:"assets/js/page-Blob--8636b6e0.d1e133c7.js",revision:"36390488335a834a9e305c8ca8f1de47"},{url:"assets/js/page-ConcurrentModefiber--428f0236.42e64cd7.js",revision:"7df9489ca414eb8d72be590bd3f869fc"},{url:"assets/js/page-createAppmount--59c6962e.c1d51111.js",revision:"723eb68f961b7fef7198a1de700f2547"},{url:"assets/js/page-createElementrender--4e0fce44.0bf00104.js",revision:"830a2204326621f71c104c1b584f58ac"},{url:"assets/js/page-effect--c37ff3b6.9b69838e.js",revision:"5093e1f7498faf2bb33d79268774ad5e"},{url:"assets/js/page-handlers代理方法--71d35776.5171de19.js",revision:"2d01d339bf990bcfc5454fe202ec5854"},{url:"assets/js/page-koa--0da4005e.0e160c87.js",revision:"a98d626368791c79c983406adec0c42c"},{url:"assets/js/page-react-redux--476f3c76.7c7d8e54.js",revision:"f1d44501409945c89f3f2166302d09d7"},{url:"assets/js/page-reactive--9fc44336.d1647a28.js",revision:"ae3e04bd0746e2f98925eaacddf2c5f4"},{url:"assets/js/page-reactiveeffect--5bf69d3a.a15df5e3.js",revision:"e708cfe770d664fb330ac063ffca601a"},{url:"assets/js/page-reconciliation--52aa2555.3ba8005a.js",revision:"c822ec5a7f05154c9ec15a22628d1d87"},{url:"assets/js/page-redux--6dd09404.055394d0.js",revision:"b1d4bac66f6359b32db227e33bd3fb20"},{url:"assets/js/page-rendercommit--7f6091c5.f4b6652f.js",revision:"170ca3afac8bc9b5acc316cff1e766ad"},{url:"assets/js/page-useState--60c92407.ba6c9cb8.js",revision:"e17339aeaab3b4b94c1dada3895d1271"},{url:"assets/js/page-函数组件--2406c685.42ef4b9e.js",revision:"14a32efb1b9525771fd389010d7110f2"},{url:"assets/js/page-文件上传--f74d7bf6.e624232e.js",revision:"8fe4aa6637fde2b7aa27feda44fde263"},{url:"assets/js/page-组件渲染的细节--21758d7d.91bd3aa4.js",revision:"b92dba99d8c9c039afbfbf66527d582d"},{url:"assets/js/page-首页--8fc477d4.0fe73dc5.js",revision:"51edf59492710cc78c5752feadf99f5e"},{url:"assets/js/vendors~layout-Blog~layout-Layout.46f84fbc.js",revision:"9adcf8c4a9b19fa3db7bd584c01e6d7f"},{url:"assets/js/vendors~layout-Blog~layout-Layout~layout-NotFound.15460e54.js",revision:"b0d5ffdbbef5b2edb6fdfc12f7b9e3c0"},{url:"assets/js/vendors~layout-Layout.50558b2b.js",revision:"436ad5c46fa90eb3a9918653650deb12"},{url:"category/index.html",revision:"96b438a91a1759da974b8398820ccfd0"},{url:"fonts/dm-italic.ttf",revision:"42d2633a73e48a4a0f0c07035b20e9cc"},{url:"fonts/dm-regular.ttf",revision:"6d0dca36f4b308f1b05ac34f8b18c8d7"},{url:"fonts/汉仪旗黑50简.ttf",revision:"79781ea0063360f5ffed23d98954359f"},{url:"images/fiber.png",revision:"63a7f41b95f8f623b411cec105258d7b"},{url:"index.html",revision:"0834ea193d63847b7d7224b488e032e9"},{url:"logo/logo200.png",revision:"dfc1cca5e2fec86474f3fc9a1b6a6c8b"},{url:"logo/logo500.png",revision:"8d1c3a2d6acd1ad3bc704027fd3606e6"},{url:"tag/index.html",revision:"3cbb3b9ac5a93caa350f28f8ad69acf7"},{url:"timeline/index.html",revision:"adf9fc64def10cece0ced22db74b9f74"},{url:"views/JS/index.html",revision:"02ea74daa1789d89afcf6b8dabb2b53d"},{url:"views/JS/upload/index.html",revision:"9a035eff61c5f06cebba39ce06387003"},{url:"views/owner-koa/index.html",revision:"6b430ba8bb65a5bf42f0c0574202a76b"},{url:"views/owner-react/fiber/index.html",revision:"0439d72cae85cfc0f054e0cdb1f2e6c7"},{url:"views/owner-react/functionComponent/index.html",revision:"728d80fd0151ab8517b4d9b3cd3e16ab"},{url:"views/owner-react/index.html",revision:"72aeef77c1496df94ff1a8164301812c"},{url:"views/owner-react/reconciliation/index.html",revision:"62ef22f658ad276343f82641270e72bb"},{url:"views/owner-react/render&commit/index.html",revision:"d1c7bac98ec796823c8894e47cf30158"},{url:"views/owner-react/useState/index.html",revision:"51e0cae020fd4193342cf9da3a190e89"},{url:"views/owner-redux/index.html",revision:"717e11319a74d1494d682601e43e403f"},{url:"views/owner-redux/react-redux/index.html",revision:"bccd43921d126d8fe4668d4be31a0fdc"},{url:"views/owner-vue-next/index.html",revision:"40612d602a91e8f01eaa6dafe85cb049"},{url:"views/vue-next/componentDetail/index.html",revision:"b44eb5d32afce56502dc3cdc55b865a3"},{url:"views/vue-next/createApp&mount/index.html",revision:"a209882d6770bb10188cfa1d21f8f355"},{url:"views/vue-next/effect/index.html",revision:"520dc8f69419c5afd9be53bc1d791e6f"},{url:"views/vue-next/handler/index.html",revision:"d6ba4dce64cf8450ecb0b4dce35dce5a"},{url:"views/vue-next/reactive/index.html",revision:"585c752a5316b587c9d1a0b19104791c"},{url:"xuan200.png",revision:"337c9efc9e84b65cfe4b29fe0d909ab4"},{url:"xuan500.png",revision:"7afeb05055b35382431eeee9f3953d56"}],{})}));
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
