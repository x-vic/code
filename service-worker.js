if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return a[e]||(s=new Promise(async s=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=s}else importScripts(e),s()})),s.then(()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]})},s=(s,a)=>{Promise.all(s.map(e)).then(e=>a(1===e.length?e[0]:e))},a={require:Promise.resolve(s)};self.define=(s,f,i)=>{a[s]||(a[s]=Promise.resolve().then(()=>{let a={};const d={uri:location.origin+s.slice(1)};return Promise.all(f.map(s=>{switch(s){case"exports":return a;case"module":return d;default:return e(s)}})).then(e=>{const s=i(...e);return a.default||(a.default=s),a})}))}}define("./service-worker.js",["./workbox-1bbb3e0e"],(function(e){"use strict";self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:"404.html",revision:"5caea0d9d2649ac78176698e69cc2e17"},{url:"article/index.html",revision:"2e9423a1ccec063ad559c10df3ea4678"},{url:"assets/css/0.styles.7089c2ff.css",revision:"4e1b982e210ac1cb017c7cc9b806d6d9"},{url:"assets/fonts/KaTeX_AMS-Regular.2dbe16b4.ttf",revision:"2dbe16b4f4662798159f8d62c8d2509d"},{url:"assets/fonts/KaTeX_AMS-Regular.38a68f7d.woff2",revision:"38a68f7d18d292349a6e802a66136eae"},{url:"assets/fonts/KaTeX_AMS-Regular.7d307e83.woff",revision:"7d307e8337b9559e4040c5fb76819789"},{url:"assets/fonts/KaTeX_Caligraphic-Bold.33d26881.ttf",revision:"33d26881e4dd89321525c43b993f136c"},{url:"assets/fonts/KaTeX_Caligraphic-Regular.5e7940b4.ttf",revision:"5e7940b4ed250e98a512f520e39c867d"},{url:"assets/fonts/KaTeX_Fraktur-Bold.4de87d40.woff",revision:"4de87d40f0389255d975c69d45a0a7e7"},{url:"assets/fonts/KaTeX_Fraktur-Bold.7a3757c0.woff2",revision:"7a3757c0bfc580d91012d092ec8f06cb"},{url:"assets/fonts/KaTeX_Fraktur-Bold.ed330126.ttf",revision:"ed330126290a846bf0bb78f61aa6a080"},{url:"assets/fonts/KaTeX_Fraktur-Regular.450cc4d9.woff2",revision:"450cc4d9319c4a438dd00514efac941b"},{url:"assets/fonts/KaTeX_Fraktur-Regular.82d05fe2.ttf",revision:"82d05fe2abb0da9d1077110efada0f6e"},{url:"assets/fonts/KaTeX_Fraktur-Regular.dc4e330b.woff",revision:"dc4e330b6334767a16619c60d9ebce8c"},{url:"assets/fonts/KaTeX_Main-Bold.2e1915b1.ttf",revision:"2e1915b1a2f33c8ca9d1534193e934d7"},{url:"assets/fonts/KaTeX_Main-Bold.62c69756.woff",revision:"62c69756b3f1ca7b52fea2bea1030cd2"},{url:"assets/fonts/KaTeX_Main-Bold.78b0124f.woff2",revision:"78b0124fc13059862cfbe4c95ff68583"},{url:"assets/fonts/KaTeX_Main-BoldItalic.0d817b48.ttf",revision:"0d817b487b7fc993bda7dddba745d497"},{url:"assets/fonts/KaTeX_Main-BoldItalic.a2e3dcd2.woff",revision:"a2e3dcd2316f5002ee2b5f35614849a8"},{url:"assets/fonts/KaTeX_Main-BoldItalic.c7213ceb.woff2",revision:"c7213ceb79250c2ca46cc34ff3b1aa49"},{url:"assets/fonts/KaTeX_Main-Italic.081073fd.woff",revision:"081073fd6a7c66073ad231db887de944"},{url:"assets/fonts/KaTeX_Main-Italic.767e06e1.ttf",revision:"767e06e1df6abd16e092684bffa71c38"},{url:"assets/fonts/KaTeX_Main-Italic.eea32672.woff2",revision:"eea32672f64250e9d1dfb68177c20a26"},{url:"assets/fonts/KaTeX_Main-Regular.689bbe6b.ttf",revision:"689bbe6b67f22ffb51b15cc6cfa8facf"},{url:"assets/fonts/KaTeX_Main-Regular.756fad0d.woff",revision:"756fad0d6f3dff1062cfa951751d744c"},{url:"assets/fonts/KaTeX_Main-Regular.f30e3b21.woff2",revision:"f30e3b213e9a74cf7563b0c3ee878436"},{url:"assets/fonts/KaTeX_Math-BoldItalic.753ca3df.woff2",revision:"753ca3dfa44302604bec8e08412ad1c1"},{url:"assets/fonts/KaTeX_Math-BoldItalic.b3e80ff3.woff",revision:"b3e80ff3816595ffb07082257d30b24f"},{url:"assets/fonts/KaTeX_Math-BoldItalic.d9377b53.ttf",revision:"d9377b53f267ef7669fbcce45a74d4c7"},{url:"assets/fonts/KaTeX_Math-Italic.0343f93e.ttf",revision:"0343f93ed09558b81aaca43fc4386462"},{url:"assets/fonts/KaTeX_Math-Italic.2a39f382.woff2",revision:"2a39f3827133ad0aeb2087d10411cbf2"},{url:"assets/fonts/KaTeX_Math-Italic.67710bb2.woff",revision:"67710bb2357b8ee5c04d169dc440c69d"},{url:"assets/fonts/KaTeX_SansSerif-Bold.59b37733.woff2",revision:"59b3773389adfb2b21238892c08322ca"},{url:"assets/fonts/KaTeX_SansSerif-Bold.dfcc59ad.ttf",revision:"dfcc59ad994a0513b07ef3309b8b5159"},{url:"assets/fonts/KaTeX_SansSerif-Bold.f28c4fa2.woff",revision:"f28c4fa28f596796702fea3716d82052"},{url:"assets/fonts/KaTeX_SansSerif-Italic.3ab5188c.ttf",revision:"3ab5188c9aadedf425ea63c6b6568df7"},{url:"assets/fonts/KaTeX_SansSerif-Italic.99ad93a4.woff2",revision:"99ad93a4600c7b00b961d70943259032"},{url:"assets/fonts/KaTeX_SansSerif-Italic.9d0fdf5d.woff",revision:"9d0fdf5d7d27b0e3bdc740d90b40ec57"},{url:"assets/fonts/KaTeX_SansSerif-Regular.6c3bd5b5.woff",revision:"6c3bd5b57f7eba215a2d37e2e28077f1"},{url:"assets/fonts/KaTeX_SansSerif-Regular.badf3598.woff2",revision:"badf3598c22478fd9155a49391ecd396"},{url:"assets/fonts/KaTeX_SansSerif-Regular.d511ebce.ttf",revision:"d511ebcef253ab53775576f28315f350"},{url:"assets/fonts/KaTeX_Script-Regular.082640ca.ttf",revision:"082640ca4242bb2aade86855e4d7d5f6"},{url:"assets/fonts/KaTeX_Script-Regular.4edf4e0f.woff",revision:"4edf4e0fd49c8a5680dd541c05f16a4c"},{url:"assets/fonts/KaTeX_Script-Regular.af7bc98b.woff2",revision:"af7bc98b2200573686405dc784f53cf2"},{url:"assets/fonts/KaTeX_Size1-Regular.2c2dc3b0.ttf",revision:"2c2dc3b057bb48b80bc785ac3d87ecf8"},{url:"assets/fonts/KaTeX_Size2-Regular.114ad198.ttf",revision:"114ad19833311359052ad1a174159262"},{url:"assets/fonts/KaTeX_Size4-Regular.70174da7.ttf",revision:"70174da79d1707501c10e07872e84667"},{url:"assets/fonts/KaTeX_Typewriter-Regular.35fe2cce.ttf",revision:"35fe2cce0791c276b8e919decd873f5b"},{url:"assets/fonts/KaTeX_Typewriter-Regular.53dcf861.woff",revision:"53dcf861876aae6f3a6a6004dc3bc758"},{url:"assets/fonts/KaTeX_Typewriter-Regular.641339e2.woff2",revision:"641339e2cd86c7816bfb8028ee7f86e0"},{url:"assets/img/bulb.fa255ccc.svg",revision:"fa255cccbbef66519a1bb90a5bed6f24"},{url:"assets/img/danger.950d1128.svg",revision:"950d1128cc862f2b631f5d54c3458174"},{url:"assets/img/default-skin.b257fa9c.svg",revision:"b257fa9c5ac8c515ac4d77a667ce2943"},{url:"assets/img/homeImage.56f13b5d.jpg",revision:"56f13b5d598a4feab49dd969ac9fd2ff"},{url:"assets/img/info.b3407763.svg",revision:"b3407763d94949efc3654309e9a2202f"},{url:"assets/img/search.83621669.svg",revision:"83621669651b9a3d4bf64d1a670ad856"},{url:"assets/img/stop.6e8b05e0.svg",revision:"6e8b05e040e31db4b52092926ac89628"},{url:"assets/js/38.a7bad881.js",revision:"bd4779875717de22f857f45da67ef1a3"},{url:"assets/js/app.5b9a5e0c.js",revision:"0d374ee158226025c640c44c14e52d76"},{url:"assets/js/layout-Blog.0f23f277.js",revision:"9ea24858f25118a2204a098eee9fd2e5"},{url:"assets/js/layout-Layout.6f4f8ad5.js",revision:"e4aa8f986af220b96695620ad87e6aa9"},{url:"assets/js/layout-NotFound.3746d7e4.js",revision:"266e7c509f56eb2274ad37b43ef4ff4c"},{url:"assets/js/page-applicative--d5fd60f2.fedcd1a6.js",revision:"88cbab2e1edce091bdcfb4006e2f1e15"},{url:"assets/js/page-Blob--8636b6e0.be111e22.js",revision:"e40f56462fb5b30fd4a21bd3c695fc9e"},{url:"assets/js/page-ConcurrentModefiber--428f0236.4e9b06fe.js",revision:"d99da2c0bfc70844d84bcdc0233be69a"},{url:"assets/js/page-createAppmount--59c6962e.d003d601.js",revision:"2e637a4450881daf60474d0c89499422"},{url:"assets/js/page-createAppmount--5f0774b5.39f1f9c0.js",revision:"83e081b1b606bb727037504c23de1fb0"},{url:"assets/js/page-createElementrender--4e0fce44.1dbf0a15.js",revision:"f8837ff8a8464a585911997d1e2510c1"},{url:"assets/js/page-effect--c37ff3b6.ee80f944.js",revision:"11ebbd7d78d80af59471c7d87ab216a7"},{url:"assets/js/page-handlers代理方法--71d35776.6f55d746.js",revision:"d686914521fc9e17937aa072ecaf6199"},{url:"assets/js/page-koa--0da4005e.2d5479ba.js",revision:"dddca3e649d2d58717d2a30dd04f929c"},{url:"assets/js/page-monad--42efab29.361a3d6d.js",revision:"dbf4154125906207856e88d39cac918b"},{url:"assets/js/page-Observable--73755485.6b723532.js",revision:"8da913f8b4d33ba2e77e63e4a67e98b0"},{url:"assets/js/page-react-redux--476f3c76.ebe56c1b.js",revision:"3ee535169cd7dd06463b9149140c2ce6"},{url:"assets/js/page-reactive--9fc44336.cb75de20.js",revision:"9068e137704a1882b57ac732af7f4868"},{url:"assets/js/page-reactiveeffect--5bf69d3a.db55d2ae.js",revision:"74f195c82e2682d26bd2c871146cb6fe"},{url:"assets/js/page-reconciliation--52aa2555.e6a9414f.js",revision:"759c5fa0d2bf3bcd2fb5895feb4a4d80"},{url:"assets/js/page-redux--6dd09404.1a2ac248.js",revision:"23193034b2398cadc803bdfaa1c4880d"},{url:"assets/js/page-rendercommit--7f6091c5.fffa686d.js",revision:"d3b9fc2a046ed87ce3329c152d301ce3"},{url:"assets/js/page-useState--60c92407.94068b6f.js",revision:"f80305a529365b84112f5b4e79108c19"},{url:"assets/js/page-webpack--740e8bbe.a91c3639.js",revision:"7bbddfcc16d5a6d133c49f55e31e58be"},{url:"assets/js/page-websecurity--26872ba5.bada9edd.js",revision:"81067a21f65e0b5ae05d9e6220be39f1"},{url:"assets/js/page-函子--e5be893e.c8bf6a6f.js",revision:"4743f550280a1da3e52abc14dc6455c5"},{url:"assets/js/page-函子之间的转换--513f68a2.a5e659df.js",revision:"ac351d9376ebf9dd8506ddea004dfcc2"},{url:"assets/js/page-函数式编程--37b59b1c.3d9f4265.js",revision:"7e76673b63b653bffd875a1a98fc06ee"},{url:"assets/js/page-函数的组合--60414ba3.e815cc6b.js",revision:"004381f8f567be62ba589efa3aa11778"},{url:"assets/js/page-函数组件--2406c685.6be1d1c9.js",revision:"e42c736ff1c125fb716c5d0378b5e956"},{url:"assets/js/page-函数输入处理--151f0a76.399a1078.js",revision:"9bd62eff963a3297510fefe2ce4d3b10"},{url:"assets/js/page-文件上传--f74d7bf6.142b170c.js",revision:"2a72251878b141876ec32ddcc16f5f1b"},{url:"assets/js/page-组件渲染的细节--21758d7d.4cf5e75a.js",revision:"affdd5c071ea5c6ac1243dc9d5d63800"},{url:"assets/js/page-首页--8fc477d4.b7b2d8b9.js",revision:"b1f305b79340d531da2475f66527cae6"},{url:"assets/js/vendors~flowchart.ff668447.js",revision:"8e54cd14aaf26b4b955daae4a5c501a6"},{url:"assets/js/vendors~layout-Blog~layout-Layout.ba79eb83.js",revision:"94266dfb2693ea917406a5bacb438142"},{url:"assets/js/vendors~layout-Blog~layout-Layout~layout-NotFound.511eecb5.js",revision:"9ff0d8d3fdb4069f56fdc11d1fa579fe"},{url:"assets/js/vendors~layout-Layout.12ec7729.js",revision:"a24e9a0fd53f4ff4b4d17f170db7c227"},{url:"category/index.html",revision:"5fe27716dd7e56a423a94b8973c578f2"},{url:"fonts/dm-italic.ttf",revision:"10740db6e2677134930eb75bf2686caf"},{url:"fonts/dm-regular.ttf",revision:"61b98688abb1cc31bc4a1eeb74f3ab01"},{url:"fonts/JetBrainsMono-Italic.ttf",revision:"8d0942fbfa63674fa465f104ca33e043"},{url:"fonts/JetBrainsMono-Regular.ttf",revision:"e1caef645de334fee2f25834b0d03c28"},{url:"fonts/汉仪旗黑50简.ttf",revision:"79781ea0063360f5ffed23d98954359f"},{url:"images/fiber.png",revision:"63a7f41b95f8f623b411cec105258d7b"},{url:"images/mount.svg",revision:"4d261a4300529d26c2879309cf49d34b"},{url:"index.html",revision:"239176a25bb916030f2095d90f12467d"},{url:"logo/logo200.png",revision:"dfc1cca5e2fec86474f3fc9a1b6a6c8b"},{url:"logo/logo500.png",revision:"8d1c3a2d6acd1ad3bc704027fd3606e6"},{url:"tag/index.html",revision:"cfb27eb740caa102bd12d3d33832ede8"},{url:"timeline/index.html",revision:"3ee6d5cf095ccc78c29ef913b7a01615"},{url:"views/functional/applicative/index.html",revision:"28b5776f1297cd7a37d4ba50c0f8e815"},{url:"views/functional/compose/index.html",revision:"4364a22cf12d3b1bf9da27f71399b34a"},{url:"views/functional/functor/index.html",revision:"7de02047822388f5e39214a30b6f4a62"},{url:"views/functional/index.html",revision:"8d19adb5cd47031fe887756a5f1de596"},{url:"views/functional/inputs/index.html",revision:"d0c5f33dd49c3758e72313495ff825d8"},{url:"views/functional/monad/index.html",revision:"1ab6247a398b09fabfc8299bf043e171"},{url:"views/functional/rxjs/index.html",revision:"58ec554fa18963e2c55c21db97a837c8"},{url:"views/functional/transform/index.html",revision:"d204d1fe77c6849b80eb9a2ef9046019"},{url:"views/JS/index.html",revision:"6aaac78f229373bed494a0448e243cba"},{url:"views/JS/security/index.html",revision:"46732aa14d4bbd3af148350688a40cd8"},{url:"views/JS/upload/index.html",revision:"9514dc999746bbd9139dc6da9940286c"},{url:"views/JS/webpack/index.html",revision:"25be888735408b554b5ebf9d4ede99ba"},{url:"views/owner-koa/index.html",revision:"98f28345b98d03f83aec2452409c9a69"},{url:"views/owner-react/fiber/index.html",revision:"f09412847f71ebd7568086f33e839e34"},{url:"views/owner-react/functionComponent/index.html",revision:"5bdd806a823a3293fa37924bd7147e94"},{url:"views/owner-react/index.html",revision:"1fe501043140ce99b8fc881805c73fa1"},{url:"views/owner-react/reconciliation/index.html",revision:"e238d6b6e939dd01ec52dbca42279158"},{url:"views/owner-react/render&commit/index.html",revision:"75158a35d82b070d83972eaee0e118e5"},{url:"views/owner-react/useState/index.html",revision:"eed7acb171b27886d0cbc5e31b4dca64"},{url:"views/owner-redux/index.html",revision:"1481fe39a5516eb56d858ed8e2e54a55"},{url:"views/owner-redux/react-redux/index.html",revision:"b0ed2bb2337c084ed9b3c2b65a01b869"},{url:"views/owner-vue-next/createApp&mount/index.html",revision:"09eaa3fdafb000a340141373b8e73191"},{url:"views/owner-vue-next/index.html",revision:"f6537cdd75037e88ea4540aa771572e3"},{url:"views/vue-next/componentDetail/index.html",revision:"2f75e4bf919a003b9d4a7c6a6c757633"},{url:"views/vue-next/createApp&mount/index.html",revision:"f65dbbec46a446fc4011a80ab6251b62"},{url:"views/vue-next/effect/index.html",revision:"e22e4177176de408b0a8e0ed62d66f42"},{url:"views/vue-next/handler/index.html",revision:"fce72face00f68cb1fa80e960e2c4eec"},{url:"views/vue-next/reactive/index.html",revision:"42f51e72f353cbee8f7db286b0952d5e"},{url:"xuan200.png",revision:"337c9efc9e84b65cfe4b29fe0d909ab4"},{url:"xuan500.png",revision:"7afeb05055b35382431eeee9f3953d56"}],{})}));
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
