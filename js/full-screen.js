function getViewport() {

  var viewPortWidth;
  var viewPortHeight;

  // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
  if (typeof window.innerWidth != 'undefined') {
   viewPortWidth = window.innerWidth,
   viewPortHeight = window.innerHeight
  }

  // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
  else if (typeof document.documentElement != 'undefined'
  && typeof document.documentElement.clientWidth !=
  'undefined' && document.documentElement.clientWidth != 0) {
    viewPortWidth = document.documentElement.clientWidth,
    viewPortHeight = document.documentElement.clientHeight
  }

  // older versions of IE
  else {
   viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
   viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
  }
  return {width: viewPortWidth, height:viewPortHeight};
}

$(function() {
  var viewport = getViewport()
  $(".app-window").css("height", viewport.height + "px")
  $("html").css("height", viewport.height + "px")
  $("body").css("height", viewport.height + "px")
});

$(window).resize(function() {
  console.log("resized")
  var viewport = getViewport()
  $("html").css("height", viewport.height + "px")
  $("body").css("height", viewport.height + "px")
  // $("#debug-text").append(
  //   "ROTATED: " +
  //   "vh: " + viewport.height + " " +
  //   "vw: " + viewport.width + " " +
  //   "html height: " + $("html").height() +
  //   "body height: " + $("body").height()
  // )
});
