if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,d)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let c={};const f=e=>a(e,r),b={module:{uri:r},exports:c,require:f};s[r]=Promise.all(i.map((e=>b[e]||f(e)))).then((e=>(d(...e),c)))}}define(["./workbox-ebf2f394"],(function(e){"use strict";e.setCacheNameDetails({prefix:"mr-hope"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"assets/css/0.styles.2fe94748.css",revision:"6abe6a8915f3fad8bdc70b9364614864"},{url:"assets/img/danger-dark.86c63c40.svg",revision:"86c63c4006d5cd5f860cdef57310696a"},{url:"assets/img/danger.1c7d8a0f.svg",revision:"1c7d8a0f45b8bee5d5b92334a16e2711"},{url:"assets/img/default-skin.b257fa9c.svg",revision:"b257fa9c5ac8c515ac4d77a667ce2943"},{url:"assets/img/info-dark.a1decb69.svg",revision:"a1decb69db82fb8eebb48704dd74e649"},{url:"assets/img/info.6f2cfedb.svg",revision:"6f2cfedb8e6d19d1b24eb73943f7ff4e"},{url:"assets/img/note-dark.8668720f.svg",revision:"8668720f2e50ebd01173f11a89d9da6e"},{url:"assets/img/note.32319b2e.svg",revision:"32319b2e9c86860d8a4f1c8f660096cb"},{url:"assets/img/search.83621669.svg",revision:"83621669651b9a3d4bf64d1a670ad856"},{url:"assets/img/tip-dark.0d0028db.svg",revision:"0d0028db13caec45ac1527d8b673fae0"},{url:"assets/img/tip.a9004be5.svg",revision:"a9004be5a8a5a83cc9c77bba88c816ff"},{url:"assets/img/warning-dark.b995cb45.svg",revision:"b995cb45fa552ac10ad35fa7716af15b"},{url:"assets/img/warning.57a43d6d.svg",revision:"57a43d6dcdee07d8db78a5dd3d6137ba"},{url:"assets/js/54.49bf894c.js",revision:"047c540544348003f9b170f8a9750625"},{url:"assets/js/55.b61c8fae.js",revision:"5b70891b419f23fbfbe58b2c1e144ff1"},{url:"assets/js/app.65586b9a.js",revision:"e1ca7961ced1a9dd256faf161e5db62a"},{url:"assets/js/layout-Blog.3f3ac00a.js",revision:"b5170f996a7288b52f3c1b8b387a8af3"},{url:"assets/js/layout-Layout.85d11602.js",revision:"e5b24bf52e3169e1f19f8d202283945f"},{url:"assets/js/layout-NotFound.e5930aa5.js",revision:"739d25ca47940fb353d594e758c742d3"},{url:"assets/js/layout-Slide.289c7a8a.js",revision:"8455a7448ae54a31a3ec8d9a91fdde05"},{url:"assets/js/page-applicative.5ada8084.js",revision:"31ec76b79f427b4e01a7be183ada21a2"},{url:"assets/js/page-Blob.bbc55af6.js",revision:"400cbb73f1e2175800b2392b106b455e"},{url:"assets/js/page-ConcurrentModefiber.3ffa417d.js",revision:"74e8abbb40d0ba4c0de8596f9afcee73"},{url:"assets/js/page-createAppmount.d797ce78.js",revision:"aeceae990691b95188e89d7d5e9376c8"},{url:"assets/js/page-createElementrender.c5484eea.js",revision:"a050c1ecc253d235ed1a22f07be3f4d0"},{url:"assets/js/page-effect.b3466295.js",revision:"3bd0eb3cd4d1b7326c5327bc362c8cfa"},{url:"assets/js/page-handlers.c8d73fdf.js",revision:"697da04a93783ba19eabc800423fa144"},{url:"assets/js/page-koa.28205977.js",revision:"5defba873b588272252241424f6eb3f6"},{url:"assets/js/page-monad.81405dfd.js",revision:"b85ded9972673e11b8eb1ebd91482a81"},{url:"assets/js/page-Observable.4ce0abc6.js",revision:"eee2a90f6c353900d0c5342d5f2e524d"},{url:"assets/js/page-react-redux.588a9bc9.js",revision:"55399f2e3deaa7f031f8cb9f7fe9612c"},{url:"assets/js/page-reactive.2500de37.js",revision:"9d9a7aae014a599649bfed07ab477806"},{url:"assets/js/page-reactiveeffect.9188c0d6.js",revision:"8af6035dfcd78ef3f16b20f1ad00d19b"},{url:"assets/js/page-reconciliation.59df08bd.js",revision:"cb10dc42ec8a0ca69d40019c3ba69102"},{url:"assets/js/page-redux-observable源码解读.b1865e1f.js",revision:"61418f9705f5c5c32a1af69136e6d662"},{url:"assets/js/page-redux.6c35d584.js",revision:"8dbff96ddea65164723b5f346a176c27"},{url:"assets/js/page-rendercommit.eaf15b03.js",revision:"234135091cbe3a3da75c65337c222e2e"},{url:"assets/js/page-rxjs-hooks源码解读.d4407b5f.js",revision:"d74f0bb2b8121b4323c3d9889f5db3b5"},{url:"assets/js/page-TS奇怪的符号.ea37c4a6.js",revision:"2d105a7af8a4e51ead624020879f0e7f"},{url:"assets/js/page-useState.6d46e5af.js",revision:"6c818f5ba8719aadf93317e0555b49cf"},{url:"assets/js/page-webpack.23aebd52.js",revision:"fd4eee6eb6808e89543f7e546da81c91"},{url:"assets/js/page-websecurity.dd3d7f16.js",revision:"e029a4e0ee2979edc1e7c280f7590de6"},{url:"assets/js/page-二分搜索.e5a34300.js",revision:"07616e2cba8f5da3f5bf5feeb880ccb4"},{url:"assets/js/page-二叉树.64805b57.js",revision:"e373dbb6311608dd062d9666e482439c"},{url:"assets/js/page-函子.8b36e924.js",revision:"8944fa27645c11ad3b153702c50f1109"},{url:"assets/js/page-函子之间的转换.42a1e22e.js",revision:"9ea11e8c76bd5d624112fbd7d66f1808"},{url:"assets/js/page-函数式编程.47e79665.js",revision:"90d2d55447397fe0ef2a1225fbb50e3b"},{url:"assets/js/page-函数的组合.08642b9b.js",revision:"1f6b8f10d76bb9afb28a7096a1d6f45a"},{url:"assets/js/page-函数组件.b28f5005.js",revision:"6c8ebb1e31ae0d4d90703342a43d131d"},{url:"assets/js/page-函数输入处理.2c2026a4.js",revision:"f9b04496f458005a74d3e150daf0b80e"},{url:"assets/js/page-动态规划.ad886d33.js",revision:"5587450dd394af3a68695c0d97eba479"},{url:"assets/js/page-哈希表.aea44e73.js",revision:"137562e65fe6bd0a39de51120829f28d"},{url:"assets/js/page-回溯法.287eaa76.js",revision:"492640564272b86521a65610e85d85b6"},{url:"assets/js/page-堆.7fe168ab.js",revision:"d86ebdc7a2f5fabe6541c38fae5c77d0"},{url:"assets/js/page-并查集.398ebb8b.js",revision:"7f9cf1fd554851195bb4f12f6a8ac29a"},{url:"assets/js/page-快速排序.6e7e64a3.js",revision:"8e2972ebd59809721d9574db5745aa9f"},{url:"assets/js/page-文件上传.cbab48a0.js",revision:"97fac7b370ccb67d548e5d432978efd0"},{url:"assets/js/page-深搜与广搜.b23ede43.js",revision:"0454fb4a495beb5990a553e9eff68144"},{url:"assets/js/page-组件渲染的细节.1098340a.js",revision:"bcdc54b8887081ab37c72f95f45bc6a1"},{url:"assets/js/page-递归与栈.729c62c5.js",revision:"f27941759e48cc081b0474fc72253eec"},{url:"assets/js/page-链表.359dbfc6.js",revision:"c3237cb6e2d92ed493bebc10a013f8e9"},{url:"assets/js/page-队列.1c3f5228.js",revision:"401c761bb60761f09fa1c820c4ee1509"},{url:"assets/js/page-首页.f558d560.js",revision:"b6bcc8207472dbe7885b594206c78004"},{url:"assets/js/vendors~layout-Blog~layout-Layout.ad93f520.js",revision:"445de2fc2d318da7822decb2c28fbbb7"},{url:"assets/js/vendors~layout-Blog~layout-Layout~layout-NotFound.fdd32cf9.js",revision:"50b87040e3d829b76c6559255e486a4c"},{url:"assets/js/vendors~layout-Layout.4dbd5cb9.js",revision:"0df312d523a7e747133e69a7e6cc5ce6"},{url:"assets/js/vendors~photo-swipe.364bdeca.js",revision:"0985eed87d96391682c02e815040677c"},{url:"assets/js/vendors~valine.9f1fc050.js",revision:"bcaa3284de9bca91e551ca684a3982a5"},{url:"images/mount.svg",revision:"4d261a4300529d26c2879309cf49d34b"},{url:"fonts/dm-italic.ttf",revision:"10740db6e2677134930eb75bf2686caf"},{url:"fonts/dm-regular.ttf",revision:"61b98688abb1cc31bc4a1eeb74f3ab01"},{url:"fonts/JetBrainsMono-Italic.ttf",revision:"8d0942fbfa63674fa465f104ca33e043"},{url:"fonts/JetBrainsMono-Regular.ttf",revision:"e1caef645de334fee2f25834b0d03c28"},{url:"fonts/汉仪旗黑50简.ttf",revision:"79781ea0063360f5ffed23d98954359f"},{url:"404.html",revision:"39bf562db41afbd3cfb4d37d746ec193"},{url:"article/index.html",revision:"5d064047230ca28c0e101fad250a6d90"},{url:"category/index.html",revision:"97d8a439f24a179e55b6f82c71d0877f"},{url:"encrypt/index.html",revision:"2740a635db6ba380be11bda1857415cd"},{url:"index.html",revision:"c1547b656168e40ec778889a2aad7cc9"},{url:"slide/index.html",revision:"08253a0014d78383f16b267e7c9ec12b"},{url:"star/index.html",revision:"fc5b45d0f8fbdcfa61cfd354b164b5b0"},{url:"tag/index.html",revision:"1f4eee89c9f6bfd905f7d5819d11dd7c"},{url:"timeline/index.html",revision:"318704696a2b7bc1a8179cca992a070f"},{url:"views/algorithm/bfs&dfs/index.html",revision:"33a444f2f16a27c2b15ee4a9c4cf1d58"},{url:"views/algorithm/binary-search/index.html",revision:"bb6d7b9fd10e37aad109263967c8b99c"},{url:"views/algorithm/dp/index.html",revision:"54d983d489a7c02532b9bb583dd29ccd"},{url:"views/algorithm/hash-table/index.html",revision:"eafcc2cd8d630282140dff6341170c13"},{url:"views/algorithm/heap/index.html",revision:"45a6bfe4606e72ea4420bf9d73962ff4"},{url:"views/algorithm/index.html",revision:"867802596079fa72d0e971c51abbf309"},{url:"views/algorithm/queue/index.html",revision:"2e0cfd9a2986c6d1f5b2405550e73dcd"},{url:"views/algorithm/quick-sort/index.html",revision:"bb5b043de7538451e2e83303bb25441b"},{url:"views/algorithm/reverse/index.html",revision:"a123d6556e986bddc227c1b997ecc00f"},{url:"views/algorithm/stack/index.html",revision:"6b804b938a3ce82f382c0d912a2eedfa"},{url:"views/algorithm/tree/index.html",revision:"37facc5922fcdfa7f88adebdc2db74d5"},{url:"views/algorithm/union-find/index.html",revision:"c93b99dbe01b2e5c488667d915c9edac"},{url:"views/functional/applicative/index.html",revision:"6090ea86c22da95d1679abd01769daea"},{url:"views/functional/compose/index.html",revision:"a5c576ebcc11aac9be718d9f64e723a2"},{url:"views/functional/functor/index.html",revision:"d7f8f91f2306ee6c1e33eaaa15580b64"},{url:"views/functional/index.html",revision:"35463ea481511e909d51a463094af7dc"},{url:"views/functional/inputs/index.html",revision:"d10cf023856f32a6ee8eb9167cbfb5f1"},{url:"views/functional/monad/index.html",revision:"e5a64c33d8e312060a2bbac86b7c82a4"},{url:"views/functional/rxjs/index.html",revision:"eab304c3b81f5f52251bb0820226cd56"},{url:"views/functional/transform/index.html",revision:"fb72ef6fdb817ea53db5e4a3b778e905"},{url:"views/JS/index.html",revision:"5fa59356fd05a82a9247cbe94208cc59"},{url:"views/JS/security/index.html",revision:"9a3c89e254811af92ed4c5fd67dc4ccd"},{url:"views/JS/ts/index.html",revision:"a751d815120dc37a9b7cffe5ac61bebe"},{url:"views/JS/upload/index.html",revision:"6fd15b0788f163a65cf31731182a875c"},{url:"views/JS/webpack/index.html",revision:"085082a3b234c2320e434ca6aff1b7da"},{url:"views/leetcode/dp/index.html",revision:"306f3f544a313b23044095ce22cd6913"},{url:"views/leetcode/index.html",revision:"d3169ab5ba0cc1997f4f9fc40e6bbe90"},{url:"views/others/redux-observable/index.html",revision:"a1117c70c86ce244f468d0dae054ae5a"},{url:"views/others/rxjs-hooks/index.html",revision:"56a9f8d9a7b724af051a4f379485a7b8"},{url:"views/owner-koa/index.html",revision:"241d40fce39adfed8a2d5b5cbc0398c2"},{url:"views/owner-react/fiber/index.html",revision:"eb3de3d9464f94794813fd4cc001ba35"},{url:"views/owner-react/functionComponent/index.html",revision:"a1e79e46f7c00f6e54bc64e97bad50e8"},{url:"views/owner-react/index.html",revision:"09b9bd7f5ab6c5fe1a9544c7545bb059"},{url:"views/owner-react/reconciliation/index.html",revision:"46edaa23e34bb28947c8b185236624aa"},{url:"views/owner-react/render&commit/index.html",revision:"143d70af7f092fecab750d9ea528e056"},{url:"views/owner-react/useState/index.html",revision:"cdbd8c0237fcdbd85ba7d3f9d6e822fe"},{url:"views/owner-redux/index.html",revision:"6b33e66d0087dce38cdf4f5626726896"},{url:"views/owner-redux/react-redux/index.html",revision:"2d9789cbc873cf220c21d19d16e70197"},{url:"views/owner-vue-next/createApp&mount/index.html",revision:"0200b0d5e09ac7134bdfaed044e86f4b"},{url:"views/owner-vue-next/index.html",revision:"fb27fac00184ada042443ae8b5dfe612"},{url:"views/vue-next/componentDetail/index.html",revision:"dc0e8af441817f84257fb9dbf579ffff"},{url:"views/vue-next/createApp&mount/index.html",revision:"38211ddef075ebded9917e26371eb49d"},{url:"views/vue-next/effect/index.html",revision:"ddf553c792becb3fc8f39a551f7595dd"},{url:"views/vue-next/handler/index.html",revision:"58ae6de4e65034515c0f5083ba661b6c"},{url:"views/vue-next/reactive/index.html",revision:"409cbdf3f8da95e6e908ec19d3d293ed"}],{}),e.cleanupOutdatedCaches()}));
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
