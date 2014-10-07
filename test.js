var Cylon = require('cylon');
var direction = 135;
var speed = 255;
Cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: 'COM4' },
  device: {name: 'sphero', driver: 'sphero'},

  work: function(my) {
	my.sphero.detectCollisions();
    every((1).second(), function() { 
      my.sphero.roll(speed, direction);
    });
	
	my.sphero.on('collision', function(){
		direction = direction + 90;
		direction %= 360;
		console.log('bump');
	});
  }
}).start();