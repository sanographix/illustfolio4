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
  var video = document.querySelectorAll('.post .entry-content iframe');

  // ページが読み込まれた時に実行
  handle(mediaQuery);
  // ウィンドウサイズが変更されても実行されるように
  mediaQuery.addListener(handle);
  if ( video ) {
    function handle(mq) {
      for (i = 0; i < video.length; i++) {
        if (mq.matches) {
          var videoWrap = document.createElement("div");
          videoWrap.classList.add("video-wrap");
          video[i].parentNode.insertBefore(videoWrap, video[i]);
          videoWrap.appendChild(video[i]);
        } else {
          videoWrap.classList.remove("video-wrap");
        }
      }
    }
  }
}());

// NPFまたはテキスト投稿で、トップページグリッドレイアウト用のサムネイルを生成する
(function() {
  var post = document.querySelectorAll('.index-post.text');
  for (var i = 0; i < post.length; i++) {
    if ( post[i] ) {
      // 最初のサムネイルを見つける
      var postImg = post[i].querySelector(".index-post-content-text-body img");
      if ( postImg ) {
        var anchor = post[i].querySelector(".post-content-anchor");

        // 画像投稿と同じ構造にする
        var thumb = postImg.getAttribute('src');
        anchor.insertAdjacentHTML('afterbegin', "<div class='post-photo-thumb' style='background-image: url(" + thumb + "');'></div>");

        anchor.classList.remove('post-content-anchor');
        post[i].querySelector(".post-content-wrapper").style.display='none';
      }
    }
  }
}());
