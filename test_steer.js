/**
 * Created by Bob on 10/7/2014.
 */
var steer = require('./steer.js');
var maxAngle = 180;


var handleMotion = function(pos){
    var angle =  Math.floor(
            (Math.atan2(pos.x,-pos.z) * 180 / Math.PI) + 360) % 360;
    var speed= Math.floor(Math.sqrt(pos.x *pos.x + pos.z * pos.z))+1;
    console.log({angle:angle,speed:speed});
};

steer.motion(handleMotion);

