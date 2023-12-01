/*
 * @Author: huangjh334 黄杰鸿 huangjh334@midea.com
 * @Date: 2023-08-04 14:09:29
 * @LastEditors: huangjh334 黄杰鸿 huangjh334@midea.com
 * @LastEditTime: 2023-08-04 16:42:03
 */

// https://juejin.cn/post/7131922258360500231/  待继续研究

this.addEventListener('install', function(e) {
  debugger
  e.waitUntil(
    cache.open('V1').then(function(cache) {
      return cache.addAll([
        '/sw-test/',
        '/sw-test/index.html',0
        '/sw-test/style.css',
        '/sw-test/app.js',
        '/sw-test/image-list.js',
        '/sw-test/star-wars-logo.jpg',
        '/sw-test/gallery/',
        '/sw-test/gallery/bountyHunters.jpg',
        '/sw-test/gallery/myLittleVader.jpg',
        '/sw-test/gallery/snowTroopers.jpg'
      ]);
    })
  )
})
  