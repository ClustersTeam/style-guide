;(function ($, doc) {
  'use strict'
  var $win = $(window)
  var $html = $('html')
  var scrollTimeout // global for any pending scrollTimeout

  $win.scroll(function () {
    if (scrollTimeout) {
      // clear the timeout, if one is pending
      clearTimeout(scrollTimeout)
      scrollTimeout = null
    }
    scrollTimeout = setTimeout(scrollHandler, 200)
  })

  var scrollHandler = function () {
    if ($html.scrollTop() >= 200 && !$html.hasClass('show-back-to-top')) {
      $html.addClass('show-back-to-top')
    } else if ($html.scrollTop() <= 200) {
      $html.removeClass('show-back-to-top')
    }
  }
  module.exports = scrollHandler;

  scrollHandler()

  $('.back-to-top').on('click', function () {
    var $targetNode = $(this).attr('href').split('h1')[1]
    $('h1' + $targetNode).attr('tabindex', '-1')
    $html.removeClass('show-back-to-top')
    $('h1' + $targetNode).focus()
  })
})(jQuery)
