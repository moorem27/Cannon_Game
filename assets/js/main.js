$(function () {
    'use strict'; // Start of use strict

    var main_container = $('#main-container');
    var cannon = $('.cannon');

    // FIXME: should only show elements after loading is finished

    // set cannon's starting position and pivot point
    cannon.css({'transform-origin': 'left'});
    cannon.css({'transform' : 'rotate(-45deg)'});
    cannon.css({'position': 'absolute',
                        'left': '0',
                        'top': ($(window).height() - cannon.width())});
    cannon.show();

    var center_x    = 0;
    var center_y    = 0;
    var v_0         = 5;  // arbitrary initial velocity
    var theta       = 0;  // radians
    var degrees     = 0;
    var gravity     = 9.81;

    //TODO: Bugs everywhere. Fix glitchy animation (Matt).
    function fire_cannon(fire_event) {

        var time = 0;
        var cannon_ball = $('.cannon-ball');
        var v_x0 = v_0 * Math.cos(theta); //Should theta have to be negated here?
        var v_y0 = v_0 * Math.sin(theta); //Or here?
        var x = Math.cos(theta)*300;
        var y = 1000 - Math.sin(theta)*300;

        main_container.append('<div class="cannon-ball"></div>');
        cannon_ball.velocity({
            left: x,
            top: 1000 - y,
            tween: 1000,
            duration: 10000
        }, {
            progress: function( x, y, time ) {
                time = time + .1;
                x = v_x0*time;
                y = (((v_y0*time)) - (.5*gravity*(Math.pow(time,2))));
                console.log(time + ' ' + x + ' ' + ( 1000 - y ) );
            },
            complete: function() {
               $(this).remove();
            }
        });

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
        cannon.css({'transform' : 'rotate(' + degrees + 'deg)'});
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


    // disables scrolling by arrow keys
    // TODO: comment this section out when debugging cannon balls
    // TODO: also comment out body & html sections in main.sass (lines 4-9)
    window.addEventListener("keydown", function(e) {
        //  space, page up, page down and arrow keys:
        if([32, 33, 34, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);

    document.addEventListener('mouseup', fire_cannon );
    $.mobile.loading().hide();
}); // end of document ready
