var joyStickDown=false;
var joyStick_X , joyStick_Y;

function initJoystick() {
    var xCenter = 150;
    var yCenter = 150;
    var pspRadius=50;
    var joyStickContainer =$('.joyStickContainer')[0];

    var stage = new createjs.Stage('joystick');

    var psp = new createjs.Shape();
    psp.graphics.beginFill('#333333').drawCircle(xCenter, yCenter, pspRadius);

    psp.alpha = 0.25;

    var vertical = new createjs.Shape();
    var horizontal = new createjs.Shape();

    stage.addChild(psp);
    stage.addChild(vertical);
    stage.addChild(horizontal);
    createjs.Ticker.framerate = 120;
    createjs.Ticker.addEventListener('tick', stage);
    stage.update();

    var myElement = $('#joystick')[0];

    // create a simple instance
    // by default, it only adds horizontal recognizers
    var mc = new Hammer(myElement);
    mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

    mc.on("panstart", function(ev) {
        var new_xCenter=xCenter*parseInt(joyStickContainer.clientWidth)/300;
        var new_yCenter= yCenter*parseInt(joyStickContainer.clientHeight)/300;
        var new_pspRadius=pspRadius*parseInt(joyStickContainer.clientHeight)/300;
        var x = (ev.center.x - parseInt(joyStickContainer.style.left) - new_xCenter)/parseInt(joyStickContainer.clientWidth)*300;
        var y = (ev.center.y - parseInt(joyStickContainer.style.top) - new_yCenter)/parseInt(joyStickContainer.clientWidth)*300;
 
        //Joystick should have a limitation
        if(x>xCenter-pspRadius){x=xCenter-pspRadius;}
        if(x<-xCenter+pspRadius){x=-xCenter+pspRadius;}

        if(y>yCenter-pspRadius){y=yCenter-pspRadius;}
        if(y<-yCenter+pspRadius){y=-yCenter+pspRadius;}
        joyStick_X=psp.x;
        joyStick_Y=psp.y;

        move_Joystick(joyStick_X,joyStick_Y);
        psp.alpha = 0.5;
        joyStickDown=true;

        stage.update();
    });

    // listen to events...
    mc.on("panmove", function(ev) {
        var new_xCenter=xCenter*parseInt(joyStickContainer.clientWidth)/300;
        var new_yCenter= yCenter*parseInt(joyStickContainer.clientHeight)/300;
        var x = (ev.center.x- parseInt(joyStickContainer.style.left)- new_xCenter)/parseInt(joyStickContainer.clientWidth)*300;
        var y = (ev.center.y- parseInt(joyStickContainer.style.top)- new_yCenter)/parseInt(joyStickContainer.clientWidth)*300;
 
        //Joystick should have a limitation
        if(x>xCenter-pspRadius){x=xCenter-pspRadius;}
        if(x<-xCenter+pspRadius){x=-xCenter+pspRadius;}

        if(y>yCenter-pspRadius){y=yCenter-pspRadius;}
        if(y<-yCenter+pspRadius){y=-yCenter+pspRadius;}
        psp.x = x;
        psp.y = y;
        joyStick_X=psp.x;
        joyStick_Y=psp.y;
        move_Joystick(joyStick_X,joyStick_Y);

        psp.alpha = 0.5;

        stage.update();
    });

    mc.on("panend", function(ev) {
        psp.x = 0;
        psp.y = 0;

        psp.alpha = 0.25;
        joyStickDown=false;
        clearmove_Joystick();
        stage.update();
    });
}


function calculateCoords(angle, distance) {
    var coords = {};
    distance = Math.min(distance, 100);
    var rads = (angle * Math.PI) / 180.0;

    coords.x = distance * Math.cos(rads);
    coords.y = distance * Math.sin(rads);

    return coords;
}
