$(function () {
    'use strict'; // Start of use strict

    var main_container = $('#main-container');
    var cannon = $('.cannon');
    var click_count = 1;

    function fire_cannon(fire_event) {
        main_container.append('<div class="cannon-ball"></div>');

        var cannon_ball = $('.cannon-ball');
        var cannon_offset = cannon.offset();

        cannon_ball.fadeIn(200);
        cannon_ball.offset({top: cannon_offset.top, left: cannon_offset.left});
        cannon_ball.fadeOut(200);

        console.log('cannon fired! ' + click_count++);
        main_container.remove('.cannon-ball');
    }

    function mousemoved(event) {
        var cannon_offset = cannon.offset();
        var center_x = (cannon_offset.left) + (cannon.width() / 2);
        var center_y = (cannon_offset.top) + (cannon.height() / 2);

        var event_x = event.pageX;
        var event_y = event.pageY;
        var radians = Math.atan2(event_x - center_x, event_y - center_y);
        var degree = (radians * (180 / Math.PI) * -1) + 90;

        cannon.css('-moz-transform', 'rotate(' + degree + 'deg)');
        cannon.css('-webkit-transform', 'rotate(' + degree + 'deg)');
        cannon.css('-o-transform', 'rotate(' + degree + 'deg)');
        cannon.css('-ms-transform', 'rotate(' + degree + 'deg)');

        var pageCoords = event.pageX + ', ' + event.pageY;
        var clientCoords = event.clientX + ', ' + event.clientY;
        $('#coords').text('( pageX, pageY ) : ' + pageCoords
            + ' ( clientX, clientY ) : ' + clientCoords);
    }

    // only moves the box when the mouse is held down
    $('html').mousedown(function () {
        $(document).mousemove(mousemoved);
    }).mouseup(function () {
        $(document).unbind();
    });

    // $(document).on('vmousemove', mousemoved);
    $('#fire').on('click', function(event) { fire_cannon(event) } );
    $.mobile.loading().hide();
}); // end of document ready
