if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return a[e]||(s=new Promise((async s=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]}))},s=(s,a)=>{Promise.all(s.map(e)).then((e=>a(1===e.length?e[0]:e)))},a={require:Promise.resolve(s)};self.define=(s,i,r)=>{a[s]||(a[s]=Promise.resolve().then((()=>{let a={};const d={uri:location.origin+s.slice(1)};return Promise.all(i.map((s=>{switch(s){case"exports":return a;case"module":return d;default:return e(s)}}))).then((e=>{const s=r(...e);return a.default||(a.default=s),a}))})))}}define("./service-worker.js",["./workbox-c81aca33"],(function(e){"use strict";e.setCacheNameDetails({prefix:"mr-hope"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"assets/css/0.styles.ad84c200.css",revision:"1f61e4bda9d933490cc0fd152d529c62"},{url:"assets/img/danger-dark.7b1d6aa1.svg",revision:"7b1d6aa1bdcf013d0edfe316ab770f8e"},{url:"assets/img/danger.b143eda2.svg",revision:"b143eda243548a9982491dca4c81eed5"},{url:"assets/img/default-skin.b257fa9c.svg",revision:"b257fa9c5ac8c515ac4d77a667ce2943"},{url:"assets/img/info-dark.f8a43cf6.svg",revision:"f8a43cf67fa96a27a078530a3a43253c"},{url:"assets/img/info.88826912.svg",revision:"88826912d81d91c9e2d03164cd1481a1"},{url:"assets/img/search.83621669.svg",revision:"83621669651b9a3d4bf64d1a670ad856"},{url:"assets/img/tip-dark.075a244c.svg",revision:"075a244c83d1403c167defe81b4d7fe7"},{url:"assets/img/tip.a2b80aa5.svg",revision:"a2b80aa50b769a26da12fe352322a657"},{url:"assets/img/warning-dark.aac7e30c.svg",revision:"aac7e30c5fafc6748e21f7a9ef546698"},{url:"assets/img/warning.ec428b6d.svg",revision:"ec428b6d6d45ac5d0c610f08d757f40f"},{url:"assets/js/49.2af8ec61.js",revision:"d61f81ccfd39c94d05823358ac5cd742"},{url:"assets/js/app.e39fe76d.js",revision:"c5557f76c92ce94b827b2dcb945f7070"},{url:"assets/js/layout-Blog.c37145a7.js",revision:"fa61ab204c00703a204667a02fa69ab8"},{url:"assets/js/layout-Layout.b4200875.js",revision:"995ba9f88837085a9574a13b7727a60e"},{url:"assets/js/layout-NotFound.d2e6cd08.js",revision:"77c5063e75d60cda5a482acf9041cb91"},{url:"assets/js/layout-Slide.458b6fe8.js",revision:"519bbd7c2bc1acd71739eecb53357cb2"},{url:"assets/js/page-applicative.529caf07.js",revision:"c20ce8d45c02f36a11d921a96994a80b"},{url:"assets/js/page-Blob.be432f93.js",revision:"59d3039729ee282d4e75cd8e59bba126"},{url:"assets/js/page-ConcurrentModefiber.4275c67c.js",revision:"8b8675094a43789430eeacded5d4dcfd"},{url:"assets/js/page-createAppmount.43360d73.js",revision:"76506531ad8efbed6414da160232bba1"},{url:"assets/js/page-createElementrender.92da3635.js",revision:"41726e4e755f21922d4351c88a96c8b7"},{url:"assets/js/page-effect.f17deb92.js",revision:"b52b7317c6746ce930205358d364a6ae"},{url:"assets/js/page-handlers.97499341.js",revision:"f8a534b6401afb57eef8db2b595f5422"},{url:"assets/js/page-koa.a7a3ee1e.js",revision:"f00c034fb363e4e53f886577f1ecf118"},{url:"assets/js/page-monad.5a49c650.js",revision:"eee82a0ec46f1b4ab310018aa61b1de8"},{url:"assets/js/page-Observable.abb070cd.js",revision:"7d50a85083163ea8862b816445e5c7af"},{url:"assets/js/page-react-redux.3d5326d6.js",revision:"be9fef76fc918ead2c3e035c18b3116d"},{url:"assets/js/page-reactive.5d48f69c.js",revision:"c4141f0daf6db33caefb02299b4bfd9e"},{url:"assets/js/page-reactiveeffect.e1be89d9.js",revision:"16b386012992a9f6cabb0b57a1fdadb8"},{url:"assets/js/page-reconciliation.bdd2796f.js",revision:"c1037f4f29c20363c2130f981af7597b"},{url:"assets/js/page-redux-observable源码解读.968ab004.js",revision:"3f069822ccecba26c0d06b1833ee3ea9"},{url:"assets/js/page-redux.e249e807.js",revision:"8b130973ea88cc3c986b4844ed95d642"},{url:"assets/js/page-rendercommit.8db155fb.js",revision:"b8d30a14a4d283573cecd9d2b91ce381"},{url:"assets/js/page-rxjs-hooks源码解读.a0f79047.js",revision:"b3f04582ad5b3c7564665de595a6227d"},{url:"assets/js/page-TS奇怪的符号.0a8affbf.js",revision:"2bf1d635d227dfcd5ce8a04bf1b39546"},{url:"assets/js/page-useState.c1985379.js",revision:"b5271eb76b06c3b24f16bdfa37e6f6ed"},{url:"assets/js/page-webpack.d462b658.js",revision:"8a2adeaa45cc4356c436247c837a1059"},{url:"assets/js/page-websecurity.7c82b04f.js",revision:"f5e8d8c02b4e29c4b1635deb12cd646e"},{url:"assets/js/page-二叉树.8341023c.js",revision:"eeef6b17dd730d033f02179c2b50e532"},{url:"assets/js/page-函子.99f8ebe4.js",revision:"81c80859ab78c01892a7b3e543e50481"},{url:"assets/js/page-函子之间的转换.47003c59.js",revision:"ea77ac93dd6cf46678e26b09a15f8ea2"},{url:"assets/js/page-函数式编程.9e3f9d27.js",revision:"e11238486cdec7b140e15894cc69e56f"},{url:"assets/js/page-函数的组合.5228bfe6.js",revision:"bd1ab172150d8c9f2f9c52873e407d14"},{url:"assets/js/page-函数组件.acd84ddd.js",revision:"3e500cd6aff07349925d791ddd60c0ca"},{url:"assets/js/page-函数输入处理.ccf85813.js",revision:"97ffa15d8eb19666c2983a8fafd3e103"},{url:"assets/js/page-并查集.41c76fc5.js",revision:"d645007c05b09deb2fef9ccfeee12f60"},{url:"assets/js/page-快速排序.cad0b591.js",revision:"37b62ff8bb0ae7ae313a072d18020425"},{url:"assets/js/page-数据结构与算法.9424a4ab.js",revision:"56bdc3746ab124729cb79535fcc2f96b"},{url:"assets/js/page-文件上传.665192d6.js",revision:"b64fd6ae85e40c72312d53207937d987"},{url:"assets/js/page-组件渲染的细节.8248928d.js",revision:"ead66719cc111ace8578eacce122c82a"},{url:"assets/js/page-递归与栈.9832c4ce.js",revision:"08547f35e11d1c6bb98b592c04f0e66b"},{url:"assets/js/page-链表.ff84abfd.js",revision:"acebf76d185142226ba2f4aae07c81d9"},{url:"assets/js/page-队列.edd4b682.js",revision:"9bbcf671715b180c75a3951815b3b806"},{url:"assets/js/page-首页.0d9c0e31.js",revision:"146422e0814d3c349a12568bba5093c1"},{url:"assets/js/vendors~layout-Blog~layout-Layout.a1c8dc1e.js",revision:"5412733d0838a3bce7567bf37fd44fd9"},{url:"assets/js/vendors~layout-Blog~layout-Layout~layout-NotFound.e62bb3bf.js",revision:"f172b089675eb9fa8d299bd2ac9d7f58"},{url:"assets/js/vendors~layout-Blog~layout-Layout~layout-NotFound~layout-Slide.849229b1.js",revision:"4b3a8eec6e244c7d66d2994b417941d2"},{url:"assets/js/vendors~photo-swipe.5a54ac69.js",revision:"6a0f76422970a148ba250039b67818cd"},{url:"assets/js/vendors~valine.16736b3f.js",revision:"de7a534a60e8b83a64a9348e7f53d319"},{url:"images/mount.svg",revision:"4d261a4300529d26c2879309cf49d34b"},{url:"fonts/dm-italic.ttf",revision:"10740db6e2677134930eb75bf2686caf"},{url:"fonts/dm-regular.ttf",revision:"61b98688abb1cc31bc4a1eeb74f3ab01"},{url:"fonts/JetBrainsMono-Italic.ttf",revision:"8d0942fbfa63674fa465f104ca33e043"},{url:"fonts/JetBrainsMono-Regular.ttf",revision:"e1caef645de334fee2f25834b0d03c28"},{url:"fonts/汉仪旗黑50简.ttf",revision:"79781ea0063360f5ffed23d98954359f"},{url:"404.html",revision:"5548c9b5e78d65f2cf53dc84153500bc"},{url:"article/index.html",revision:"91be74d9d6a1ee26a6163deff5f45cc3"},{url:"category/index.html",revision:"93c6a8411cfdb70fccd94ef8cac726e2"},{url:"encrypt/index.html",revision:"6a38f7b053cc8b6e20504795b3cfeef0"},{url:"index.html",revision:"3a752cdb6c3571df904631bef0a2cd4d"},{url:"slide/index.html",revision:"9563786e5b596649a2541241a4424ac7"},{url:"star/index.html",revision:"9c3e243bade05ec74b640146d0c876f7"},{url:"tag/index.html",revision:"1cf643f437769814a5aad88c072b2277"},{url:"timeline/index.html",revision:"7b00ea5d77db70c0af56c297e7caa166"},{url:"views/algorithm/heap/index.html",revision:"395604bd67d7e2bb089378c917da2254"},{url:"views/algorithm/index.html",revision:"076875d194020eb04772e0623bfe8d3f"},{url:"views/algorithm/linked-list/index.html",revision:"8a6e8fe94b25808164c81a7434150fd1"},{url:"views/algorithm/queue/index.html",revision:"603d28fcf29562929fc29c32ceafe59a"},{url:"views/algorithm/quick-sort/index.html",revision:"877fc010252a90e0d8ebbe71a9852658"},{url:"views/algorithm/stack/index.html",revision:"b893d9449174b32aa7a4bbad8be886c4"},{url:"views/algorithm/tree/index.html",revision:"1a80fd60138e16bb9b60c12871cd7889"},{url:"views/algorithm/union-find/index.html",revision:"c7cfea408a490a0b764024bca9e89109"},{url:"views/functional/applicative/index.html",revision:"598f117e3e955e270e0fa7e695bd5bf5"},{url:"views/functional/compose/index.html",revision:"2c1abca3bece80f743d17e17dc47a42d"},{url:"views/functional/functor/index.html",revision:"9a8ba43186d72ac8a9ed40a24956b03d"},{url:"views/functional/index.html",revision:"f295316d9c51a7179234a70afd81742d"},{url:"views/functional/inputs/index.html",revision:"605d848bada2f459ddbae2ab2619bc61"},{url:"views/functional/monad/index.html",revision:"9f51574962164678b95fefda11187132"},{url:"views/functional/rxjs/index.html",revision:"4a6d7d9f8c73db812db65ee19c568ca7"},{url:"views/functional/transform/index.html",revision:"d300e6e871bef07df33509b345ae2278"},{url:"views/JS/index.html",revision:"f67f7a03a3e18156b6fc63a63ed0086a"},{url:"views/JS/security/index.html",revision:"04df489494c1920b4ccc701342d8d780"},{url:"views/JS/ts/index.html",revision:"9e77386688219b84ef039d5435f2a37a"},{url:"views/JS/upload/index.html",revision:"7856a4af4a8eef8dd61ecfb4fa52026d"},{url:"views/JS/webpack/index.html",revision:"bc2e76685b2628cda645d92339f90c84"},{url:"views/others/redux-observable/index.html",revision:"0c1936f69087d77440768cecf0c37456"},{url:"views/others/rxjs-hooks/index.html",revision:"8c47a63fbd119e23a8c0aa83e1aebd09"},{url:"views/owner-koa/index.html",revision:"72ed3d80dbb4143cf000f35c8e59aaec"},{url:"views/owner-react/fiber/index.html",revision:"e921e7ce953ca4e316822e5d56fb34b6"},{url:"views/owner-react/functionComponent/index.html",revision:"cdd67c061248a8432ba92ae736a62e98"},{url:"views/owner-react/index.html",revision:"6ae65b4982bf48c025fbbd26398ede2c"},{url:"views/owner-react/reconciliation/index.html",revision:"973f4a6cfb3683b95fb2deb176566adb"},{url:"views/owner-react/render&commit/index.html",revision:"2d82b5d0d55d9edb578ab8b27fb29f82"},{url:"views/owner-react/useState/index.html",revision:"d3f85072fbb59c1384502ec14c1deefc"},{url:"views/owner-redux/index.html",revision:"34bffec4b10c61c502968824dfb45153"},{url:"views/owner-redux/react-redux/index.html",revision:"592e2dd4490f8c56ceaf091f89cc682b"},{url:"views/owner-vue-next/createApp&mount/index.html",revision:"4fd86219be8cacfc5b6dfe8a11c65baa"},{url:"views/owner-vue-next/index.html",revision:"0832253fdac8d61c7b39a31e95c2ff48"},{url:"views/vue-next/componentDetail/index.html",revision:"8e5d575d0543fc6ea0d8304653e47a1e"},{url:"views/vue-next/createApp&mount/index.html",revision:"4a0dc587e8c60cb0af5621649b67d9d8"},{url:"views/vue-next/effect/index.html",revision:"70af500688452302205675852b9bd154"},{url:"views/vue-next/handler/index.html",revision:"0dcaae2605f7450782d3636e27e4b23a"},{url:"views/vue-next/reactive/index.html",revision:"723f5cd00de94cfa88187fe0785c4cf5"}],{}),e.cleanupOutdatedCaches()}));
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
