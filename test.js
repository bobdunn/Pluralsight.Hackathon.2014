var Cylon = require('cylon');
var steer = require('./steer.js');
var speedDivisor = 5;

var handleMotion = function(pos, robot){
    var heading = Math.floor(
            (Math.atan2(pos.x,-pos.z) * 180 / Math.PI) + 360) % 360;
    var speed= Math.floor(Math.sqrt(pos.x *pos.x + pos.z * pos.z)/speedDivisor);
    console.log({heading:heading,speed:speed});
    if (speed < 8)
      robot.stop();
    else
      robot.roll(speed, heading);
};

var calibrateAndStartReading = function(robot) {
    robot.roll(20, 0)
    setTimeout(function() {
        robot.stop();
        steer.motion(function(pos){
            handleMotion(pos,robot);
        });
    }, 5*1000);
};

var direction = 0;
var speed = 255;
Cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: 'COM5' },
  device: {name: 'sphero', driver: 'sphero'},


  work: function(my) {
//	my.sphero.detectCollisions();
//    var opts = {
//        // n: int, divisor of the max sampling rate, 400 hz/s
//        // n = 40 means 400/40 = 10 data samples per second,
//        // n = 200 means 400/200 = 2 data samples per second
//        n: 200,
//        // m: int, number of data packets buffered before passing them to the stream
//        // m = 10 means each time you get data it will contain 10 data packets
//        // m = 1 is usually best for real time data readings.
//        m: 1,
//        // pcnt: 1 -255, how many packets to send.
//        // pcnt = 0 means unlimited data Streaming
//        // pcnt = 10 means stop after 10 data packets
//        pcnt: 0
//      };
//      my.sphero.setDataStreaming(['locator', 'accelOne', 'velocity'], opts);

      calibrateAndStartReading(my.sphero);

//    every((1).second(), function() {
//        direction  = (direction + 45 ) % 360;
//      my.sphero.roll(20, direction);
//    });
//
//	my.sphero.on('collision', function(){
//		console.log('bump');
//		direction = direction +Math.floor((Math.random() * 180) + 90);
//		direction %= 360;
//	});

	my.sphero.on('data', function(data) {
      console.log("locator:");
      console.log(data);
	});


  }
}).start();