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

    function get_mouse_coordinates(event) {
        var canvas = document.getElementById("main-container");
        var rectangle = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rectangle.left,
            y: event.clientY - rectangle.top
        };
    }

    function mousemoved(event) {
        var cannon_offset = cannon.offset();
        var center_x = (cannon_offset.left) + (cannon.width() / 2);
        var center_y = (cannon_offset.top) + (cannon.height() / 2);

        var event_x = event.pageX;
        var event_y = event.pageY;
        var radians = Math.atan2( event_y - center_y, event_x - center_x);
        var degrees = (radians * (180 / Math.PI));

        cannon.css({'transform' : 'rotate(' + degrees + 'deg)'});

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
