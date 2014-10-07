var Leap = require('leapjs');

var safeMode = true; //Turn this off if Sphero is in water or you like to live dangerously!

var controlSphero = function() {

  var controller = new Leap.Controller({frameEventName:'deviceFrame', enableGestures:true});

  controller.on('connect', function() {
    console.log('connected to leap motion');
  });
  controller.on('protocol', function(p) {
    console.log('protocol', p);
  });
  controller.on('ready', function() {
    console.log('ready');
  });
  controller.on('blur', function() {
    console.log('blur?');
  });
  controller.on('focus', function() {
    console.log('focus?');
  });
  controller.on('deviceConnected', function() {
    console.log('device connected');
  });
  controller.on('deviceDisconnected', function() {
    console.log('device disconnected');
  });
  controller.on('frame', function(frame) {
    if (frame.gestures.length) {
      var g = frame.gestures[0];

      if (g.type == 'swipe' && g.state ==='stop') {
	console.log("Swipe");
        handleSwipe(g);
      }
      if (g.type == 'circle') {
//        handleCircle(g);
      }

    }
  });

  var handleCircle = function(g) {
    console.log("Circle");
  };

  var handleSwipe = function(g) {
    var X = g.position[0] - g.startPosition[0];
    var Y = g.position[1] - g.startPosition[1];
    var Z = g.position[2] - g.startPosition[2];

    var aX = Math.abs(X);
    var aY = Math.abs(Y);
    var aZ = Math.abs(Z);

    var big = Math.max(aX, aY, aZ);
    var direction = '?';

    if (aX === big) {
      direction = 'RIGHT';
      if (X < 0) {
        direction = 'LEFT';
      }
    } else if (aY === big) {
      direction = 'UP';
      if (Y < 0) {
        direction = 'DOWN';
      }
    } else if (aZ === big) {
      direction = 'REVERSE';
      if (Z < 0) {
        direction = 'FORWARD';
      }
    }

    switch (direction) {
      case 'LEFT':
	console.log("Left");
        break;
      case 'RIGHT':
	console.log("Right");
        break;
      case 'UP':
	console.log("Up");
        break;
      case 'DOWN':
	console.log("Down");
        break;
      case 'FORWARD':
	console.log("Forward");
        break;
      case 'REVERSE':
	console.log("Back");
        break;

    }

    console.log('Direction: %s', direction);
  }

  controller.connect();
  console.log('waiting for Leap Motion connection...');
};


controlSphero();

