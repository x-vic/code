if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return a[e]||(s=new Promise(async s=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=s}else importScripts(e),s()})),s.then(()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]})},s=(s,a)=>{Promise.all(s.map(e)).then(e=>a(1===e.length?e[0]:e))},a={require:Promise.resolve(s)};self.define=(s,f,i)=>{a[s]||(a[s]=Promise.resolve().then(()=>{let a={};const r={uri:location.origin+s.slice(1)};return Promise.all(f.map(s=>{switch(s){case"exports":return a;case"module":return r;default:return e(s)}})).then(e=>{const s=i(...e);return a.default||(a.default=s),a})}))}}define("./service-worker.js",["./workbox-1bbb3e0e"],(function(e){"use strict";self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:"404.html",revision:"0bcf891ca93f459e788de28919870545"},{url:"article/index.html",revision:"9c0fed1f3a81f625ba1b1d4c66beda1a"},{url:"assets/css/0.styles.86f99165.css",revision:"30abe59149fc6a7a0c5161dfb04b63d7"},{url:"assets/fonts/KaTeX_AMS-Regular.2dbe16b4.ttf",revision:"2dbe16b4f4662798159f8d62c8d2509d"},{url:"assets/fonts/KaTeX_AMS-Regular.38a68f7d.woff2",revision:"38a68f7d18d292349a6e802a66136eae"},{url:"assets/fonts/KaTeX_AMS-Regular.7d307e83.woff",revision:"7d307e8337b9559e4040c5fb76819789"},{url:"assets/fonts/KaTeX_Caligraphic-Bold.33d26881.ttf",revision:"33d26881e4dd89321525c43b993f136c"},{url:"assets/fonts/KaTeX_Caligraphic-Regular.5e7940b4.ttf",revision:"5e7940b4ed250e98a512f520e39c867d"},{url:"assets/fonts/KaTeX_Fraktur-Bold.4de87d40.woff",revision:"4de87d40f0389255d975c69d45a0a7e7"},{url:"assets/fonts/KaTeX_Fraktur-Bold.7a3757c0.woff2",revision:"7a3757c0bfc580d91012d092ec8f06cb"},{url:"assets/fonts/KaTeX_Fraktur-Bold.ed330126.ttf",revision:"ed330126290a846bf0bb78f61aa6a080"},{url:"assets/fonts/KaTeX_Fraktur-Regular.450cc4d9.woff2",revision:"450cc4d9319c4a438dd00514efac941b"},{url:"assets/fonts/KaTeX_Fraktur-Regular.82d05fe2.ttf",revision:"82d05fe2abb0da9d1077110efada0f6e"},{url:"assets/fonts/KaTeX_Fraktur-Regular.dc4e330b.woff",revision:"dc4e330b6334767a16619c60d9ebce8c"},{url:"assets/fonts/KaTeX_Main-Bold.2e1915b1.ttf",revision:"2e1915b1a2f33c8ca9d1534193e934d7"},{url:"assets/fonts/KaTeX_Main-Bold.62c69756.woff",revision:"62c69756b3f1ca7b52fea2bea1030cd2"},{url:"assets/fonts/KaTeX_Main-Bold.78b0124f.woff2",revision:"78b0124fc13059862cfbe4c95ff68583"},{url:"assets/fonts/KaTeX_Main-BoldItalic.0d817b48.ttf",revision:"0d817b487b7fc993bda7dddba745d497"},{url:"assets/fonts/KaTeX_Main-BoldItalic.a2e3dcd2.woff",revision:"a2e3dcd2316f5002ee2b5f35614849a8"},{url:"assets/fonts/KaTeX_Main-BoldItalic.c7213ceb.woff2",revision:"c7213ceb79250c2ca46cc34ff3b1aa49"},{url:"assets/fonts/KaTeX_Main-Italic.081073fd.woff",revision:"081073fd6a7c66073ad231db887de944"},{url:"assets/fonts/KaTeX_Main-Italic.767e06e1.ttf",revision:"767e06e1df6abd16e092684bffa71c38"},{url:"assets/fonts/KaTeX_Main-Italic.eea32672.woff2",revision:"eea32672f64250e9d1dfb68177c20a26"},{url:"assets/fonts/KaTeX_Main-Regular.689bbe6b.ttf",revision:"689bbe6b67f22ffb51b15cc6cfa8facf"},{url:"assets/fonts/KaTeX_Main-Regular.756fad0d.woff",revision:"756fad0d6f3dff1062cfa951751d744c"},{url:"assets/fonts/KaTeX_Main-Regular.f30e3b21.woff2",revision:"f30e3b213e9a74cf7563b0c3ee878436"},{url:"assets/fonts/KaTeX_Math-BoldItalic.753ca3df.woff2",revision:"753ca3dfa44302604bec8e08412ad1c1"},{url:"assets/fonts/KaTeX_Math-BoldItalic.b3e80ff3.woff",revision:"b3e80ff3816595ffb07082257d30b24f"},{url:"assets/fonts/KaTeX_Math-BoldItalic.d9377b53.ttf",revision:"d9377b53f267ef7669fbcce45a74d4c7"},{url:"assets/fonts/KaTeX_Math-Italic.0343f93e.ttf",revision:"0343f93ed09558b81aaca43fc4386462"},{url:"assets/fonts/KaTeX_Math-Italic.2a39f382.woff2",revision:"2a39f3827133ad0aeb2087d10411cbf2"},{url:"assets/fonts/KaTeX_Math-Italic.67710bb2.woff",revision:"67710bb2357b8ee5c04d169dc440c69d"},{url:"assets/fonts/KaTeX_SansSerif-Bold.59b37733.woff2",revision:"59b3773389adfb2b21238892c08322ca"},{url:"assets/fonts/KaTeX_SansSerif-Bold.dfcc59ad.ttf",revision:"dfcc59ad994a0513b07ef3309b8b5159"},{url:"assets/fonts/KaTeX_SansSerif-Bold.f28c4fa2.woff",revision:"f28c4fa28f596796702fea3716d82052"},{url:"assets/fonts/KaTeX_SansSerif-Italic.3ab5188c.ttf",revision:"3ab5188c9aadedf425ea63c6b6568df7"},{url:"assets/fonts/KaTeX_SansSerif-Italic.99ad93a4.woff2",revision:"99ad93a4600c7b00b961d70943259032"},{url:"assets/fonts/KaTeX_SansSerif-Italic.9d0fdf5d.woff",revision:"9d0fdf5d7d27b0e3bdc740d90b40ec57"},{url:"assets/fonts/KaTeX_SansSerif-Regular.6c3bd5b5.woff",revision:"6c3bd5b57f7eba215a2d37e2e28077f1"},{url:"assets/fonts/KaTeX_SansSerif-Regular.badf3598.woff2",revision:"badf3598c22478fd9155a49391ecd396"},{url:"assets/fonts/KaTeX_SansSerif-Regular.d511ebce.ttf",revision:"d511ebcef253ab53775576f28315f350"},{url:"assets/fonts/KaTeX_Script-Regular.082640ca.ttf",revision:"082640ca4242bb2aade86855e4d7d5f6"},{url:"assets/fonts/KaTeX_Script-Regular.4edf4e0f.woff",revision:"4edf4e0fd49c8a5680dd541c05f16a4c"},{url:"assets/fonts/KaTeX_Script-Regular.af7bc98b.woff2",revision:"af7bc98b2200573686405dc784f53cf2"},{url:"assets/fonts/KaTeX_Size1-Regular.2c2dc3b0.ttf",revision:"2c2dc3b057bb48b80bc785ac3d87ecf8"},{url:"assets/fonts/KaTeX_Size2-Regular.114ad198.ttf",revision:"114ad19833311359052ad1a174159262"},{url:"assets/fonts/KaTeX_Size4-Regular.70174da7.ttf",revision:"70174da79d1707501c10e07872e84667"},{url:"assets/fonts/KaTeX_Typewriter-Regular.35fe2cce.ttf",revision:"35fe2cce0791c276b8e919decd873f5b"},{url:"assets/fonts/KaTeX_Typewriter-Regular.53dcf861.woff",revision:"53dcf861876aae6f3a6a6004dc3bc758"},{url:"assets/fonts/KaTeX_Typewriter-Regular.641339e2.woff2",revision:"641339e2cd86c7816bfb8028ee7f86e0"},{url:"assets/img/bulb.fa255ccc.svg",revision:"fa255cccbbef66519a1bb90a5bed6f24"},{url:"assets/img/danger.950d1128.svg",revision:"950d1128cc862f2b631f5d54c3458174"},{url:"assets/img/default-skin.b257fa9c.svg",revision:"b257fa9c5ac8c515ac4d77a667ce2943"},{url:"assets/img/homeImage.56f13b5d.jpg",revision:"56f13b5d598a4feab49dd969ac9fd2ff"},{url:"assets/img/info.b3407763.svg",revision:"b3407763d94949efc3654309e9a2202f"},{url:"assets/img/search.83621669.svg",revision:"83621669651b9a3d4bf64d1a670ad856"},{url:"assets/img/stop.6e8b05e0.svg",revision:"6e8b05e040e31db4b52092926ac89628"},{url:"assets/js/37.6874eba6.js",revision:"8f91385dd964df912f3cfeed4a274704"},{url:"assets/js/app.4e1d0750.js",revision:"67afb3030ac88ebe9cb5ec7b3bf657b5"},{url:"assets/js/layout-Blog.8cd83531.js",revision:"122b6c0b533bd28ce778d0a183c85cf3"},{url:"assets/js/layout-Layout.85d11602.js",revision:"e5b24bf52e3169e1f19f8d202283945f"},{url:"assets/js/layout-NotFound.16a80787.js",revision:"820506a58d1206263b47ba0910c9ef7d"},{url:"assets/js/page-applicative--d5fd60f2.fedcd1a6.js",revision:"88cbab2e1edce091bdcfb4006e2f1e15"},{url:"assets/js/page-Blob--8636b6e0.a18925b9.js",revision:"8e1ee7edf6878a795607046239efb10e"},{url:"assets/js/page-ConcurrentModefiber--428f0236.4e9b06fe.js",revision:"d99da2c0bfc70844d84bcdc0233be69a"},{url:"assets/js/page-createAppmount--59c6962e.20d19405.js",revision:"55836757db363a0b4400ea8f205a1182"},{url:"assets/js/page-createElementrender--4e0fce44.916950b7.js",revision:"31a87d70ef98baface3c5b9167d30c68"},{url:"assets/js/page-effect--c37ff3b6.de78135c.js",revision:"ee97742291e780af941770bd6845dc11"},{url:"assets/js/page-handlers代理方法--71d35776.7ecb59cd.js",revision:"91729b3b2c89512ec8061d1455e00a96"},{url:"assets/js/page-koa--0da4005e.4b7547cf.js",revision:"26eaa5da02b44f880424e2956bad003a"},{url:"assets/js/page-monad--42efab29.f704dcad.js",revision:"58c9a46f8ed0ae4f0cd7597560e8fbe6"},{url:"assets/js/page-Observable--73755485.6b723532.js",revision:"8da913f8b4d33ba2e77e63e4a67e98b0"},{url:"assets/js/page-react-redux--476f3c76.0703044d.js",revision:"81d589d554d408d9005e82be9070eabf"},{url:"assets/js/page-reactive--9fc44336.c2055f12.js",revision:"d1fcd0fc5db3f35e20f7c458771779c8"},{url:"assets/js/page-reactiveeffect--5bf69d3a.acb560fb.js",revision:"f9da27b1e51ad12dfd093490ce7cd8f5"},{url:"assets/js/page-reconciliation--52aa2555.aca61b3b.js",revision:"912378f255a6292dc3744a0ff9ea949e"},{url:"assets/js/page-redux--6dd09404.5b854cc7.js",revision:"d06129b1877c4c7ec898c2e85d919119"},{url:"assets/js/page-rendercommit--7f6091c5.7fff2b1e.js",revision:"c3ed36d097f3791a626b380a1d7d3858"},{url:"assets/js/page-useState--60c92407.62166869.js",revision:"2a10e21006c33e5e1dc4e55095e2669b"},{url:"assets/js/page-webpack--740e8bbe.1e9a9123.js",revision:"a3560c1d4e5fb45fcc15ee794453300b"},{url:"assets/js/page-websecurity--26872ba5.fe69e5d1.js",revision:"c2e87a7fc3dc2d4c5f65335ae5d9e45d"},{url:"assets/js/page-函子--e5be893e.246eac1c.js",revision:"e7c963552fd3876fa2ee96e42f81ad54"},{url:"assets/js/page-函子之间的转换--513f68a2.7e076e41.js",revision:"4bc50bc0342f2d9c1df5020a17e0631b"},{url:"assets/js/page-函数式编程--37b59b1c.a033d1f4.js",revision:"ea6989c61ac4329015ff94540d3f8d70"},{url:"assets/js/page-函数的组合--60414ba3.981ca4ca.js",revision:"83e68de13daabafdc3e057f4747345af"},{url:"assets/js/page-函数组件--2406c685.0c996212.js",revision:"aac78087c29401150d7dc0fed27cd2ce"},{url:"assets/js/page-函数输入处理--151f0a76.6906338c.js",revision:"211799c9889e84be4675cbaa5aea477a"},{url:"assets/js/page-文件上传--f74d7bf6.fd99038c.js",revision:"05555286db287c6e789193030c20870d"},{url:"assets/js/page-组件渲染的细节--21758d7d.fc2f0f9e.js",revision:"b9d60c592d8ea1cde206637f319af7f1"},{url:"assets/js/page-首页--8fc477d4.ef201893.js",revision:"9442df08be10c06ac041367d7737bbd9"},{url:"assets/js/vendors~flowchart.70bdf89b.js",revision:"531f6ec34e6e76812f348db7816a9630"},{url:"assets/js/vendors~layout-Blog~layout-Layout.5106708b.js",revision:"63094bb2e53285d996317383f647c0cc"},{url:"assets/js/vendors~layout-Blog~layout-Layout~layout-NotFound.da458cff.js",revision:"1a0bcd7eebad995b82d5aca38d68b80e"},{url:"assets/js/vendors~layout-Layout.4467d7df.js",revision:"43bb8ed72ac8007ccd52840000ba0d65"},{url:"category/index.html",revision:"ed076985375e4879fd6bf552b5dda29a"},{url:"fonts/dm-italic.ttf",revision:"725a972a235b1101a64981ec59b664cf"},{url:"fonts/dm-regular.ttf",revision:"f98eb548eeacca4313cd1c2a7f52d9cf"},{url:"fonts/汉仪旗黑50简.ttf",revision:"79781ea0063360f5ffed23d98954359f"},{url:"images/fiber.png",revision:"63a7f41b95f8f623b411cec105258d7b"},{url:"index.html",revision:"f3eda3f758661310254700b5be5690e5"},{url:"logo/logo200.png",revision:"dfc1cca5e2fec86474f3fc9a1b6a6c8b"},{url:"logo/logo500.png",revision:"8d1c3a2d6acd1ad3bc704027fd3606e6"},{url:"tag/index.html",revision:"52001d7f8e251a9b070b590def73cf83"},{url:"timeline/index.html",revision:"1f1dc09fb004efd112a697f5cebe502e"},{url:"views/functional/applicative/index.html",revision:"49869f4b45e7356c204e994f8ca8ec49"},{url:"views/functional/compose/index.html",revision:"a987d8233a56c6daf2801a23378160d2"},{url:"views/functional/functor/index.html",revision:"3adab4a20b622b8323f2d8b18456ac4c"},{url:"views/functional/index.html",revision:"a54750fde2521fefca9f2f72fdac3625"},{url:"views/functional/inputs/index.html",revision:"946b20132d4702fff3b58801d615bcea"},{url:"views/functional/monad/index.html",revision:"57716f23737b1af7a368c4c94c897e43"},{url:"views/functional/rxjs/index.html",revision:"818032cb23afff55924d3c80c7a438c6"},{url:"views/functional/transform/index.html",revision:"e61e46ad7f250b48dff14b68bbf90a16"},{url:"views/JS/index.html",revision:"bddbf00a77c02656aefa0407ca02cf79"},{url:"views/JS/security/index.html",revision:"981657b3c5b428b148cbba4d051a4b08"},{url:"views/JS/upload/index.html",revision:"4388622e089695fc88d3beb6ed01a3c1"},{url:"views/JS/webpack/index.html",revision:"66663625ad9d804da7946a3b06a2ee5b"},{url:"views/owner-koa/index.html",revision:"549fe4b6da1c2667c67727c6253dd0bd"},{url:"views/owner-react/fiber/index.html",revision:"4257141621a0d2e05e32f78a9b0ef22d"},{url:"views/owner-react/functionComponent/index.html",revision:"b7557972ba24c13e37d64f5b18db14f7"},{url:"views/owner-react/index.html",revision:"ae9a456f0e8420d34c55e43e21900b8c"},{url:"views/owner-react/reconciliation/index.html",revision:"bc12d1fc734c675900e1cbb3b68cfcdd"},{url:"views/owner-react/render&commit/index.html",revision:"10e035c5f7d0f772b11c4e691b068719"},{url:"views/owner-react/useState/index.html",revision:"64e2691bfa7981684f341b00a77ca097"},{url:"views/owner-redux/index.html",revision:"f51e65c26991baf26f6391c30d354655"},{url:"views/owner-redux/react-redux/index.html",revision:"084baa913fb1ae50af3cbb5161dfd357"},{url:"views/owner-vue-next/index.html",revision:"7e88eec0fb2216b6dfa37107487b2b35"},{url:"views/vue-next/componentDetail/index.html",revision:"3796b612a90f51969718976eb3b93e81"},{url:"views/vue-next/createApp&mount/index.html",revision:"343c4dbf796ef6b0a5cb99656176c1ba"},{url:"views/vue-next/effect/index.html",revision:"b903a0d5aa70d47c7fba1888f7e89949"},{url:"views/vue-next/handler/index.html",revision:"0ce51bc9ea0a9fba4612daf4b525223d"},{url:"views/vue-next/reactive/index.html",revision:"fccd437e779820a1792c19249d84bc87"},{url:"xuan200.png",revision:"337c9efc9e84b65cfe4b29fe0d909ab4"},{url:"xuan500.png",revision:"7afeb05055b35382431eeee9f3953d56"}],{})}));
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
