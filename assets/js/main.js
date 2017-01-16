$(function () {
    'use strict'; // Start of use strict

    var main_container = $('#main-container');
    var cannon = $('.cannon');
    var canvas = document.getElementById('main-container');

    // Reposition cannon to bottom left of screen (there must be a better way?)
    cannon.css({'position': 'absolute',
                        'left': '0px',
                        'top': canvas.scrollHeight + 300 + 'px'});

    var center_x    = 0;
    var center_y    = 0;
    var v_0         = 150;  // arbitrary initial velocity
    var theta       = 100;  // radians
    var degrees     = 0;
    var gravity     = 9.81;

    //TODO: Bugs everywhere. Fix glitchy animation (Matt).
    function fire_cannon(fire_event) {
        main_container.append('<div class="cannon-ball"></div>');
        var time = 0;
        var cannon_ball = $('.cannon-ball');
        var v_x0 = v_0 * Math.cos(theta*-1); //Should theta have to be negated here?
        var v_y0 = v_0 * Math.sin(theta*-1); //Or here?

        // cannon_ball.offset({top: cannon_y, left: cannon_x});
        cannon_ball.css({ fontSize: 0 }).animate({
            fontSize: 45
        },{
            duration: 5000,
            easing: "swing",
            step: function(t, fx){
                time = time + .10;
                var x = (v_x0*time)
                var y = (((v_y0*time)) - (.5*gravity*(time*time)) );
                console.log(x + ' ' + y);
                $(this).css({ left: x, top: 1000 - y });
            }
        });
        cannon_ball.clearQueue();   // This needs to be called somewhere else to clear the animation queue
                                    // (Maybe detect ball collision with edge of screen, then clear queue?
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

    // theta should be in radians
    function calculate_velocities(radians) {
        return {
            v_x0: v_0*Math.cos(radians),
            v_y0: v_0*Math.sin(radians)
        };
    }

    // returns theta in radians
    function calculate_theta(event) {
        var cannon_offset   = cannon.offset();
        center_x        = (cannon_offset.left) + (cannon.width() / 2);
        center_y        = (cannon_offset.top) + (cannon.height() / 2);
        var event_x         = event.pageX;
        var event_y         = event.pageY;
        return Math.atan2( event_y - center_y, event_x - center_x );
    }

    function rotate_cannon(degrees) {
        cannon.css('-moz-transform', 'rotate(' + degrees + 'deg)');
        cannon.css('-webkit-transform', 'rotate(' + degrees + 'deg)');
        cannon.css('-o-transform', 'rotate(' + degrees + 'deg)');
        cannon.css('-ms-transform', 'rotate(' + degrees + 'deg)');
    }


    function mousemoved(event) {
        var radians = calculate_theta(event);
        var degree = (radians * (180 / Math.PI));
        degrees = degree;
        rotate_cannon(degree);
        theta = radians;
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


    document.addEventListener('mouseup', fire_cannon );
    $.mobile.loading().hide();
}); // end of document ready
