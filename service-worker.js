if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let a=Promise.resolve();return s[e]||(a=new Promise(async a=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=a}else importScripts(e),a()})),a.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},a=(a,s)=>{Promise.all(a.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(a)};self.define=(a,f,i)=>{s[a]||(s[a]=Promise.resolve().then(()=>{let s={};const c={uri:location.origin+a.slice(1)};return Promise.all(f.map(a=>{switch(a){case"exports":return s;case"module":return c;default:return e(a)}})).then(e=>{const a=i(...e);return s.default||(s.default=a),s})}))}}define("./service-worker.js",["./workbox-1bbb3e0e"],(function(e){"use strict";self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:"404.html",revision:"54ad627e4fa0fbabe04897452103c18c"},{url:"article/index.html",revision:"85ea634c657353cf8b8fd73a2b1cd181"},{url:"assets/css/0.styles.d7621589.css",revision:"6f726fe5db3a987ac38ffc82df6078cd"},{url:"assets/fonts/KaTeX_AMS-Regular.7f06b4e3.woff",revision:"7f06b4e30317f784d61d26686aed0ab2"},{url:"assets/fonts/KaTeX_AMS-Regular.aaf4eee9.ttf",revision:"aaf4eee9fba9907d61c3935e0b6a54ae"},{url:"assets/fonts/KaTeX_AMS-Regular.e78e28b4.woff2",revision:"e78e28b4834954df047e4925e9dbf354"},{url:"assets/fonts/KaTeX_Caligraphic-Bold.021dd4dc.ttf",revision:"021dd4dc61ee5f5cdf315f43b48c094b"},{url:"assets/fonts/KaTeX_Caligraphic-Bold.1e802ca9.woff",revision:"1e802ca9dedc4ed4e3c6f645e4316128"},{url:"assets/fonts/KaTeX_Caligraphic-Bold.4ec58bef.woff2",revision:"4ec58befa687e9752c3c91cd9bcf1bcb"},{url:"assets/fonts/KaTeX_Caligraphic-Regular.7edb53b6.woff2",revision:"7edb53b6693d75b8a2232481eea1a52c"},{url:"assets/fonts/KaTeX_Caligraphic-Regular.d3b46c3a.woff",revision:"d3b46c3a530116933081d9d74e3e9fe8"},{url:"assets/fonts/KaTeX_Caligraphic-Regular.d49f2d55.ttf",revision:"d49f2d55ce4f40f982d8ba63d746fbf9"},{url:"assets/fonts/KaTeX_Fraktur-Bold.a31e7cba.ttf",revision:"a31e7cba7b7221ebf1a2ae545fb306b2"},{url:"assets/fonts/KaTeX_Fraktur-Bold.c4c8cab7.woff",revision:"c4c8cab7d5be97b2bb283e531c077355"},{url:"assets/fonts/KaTeX_Fraktur-Bold.d5b59ec9.woff2",revision:"d5b59ec9764e10f4a82369ae29f3ac58"},{url:"assets/fonts/KaTeX_Fraktur-Regular.32a5339e.woff2",revision:"32a5339eb809f381a7357ba56f82aab3"},{url:"assets/fonts/KaTeX_Fraktur-Regular.a48dad4f.ttf",revision:"a48dad4f58c82e38a10da0ceebb86370"},{url:"assets/fonts/KaTeX_Fraktur-Regular.b7d9c46b.woff",revision:"b7d9c46bff5d51da6209e355cc4a235d"},{url:"assets/fonts/KaTeX_Main-Bold.22086eb5.woff",revision:"22086eb5d97009c3e99bcc1d16ce6865"},{url:"assets/fonts/KaTeX_Main-Bold.8e1e01c4.woff2",revision:"8e1e01c4b1207c0a383d9a2b4f86e637"},{url:"assets/fonts/KaTeX_Main-Bold.9ceff51b.ttf",revision:"9ceff51b3cb7ce6eb4e8efa8163a1472"},{url:"assets/fonts/KaTeX_Main-BoldItalic.284a17fe.woff2",revision:"284a17fe5baf72ff8217d4c7e70c0f82"},{url:"assets/fonts/KaTeX_Main-BoldItalic.4c57dbc4.woff",revision:"4c57dbc44bfff1fdf08a59cf556fdab3"},{url:"assets/fonts/KaTeX_Main-BoldItalic.e8b44b99.ttf",revision:"e8b44b990516dab7937bf240fde8b46a"},{url:"assets/fonts/KaTeX_Main-Italic.29c86397.ttf",revision:"29c86397e75cdcb3135af8295f1c2e28"},{url:"assets/fonts/KaTeX_Main-Italic.99be0e10.woff",revision:"99be0e10c38cd42466e6fe1665ef9536"},{url:"assets/fonts/KaTeX_Main-Italic.e533d5a2.woff2",revision:"e533d5a2506cf053cd671b335ec04dde"},{url:"assets/fonts/KaTeX_Main-Regular.5c734d78.woff2",revision:"5c734d78610fa35282f3379f866707f2"},{url:"assets/fonts/KaTeX_Main-Regular.5c94aef4.ttf",revision:"5c94aef490324b0925dbe5f643e8fd04"},{url:"assets/fonts/KaTeX_Main-Regular.b741441f.woff",revision:"b741441f6d71014d0453ca3ebc884dd4"},{url:"assets/fonts/KaTeX_Math-BoldItalic.9a2834a9.ttf",revision:"9a2834a9ff8ab411153571e0e55ac693"},{url:"assets/fonts/KaTeX_Math-BoldItalic.b13731ef.woff",revision:"b13731ef4e2bfc3d8d859271e39550fc"},{url:"assets/fonts/KaTeX_Math-BoldItalic.d747bd1e.woff2",revision:"d747bd1e7a6a43864285edd73dcde253"},{url:"assets/fonts/KaTeX_Math-Italic.291e76b8.ttf",revision:"291e76b8871b84560701bd29f9d1dcc7"},{url:"assets/fonts/KaTeX_Math-Italic.4ad08b82.woff2",revision:"4ad08b826b8065e1eab85324d726538c"},{url:"assets/fonts/KaTeX_Math-Italic.f0303906.woff",revision:"f0303906c2a67ac63bf1e8ccd638a89e"},{url:"assets/fonts/KaTeX_SansSerif-Bold.3fb41955.woff",revision:"3fb419559955e3ce75619f1a5e8c6c84"},{url:"assets/fonts/KaTeX_SansSerif-Bold.6e0830be.woff2",revision:"6e0830bee40435e72165345e0682fbfc"},{url:"assets/fonts/KaTeX_SansSerif-Bold.7dc027cb.ttf",revision:"7dc027cba9f7b11ec92af4a311372a85"},{url:"assets/fonts/KaTeX_SansSerif-Italic.4059868e.ttf",revision:"4059868e460d2d2e6be18e180d20c43d"},{url:"assets/fonts/KaTeX_SansSerif-Italic.727a9b0d.woff",revision:"727a9b0d97d72d2fc0228fe4e07fb4d8"},{url:"assets/fonts/KaTeX_SansSerif-Italic.fba01c9c.woff2",revision:"fba01c9c6fb2866a0f95bcacb2c187a5"},{url:"assets/fonts/KaTeX_SansSerif-Regular.2555754a.woff",revision:"2555754a67062cac3a0913b715ab982f"},{url:"assets/fonts/KaTeX_SansSerif-Regular.5c58d168.ttf",revision:"5c58d168c0b66d2c32234a6718e74dfb"},{url:"assets/fonts/KaTeX_SansSerif-Regular.d929cd67.woff2",revision:"d929cd671b19f0cfea55b6200fb47461"},{url:"assets/fonts/KaTeX_Script-Regular.755e2491.woff2",revision:"755e2491f13b5269f0afd5a56f7aa692"},{url:"assets/fonts/KaTeX_Script-Regular.d12ea9ef.ttf",revision:"d12ea9efb375f9dc331f562e69892638"},{url:"assets/fonts/KaTeX_Script-Regular.d524c9a5.woff",revision:"d524c9a5b62a17f98f4a97af37fea735"},{url:"assets/fonts/KaTeX_Size1-Regular.7342d45b.ttf",revision:"7342d45b052c3a2abc21049959fbab7f"},{url:"assets/fonts/KaTeX_Size2-Regular.eb130dcc.ttf",revision:"eb130dcc661de766c999c60ba1525a88"},{url:"assets/fonts/KaTeX_Size4-Regular.ad767252.ttf",revision:"ad7672524b64b730dfd176140a8945cb"},{url:"assets/fonts/KaTeX_Typewriter-Regular.25702356.ttf",revision:"257023560753aeb0b89b7e434d3da17f"},{url:"assets/fonts/KaTeX_Typewriter-Regular.3fe216d2.woff",revision:"3fe216d2a5f736c560cde71984554b64"},{url:"assets/fonts/KaTeX_Typewriter-Regular.6cc31ea5.woff2",revision:"6cc31ea5c223c88705a13727a71417fa"},{url:"assets/img/default-skin.b257fa9c.svg",revision:"b257fa9c5ac8c515ac4d77a667ce2943"},{url:"assets/img/homeImage.56f13b5d.jpg",revision:"56f13b5d598a4feab49dd969ac9fd2ff"},{url:"assets/img/search.83621669.svg",revision:"83621669651b9a3d4bf64d1a670ad856"},{url:"assets/js/37.6874eba6.js",revision:"8f91385dd964df912f3cfeed4a274704"},{url:"assets/js/app.fc956f32.js",revision:"ca8815d950c07904e333a585918c1872"},{url:"assets/js/layout-Blog.8cd83531.js",revision:"122b6c0b533bd28ce778d0a183c85cf3"},{url:"assets/js/layout-Layout.85d11602.js",revision:"e5b24bf52e3169e1f19f8d202283945f"},{url:"assets/js/layout-NotFound.16a80787.js",revision:"820506a58d1206263b47ba0910c9ef7d"},{url:"assets/js/page-applicative--d5fd60f2.fedcd1a6.js",revision:"88cbab2e1edce091bdcfb4006e2f1e15"},{url:"assets/js/page-Blob--8636b6e0.a18925b9.js",revision:"8e1ee7edf6878a795607046239efb10e"},{url:"assets/js/page-ConcurrentModefiber--428f0236.4e9b06fe.js",revision:"d99da2c0bfc70844d84bcdc0233be69a"},{url:"assets/js/page-createAppmount--59c6962e.20d19405.js",revision:"55836757db363a0b4400ea8f205a1182"},{url:"assets/js/page-createElementrender--4e0fce44.916950b7.js",revision:"31a87d70ef98baface3c5b9167d30c68"},{url:"assets/js/page-effect--c37ff3b6.de78135c.js",revision:"ee97742291e780af941770bd6845dc11"},{url:"assets/js/page-handlers代理方法--71d35776.7ecb59cd.js",revision:"91729b3b2c89512ec8061d1455e00a96"},{url:"assets/js/page-koa--0da4005e.4b7547cf.js",revision:"26eaa5da02b44f880424e2956bad003a"},{url:"assets/js/page-monad--42efab29.f704dcad.js",revision:"58c9a46f8ed0ae4f0cd7597560e8fbe6"},{url:"assets/js/page-Observable--73755485.6b723532.js",revision:"8da913f8b4d33ba2e77e63e4a67e98b0"},{url:"assets/js/page-react-redux--476f3c76.0703044d.js",revision:"81d589d554d408d9005e82be9070eabf"},{url:"assets/js/page-reactive--9fc44336.c2055f12.js",revision:"d1fcd0fc5db3f35e20f7c458771779c8"},{url:"assets/js/page-reactiveeffect--5bf69d3a.acb560fb.js",revision:"f9da27b1e51ad12dfd093490ce7cd8f5"},{url:"assets/js/page-reconciliation--52aa2555.aca61b3b.js",revision:"912378f255a6292dc3744a0ff9ea949e"},{url:"assets/js/page-redux--6dd09404.5b854cc7.js",revision:"d06129b1877c4c7ec898c2e85d919119"},{url:"assets/js/page-rendercommit--7f6091c5.7fff2b1e.js",revision:"c3ed36d097f3791a626b380a1d7d3858"},{url:"assets/js/page-useState--60c92407.62166869.js",revision:"2a10e21006c33e5e1dc4e55095e2669b"},{url:"assets/js/page-webpack--740e8bbe.1e9a9123.js",revision:"a3560c1d4e5fb45fcc15ee794453300b"},{url:"assets/js/page-websecurity--26872ba5.fe69e5d1.js",revision:"c2e87a7fc3dc2d4c5f65335ae5d9e45d"},{url:"assets/js/page-函子--e5be893e.246eac1c.js",revision:"e7c963552fd3876fa2ee96e42f81ad54"},{url:"assets/js/page-函子之间的转换--513f68a2.7e076e41.js",revision:"4bc50bc0342f2d9c1df5020a17e0631b"},{url:"assets/js/page-函数式编程--37b59b1c.a033d1f4.js",revision:"ea6989c61ac4329015ff94540d3f8d70"},{url:"assets/js/page-函数的组合--60414ba3.981ca4ca.js",revision:"83e68de13daabafdc3e057f4747345af"},{url:"assets/js/page-函数组件--2406c685.0c996212.js",revision:"aac78087c29401150d7dc0fed27cd2ce"},{url:"assets/js/page-函数输入处理--151f0a76.6906338c.js",revision:"211799c9889e84be4675cbaa5aea477a"},{url:"assets/js/page-文件上传--f74d7bf6.fd99038c.js",revision:"05555286db287c6e789193030c20870d"},{url:"assets/js/page-组件渲染的细节--21758d7d.fc2f0f9e.js",revision:"b9d60c592d8ea1cde206637f319af7f1"},{url:"assets/js/page-首页--8fc477d4.ef201893.js",revision:"9442df08be10c06ac041367d7737bbd9"},{url:"assets/js/vendors~flowchart.70bdf89b.js",revision:"531f6ec34e6e76812f348db7816a9630"},{url:"assets/js/vendors~layout-Blog~layout-Layout.5106708b.js",revision:"63094bb2e53285d996317383f647c0cc"},{url:"assets/js/vendors~layout-Blog~layout-Layout~layout-NotFound.6341d7d4.js",revision:"a8ca27278c88b16339ca0126ace3406d"},{url:"assets/js/vendors~layout-Layout.b5d049ad.js",revision:"a5f77baceb3606b891b5726039ad4c28"},{url:"category/index.html",revision:"a0e73b10c54c501131cd192b942b88ea"},{url:"fonts/dm-italic.ttf",revision:"42d2633a73e48a4a0f0c07035b20e9cc"},{url:"fonts/dm-regular.ttf",revision:"6d0dca36f4b308f1b05ac34f8b18c8d7"},{url:"fonts/汉仪旗黑50简.ttf",revision:"79781ea0063360f5ffed23d98954359f"},{url:"images/fiber.png",revision:"63a7f41b95f8f623b411cec105258d7b"},{url:"index.html",revision:"eff210854c1c91750d056f6e183772f3"},{url:"logo/logo200.png",revision:"dfc1cca5e2fec86474f3fc9a1b6a6c8b"},{url:"logo/logo500.png",revision:"8d1c3a2d6acd1ad3bc704027fd3606e6"},{url:"tag/index.html",revision:"7f6fd4db9b27e3c51a6648c5bd38027c"},{url:"timeline/index.html",revision:"ec246311e535ecb0f4d59561874c7c77"},{url:"views/functional/applicative/index.html",revision:"331da6c8cb75c32b5489593f63ddfb96"},{url:"views/functional/compose/index.html",revision:"1e1ffcf062e611f95a4ae408415516f3"},{url:"views/functional/functor/index.html",revision:"77369d42870ab99663656ff8a39570a2"},{url:"views/functional/index.html",revision:"7ed2a18efc065d0e8c374d55eb8e37a5"},{url:"views/functional/inputs/index.html",revision:"82ca8b95cbce0391d67efdd54bd82136"},{url:"views/functional/monad/index.html",revision:"cd2dbbcdc0d1772ca4a70772662f8de6"},{url:"views/functional/rxjs/index.html",revision:"528568daed85cba830d0f7fb37cee1d5"},{url:"views/functional/transform/index.html",revision:"78da64345a955ff694e9e24df90301bc"},{url:"views/JS/index.html",revision:"54377461c6f78a6381eb4d1af55fef8d"},{url:"views/JS/security/index.html",revision:"3ca3dea0168865753639ea62ed6b8b4a"},{url:"views/JS/upload/index.html",revision:"eff40ed0f83767f13113d166e44e0f55"},{url:"views/JS/webpack/index.html",revision:"3e2ab6e61865fca50c0c2bf410f035d2"},{url:"views/owner-koa/index.html",revision:"1f973e65ae15580202851dea46fc110f"},{url:"views/owner-react/fiber/index.html",revision:"746f0ba38b0eeda08ca7dcd0069bb9af"},{url:"views/owner-react/functionComponent/index.html",revision:"e5e577776b6dcec76856f1634dd212b8"},{url:"views/owner-react/index.html",revision:"87f8a0552b4c2992096ee8e5988e7263"},{url:"views/owner-react/reconciliation/index.html",revision:"ce48acc8ce563358ed6a96e5d7512fb3"},{url:"views/owner-react/render&commit/index.html",revision:"e3a151833b2b48add947e379baa583ea"},{url:"views/owner-react/useState/index.html",revision:"68be269d4ec0e393a0cb630a735bc7af"},{url:"views/owner-redux/index.html",revision:"ff33997a73479e3c4cef288c10c25542"},{url:"views/owner-redux/react-redux/index.html",revision:"23c6fb393ce90b4ab3cbc4dc3ef75002"},{url:"views/owner-vue-next/index.html",revision:"88281a9312575431395da89166658f06"},{url:"views/vue-next/componentDetail/index.html",revision:"a7f348414c9cea8f1dba6e5bae5c3ed5"},{url:"views/vue-next/createApp&mount/index.html",revision:"2893d49dd8e08575dac7ae15fc9bf04d"},{url:"views/vue-next/effect/index.html",revision:"0520220792e77644a735e789145f77d5"},{url:"views/vue-next/handler/index.html",revision:"90bf56426ac70a009cc3cd5c0c370826"},{url:"views/vue-next/reactive/index.html",revision:"6289d4e48ba5c762af1aa6a6dcc2cfa1"},{url:"xuan200.png",revision:"337c9efc9e84b65cfe4b29fe0d909ab4"},{url:"xuan500.png",revision:"7afeb05055b35382431eeee9f3953d56"}],{})}));
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
