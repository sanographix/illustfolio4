// Add target="_blank" when user opens external link
(function() {
  var a = document.querySelectorAll('a');
  for (var i = 0; i < a.length; i++) {
    if (a[i].host !== location.host) {
      a[i].setAttribute('target', '_blank');
    }
  }
}());

// youtubeとvimeoに対してだけホワイトリスト的にレスポンシブにするdivを足す
var video = document.querySelectorAll('iframe[src*="youtube"], iframe[src*="vimeo"]');
for (i = 0; i < video.length; i++) {
    var videoWrap = document.createElement("div");
    videoWrap.classList.add("video-wrap");
    video[i].parentNode.insertBefore(videoWrap, video[i]);
    videoWrap.appendChild(video[i]);
}
