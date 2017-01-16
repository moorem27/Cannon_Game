$(function () {
    'use strict'; // Start of use strict
    var main_container = $('#main-container');

    var cannon = $('.cannon');
    var canvas = document.getElementById('main-container');

    // Reposition cannon to bottom left of screen (there must be a better way?)
    cannon.css({'position': 'absolute',
                        'left': '0px',
                        'top': canvas.scrollHeight + 'px'});

    var mouse_up    = 0;
    var center_x    = 0;
    var center_y    = 0;
    var v_0         = 10;   // arbitrary initial velocity
    var theta       = 0;    // radians
    var degrees     = 0;
    var gravity     = 9.81;



    function fire_cannon(fire_event) {
        main_container.append('<div class="cannon-ball"></div>');
        var time = 0;
        var cannon_ball = $('.cannon-ball');

        var x = Math.cos(theta) * 300;
        var y = 900 - Math.sin(theta)*(300);
        var v_x0 = v_0 * Math.cos(theta);
        var v_y0 = v_0 * Math.sin(theta);

        cannon_ball.fadeIn(200);
        cannon_ball.offset({top: y, left: x});
        cannon_ball.animate({'left': ((v_x0*time)),
            'top':((v_y0*time) - (.5*gravity*(time*time)))},
            {duration: 1000,
           step: function(now){
               time = time + .15;
               console.log(degrees*-1);
               if(cannon_ball.position().left > canvas.scrollWidth ||
                    cannon_ball.position().top > canvas.scrollHeight ) {
                   // cannon_ball.removeAttr('style');
                   cannon_ball.clearQueue();
                   // cannon_ball.removeAttribute(this.constructor);
               }
           }
        });
        cannon_ball.fadeOut(2000);


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