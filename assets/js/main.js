(function ($) {
  'use strict' // Start of use strict

  var box = $('#box')
  var offset = box.offset()
  var center_x = (offset.left) + (box.width() / 2)
  var center_y = (offset.top) + (box.height() / 2)

  function mousemoved (event) {
    var event_x = event.pageX
    var event_y = event.pageY
    var radians = Math.atan2(event_x - center_x, event_y - center_y)
    var degree = (radians * (180 / Math.PI) * -1) + 90

    box.css('-moz-transform', 'rotate(' + degree + 'deg)')
    box.css('-webkit-transform', 'rotate(' + degree + 'deg)')
    box.css('-o-transform', 'rotate(' + degree + 'deg)')
    box.css('-ms-transform', 'rotate(' + degree + 'deg)')

    var pageCoords = event.pageX + ', ' + event.pageY
    var clientCoords = event.clientX + ', ' + event.clientY
    $('#coords').text('( pageX, pageY ) : ' + pageCoords +
            ' ( clientX, clientY ) : ' + clientCoords)
  }

    // only moves the box when the mouse is held down
    // $('#test-body').mousedown(function(){
    //     console.log('logged mouse down');
    //     $(document).mousemove(mousemoved);
    // }).mouseup(function(){
    //     console.log('logged mouse up');
    //     $(document).unbind();
    // });

  $(document).on('vmousemove', mousemoved)
  $.mobile.loading().hide()
})(jQuery) // End of use strict
