if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let a=Promise.resolve();return s[e]||(a=new Promise(async a=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=a}else importScripts(e),a()})),a.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},a=(a,s)=>{Promise.all(a.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(a)};self.define=(a,r,f)=>{s[a]||(s[a]=Promise.resolve().then(()=>{let s={};const i={uri:location.origin+a.slice(1)};return Promise.all(r.map(a=>{switch(a){case"exports":return s;case"module":return i;default:return e(a)}})).then(e=>{const a=f(...e);return s.default||(s.default=a),s})}))}}define("./service-worker.js",["./workbox-1bbb3e0e"],(function(e){"use strict";self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:"404.html",revision:"ba6aa63eff6182309dc4c605a561880d"},{url:"article/index.html",revision:"3539215cbf7793c1bfc418d4d3dc1b5e"},{url:"assets/css/0.styles.8775b95e.css",revision:"ac06ac5ce043d5a9d13d0638eb73ffe5"},{url:"assets/fonts/MathJax_AMS-Regular.07173fb7.woff",revision:"07173fb77d2ee655811499d40c8388e7"},{url:"assets/fonts/MathJax_Fraktur-Bold.bc421258.woff",revision:"bc42125861bd5bfc8686deeb612dcbb3"},{url:"assets/fonts/MathJax_Fraktur-Regular.b80e08d5.woff",revision:"b80e08d5a79acbd1fafb1ca6f3515664"},{url:"assets/fonts/MathJax_Main-Bold.c9423d5d.woff",revision:"c9423d5dc9d82a38ca215f74e9cdd9f2"},{url:"assets/fonts/MathJax_Main-Italic.7e83626b.woff",revision:"7e83626ba8bf2d20dc41565f1e6d0afc"},{url:"assets/fonts/MathJax_Main-Regular.9995de47.woff",revision:"9995de4787f908d8237dba7007f6c3fe"},{url:"assets/fonts/MathJax_Math-BoldItalic.77dbcee3.woff",revision:"77dbcee3c3d9a82a0c04a4ae7992b895"},{url:"assets/fonts/MathJax_Math-Italic.5589d1a8.woff",revision:"5589d1a8fc62be6613020ef2fa13e410"},{url:"assets/fonts/MathJax_SansSerif-Bold.07281897.woff",revision:"07281897a98a61c3733e1670f82a9fd5"},{url:"assets/fonts/MathJax_SansSerif-Italic.3d580bd5.woff",revision:"3d580bd561716bfb1f0b4fdd7063a802"},{url:"assets/fonts/MathJax_SansSerif-Regular.bc3af04f.woff",revision:"bc3af04f9a671fcabd6498042c57478f"},{url:"assets/fonts/MathJax_Script-Regular.4c74e33b.woff",revision:"4c74e33b0feb1fdbda49403a5e7ed604"},{url:"assets/fonts/MathJax_Typewriter-Regular.72815766.woff",revision:"72815766b08ca24d4d29ad1f5d4ecb45"},{url:"assets/img/homeImage.5ae9de9e.jpg",revision:"5ae9de9e15120d94e9892d0c15da9896"},{url:"assets/img/search.83621669.svg",revision:"83621669651b9a3d4bf64d1a670ad856"},{url:"assets/js/app.92a4c8bb.js",revision:"0f013825344480e3a6bfa09ba258d56b"},{url:"assets/js/layout-Blog.3a701847.js",revision:"4ee120d34316d4a5cdecc7c56a5c7b8c"},{url:"assets/js/layout-NotFound.dd201427.js",revision:"ec5fb898377d758126aa71f7d3f12626"},{url:"assets/js/page-Concurrent Mode & fiber.5c613f37.js",revision:"af38af01bc2ab7d4a5463171c8dd9eaf"},{url:"assets/js/page-createElement && render.18816abb.js",revision:"ca93e6a13f74b19da3926a3cd0e36f3a"},{url:"assets/js/page-effect.40fd05e9.js",revision:"4c4de1af76a0fc7ad837d6b8b3265177"},{url:"assets/js/page-handlers 代理方法.8027d72a.js",revision:"ffb6d115212039b0ab8a3ca791fd1e13"},{url:"assets/js/page-reactive && effect.258fa02f.js",revision:"eca22bf9a9afcd5dd4600cfc60479c0c"},{url:"assets/js/page-reactive.91474169.js",revision:"690743c783584567d024163c92066ac7"},{url:"assets/js/page-reconciliation.05f62b6d.js",revision:"23ffd73a933a8b4bdcf1c3f12f660e4b"},{url:"assets/js/page-render & commit.b2f34ec3.js",revision:"53845379f5a9418a0bfe98f99c883f28"},{url:"assets/js/page-useState.cfc54d66.js",revision:"dbd1ebb6fd69c6087ba31dc3a6782882"},{url:"assets/js/page-函数组件.550e3ead.js",revision:"a5bd710656bdca561293c7c681d72de4"},{url:"assets/js/page-首页.2f6be179.js",revision:"3e187d0700c2f8e86f6efbaf9925e1ac"},{url:"assets/js/vendors~flowchart.c1930816.js",revision:"2427f96fc03b6b783db27aa66ecebe81"},{url:"assets/js/vendors~layout-Blog~layout-Layout.799e5d16.js",revision:"b9da49a93057b2f3cdb5f163e7d3de1b"},{url:"assets/js/vendors~layout-Blog~layout-Layout~layout-NotFound.41725266.js",revision:"9f600c6d23a054ca721143d7ba333c46"},{url:"assets/js/vendors~layout-Layout.754e1bd8.js",revision:"a817ffaa593a102561b94505a74a049e"},{url:"category/index.html",revision:"a8dcb41833a9a1b6bf8fe00c2eca39c7"},{url:"fonts/dm-italic.ttf",revision:"42d2633a73e48a4a0f0c07035b20e9cc"},{url:"fonts/dm-regular.ttf",revision:"6d0dca36f4b308f1b05ac34f8b18c8d7"},{url:"fonts/汉仪旗黑50简.ttf",revision:"79781ea0063360f5ffed23d98954359f"},{url:"images/fiber.png",revision:"63a7f41b95f8f623b411cec105258d7b"},{url:"index.html",revision:"0fea6a97eb6733f2c7c808eac4de6b40"},{url:"logo/logo200.png",revision:"dfc1cca5e2fec86474f3fc9a1b6a6c8b"},{url:"logo/logo500.png",revision:"8d1c3a2d6acd1ad3bc704027fd3606e6"},{url:"tag/index.html",revision:"0673c50e1022f1eb380f53cc76b7a988"},{url:"timeline/index.html",revision:"161f33fac3d22caba5d02183da5404fe"},{url:"views/owner-react/fiber.html",revision:"510d0ecefb05a0b129b64fc4e0885458"},{url:"views/owner-react/functionComponent.html",revision:"e0372e1074d25f1052611478d0b5c9b7"},{url:"views/owner-react/index.html",revision:"de4cd6260d20e37e46e136734308c6c2"},{url:"views/owner-react/reconciliation.html",revision:"59b676ac8a4dc391da202bb4e0a252a0"},{url:"views/owner-react/render&commit.html",revision:"8bc94f721a0572360d6fdc25f7fc33f0"},{url:"views/owner-react/useState.html",revision:"725ae43093bdfa80261aec890f893329"},{url:"views/owner-vue-next/index.html",revision:"4b1ce1bf3d1da47fe665aa733400e8a3"},{url:"views/vue-next/effect.html",revision:"b342163f268c632285eaea7b07f89a09"},{url:"views/vue-next/handler.html",revision:"0794c51306ae76d8ad88c09a4aa9b35a"},{url:"views/vue-next/reactive.html",revision:"e087778e83184fbedf8ef67d946af5f0"},{url:"xuan200.png",revision:"337c9efc9e84b65cfe4b29fe0d909ab4"},{url:"xuan500.png",revision:"7afeb05055b35382431eeee9f3953d56"}],{})}));
//# sourceMappingURL=service-worker.js.map
addEventListener('message', (event) => {
  const replyPort = event.ports[0];
  const message = event.data;
  if (replyPort && message && message.type === 'skip-waiting')
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        (error) => replyPort.postMessage({ error })
      )
    );
});
