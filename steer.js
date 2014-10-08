exports.motion = function(callback) {

    var Leap = require('leapjs');
    var prev_x = 0, prev_y = 0, prev_z = 0;
    var sense = 1;
    var timestamp = 0;
    var timoutMicroseconds = 100 * 1000;


    Leap.loop(function (frame) {
        var dx, dy, dz;

        if (frame.hands.length > 0) {
            var pos = frame.hands[0].palmPosition;
            if (timestamp === 0) timestamp = frame.timestamp;

            if (frame.timestamp - timestamp > timoutMicroseconds) {
                timestamp = frame.timestamp;

                dx = pos[0] - prev_x;
                if (Math.abs(dx) < sense) dx = 0;
                prev_x = pos[0];

                dy = pos[1] - prev_y;
                if (Math.abs(dy) < sense) dy = 0;
                prev_y = pos[1];

                dz = pos[2] - prev_z;
                if (Math.abs(dz) < sense) dz = 0;
                prev_z = pos[2];

//                console.log(pos);
                /*            var direction = '';
                 if (dx > 0)
                 direction += "right";

                 if (dx < 0)
                 direction += "left";
                 if (dz > 0)
                 direction += " back";
                 if (dz < 0)
                 direction += " forward";
                 if (direction != '')
                 console.log(direction);*/

                callback({x:pos[0], z:pos[2]});


            }
        }
    });
}

