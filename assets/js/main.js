$(function () {
    'use strict'; // Start of use strict

    var main_container = $('#main-container');
    var cannon = $('.cannon');

    // FIXME: should only show elements after loading is finished
    // FIXME: The cannon should rotate around the center of the wheel

    // set cannon's starting position and pivot point
    cannon.css({'transform' : 'rotate(-45deg)'});
    cannon.css({'position': 'absolute',
                        'left': '0',
                        'top': ($(window).height() - cannon.width())});
    cannon.show();

    var center_x    = 0;
    var center_y    = 0;
    var v_0         = 200;  // arbitrary initial velocity
    var theta       = 0;    // radians
    var degrees     = 0;
    var gravity     = 9.81;

    function fire_cannon(fire_event) {
        var cannon_ball = $('.cannon-ball');
        var div = $("<div />");
        div.attr({class: 'cannon-ball'});

        var event_x     = fire_event.pageX;
        var event_y     = $(window).height() - fire_event.pageY;
        var radians     = Math.atan2( event_y, event_x );
        var time        = 0;
        var v_x0        = v_0 * Math.cos(radians);
        var v_y0        = v_0 * Math.sin(radians);
        var x           = 0;
        var y           = $(window).height();

        div.css({top: y, left: x}); // TODO: Why am I having to hide a random div behind the cannon?
        main_container.append(div);

        // TODO: Use Velocity.js for animation?
        cannon_ball.css({ fontSize: 0 }).animate({
            fontSize: 45
        },{
            duration: 5000,
            easing: "swing",
            step: function(){
                time = time + .15;
                x = (v_x0*time);
                y = (((v_y0*time)) - (.5*gravity*(Math.pow(time, 2))));
                // Forgive the magic number for the offset
                $(this).css({ left: x - 100, top: $(window).height() - y });
            },
            complete: function() {
                $(this).remove();
            }
        });
        main_container.removeClass(div);
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
    $('html').mousemove(function () {
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

    document.addEventListener('click', fire_cannon );
    $.mobile.loading().hide();
}); // end of document ready
