// Add target="_blank" when user opens external link
(function() {
  var a = document.querySelectorAll('a');
  for (var i = 0; i < a.length; i++) {
    if (a[i].host !== location.host) {
      a[i].setAttribute('target', '_blank');
    }
  }
}());

(function() {
  var mediaQuery = matchMedia('(max-width: 768px)');
  var video = document.querySelectorAll('.post.video .entry-content iframe');
  var videoWrap = document.createElement("div");

  // ページが読み込まれた時に実行
  handle(mediaQuery);
  // ウィンドウサイズが変更されても実行されるように
  mediaQuery.addListener(handle);
  function handle(mq) {
    for (i = 0; i < video.length; i++) {
      if (mq.matches) {
        videoWrap.classList.add("video-wrap");
        video[i].parentNode.insertBefore(videoWrap, video[i]);
        videoWrap.appendChild(video[i]);
      } else {
        videoWrap.classList.remove("video-wrap");
      }
    }
  }
}());
