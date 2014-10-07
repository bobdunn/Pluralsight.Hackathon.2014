var Cylon = require('cylon');
var steer = require('./steer.js');



var handleMotion = function(pos, robot){
    var angle =  Math.floor(
            (Math.atan2(pos.x,pos.z) * 180 / Math.PI) + 360) % 360;
    var speed= Math.floor(Math.sqrt(pos.x *pos.x + pos.z * pos.z))+1;
    console.log({angle:angle,speed:speed});
    robot.roll(angle,speed);
};

var direction = 135;
var speed = 255;
Cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: 'COM5' },
  device: {name: 'sphero', driver: 'sphero'},


  work: function(my) {
	my.sphero.detectCollisions();
    var opts = {
        // n: int, divisor of the max sampling rate, 400 hz/s
        // n = 40 means 400/40 = 10 data samples per second,
        // n = 200 means 400/200 = 2 data samples per second
        n: 200,
        // m: int, number of data packets buffered before passing them to the stream
        // m = 10 means each time you get data it will contain 10 data packets
        // m = 1 is usually best for real time data readings.
        m: 1,
        // pcnt: 1 -255, how many packets to send.
        // pcnt = 0 means unlimited data Streaming
        // pcnt = 10 means stop after 10 data packets
        pcnt: 0
      };
      my.sphero.setDataStreaming(['locator', 'accelOne', 'velocity'], opts);

      steer.motion(function(pos){
         handleMotion(pos,my.sphero);
      });
//    every((1).second(), function() {
//      my.sphero.roll(speed, direction);
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