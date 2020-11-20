var dogImage;
var dogSprite;
var dogStat_R1=1; //Left(position) of single sprite
var dogStat_R2=103;
var dogStat_L1=205;
var dogStat_L2=307;

var myGameArea;
var myGamePiece;
var refresh=true;
var xSpeed=5;
var dogState="Right";
var dogMoving=false;

var startJumping=false;
var jumping=true;
var jumpForce=0;
var JumpForceConstant=8;
var JumpSound=new Audio("Resources/Audio/Jump.m4a");

var windowSize;
var windowWidth;

function alignFromScreenSize()
{
    var canvasContainer = $('.GamingArea')[0];
    if(blockIconsPerColumn==8 && canvasContainer.clientWidth/canvasContainer.clientHeight>2)
    {
        blockIconsPerColumn=5;
        return;
    }
    if(blockIconsPerColumn==5 && canvasContainer.clientWidth/canvasContainer.clientHeight<=2);
    {
        blockIconsPerColumn=8;
    }
}

function clearmove_Joystick(){
    myGamePiece.speedX = 0;
    dogMoving=false;
}

function clearmove_Keyboard() {
    if(startJumping==true)
    {
        if(event.keyCode==87||event.keyCode==32)
        {
            startJumping=false;
        }
    }
    if(myGamePiece.speedX<0&&event.keyCode==65)
    {
    myGamePiece.speedX = 0;
    if(jumping==false) dogMoving=false;
    }
    if(myGamePiece.speedX>0&&event.keyCode==68)
    {
    myGamePiece.speedX = 0;
    if(jumping==false) dogMoving=false;
    }
}

function component(width, height, state, x, y, type) {
    var frozen=true;
    this.type = type;
    if (type == "image") {
        this.state=state;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        this.ctx = myGameArea.context;
        this.canvas = document.getElementById("canvas");
        this.width=this.canvas.clientWidth/20;
        this.height= this.width*0.82;

        this.canvasContainer= $('#canvasContainer')[0];
        if( this.canvasContainer.clientWidth+ this.canvasContainer.clientHeight!=windowSize || this.canvasContainer.clientWidth !=windowWidth)
        {
            windowWidth=this.canvasContainer.clientWidth;
            windowSize= this.canvasContainer.clientWidth+ this.canvasContainer.clientHeight;
            if($("#itemIconBack0").length && $("#itemIconBack0")[0].style.visibility=="visible")
            {
                for(var index in mapEditorAmine_Fold)
                {
                    $("#itemIconBack"+index).css("visibility", "hidden");
                    mapEditorAmine_Fold[index].restart();
                }
            }   
            closeHelpWindow();
            Resize();
            alignScreenRotationWindow();
            alignFromScreenSize();          //Align number of icons to be shown per column to fit mobile screen
        }

       if(myGamePiece.speedX<0 && dogState=="Right" && this.image!=dogStat_L1) {
           this.state=dogStat_L1;
           dogState="Left";
       }
        if(myGamePiece.speedX>0 && dogState=="Left" && this.image!=dogStat_R1) {
            this.state=dogStat_R1;
            dogState="Right";
        }
        if (type == "image") {
                this.ctx.drawImage(dogSprite,
                                   this.state,
                                   0,
                                   100,
                                   82,
                                   this.x,
                                   this.y,
                                   this.width, this.height);
        } else {
            this.ctx.fillStyle = color;
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };
}

function dogMovingEffect(){
    if(dogMoving==false) return;
    if(myGamePiece.state==dogStat_L1) {
        myGamePiece.state = dogStat_L2;
        return;
    }
    if(myGamePiece.state==dogStat_L2) {
        myGamePiece.state = dogStat_L1;
        return;
    }
    if(myGamePiece.state==dogStat_R1) {
        myGamePiece.state = dogStat_R2;
        return;
    }
    if(myGamePiece.state==dogStat_R2) {
        myGamePiece.state = dogStat_R1;
        return;
    }
}


function gamearea() {
    this.canvas = document.createElement("canvas");
    this.canvas.id="canvas";

    this.background = document.getElementById("canvasContainer");
    this.canvas.width=this.background.clientWidth;
    this.canvas.height=this.background.clientHeight;
    windowSize=this.canvas.clientWidth+this.canvas.clientHeight;

    document.getElementById("canvasContainer").appendChild(this.canvas);

    this.context = this.canvas.getContext("2d");
    this.start = function() {
        this.interval = setInterval(updateGameArea, 15);
    };
    this.clear = function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
}

function jumpWithForce(force)
{
    PlayJumpSound();

    jumping=true;
    jumpForce=force;
    
    dogMoving=true;
}

function Initialize()
{
    var joyStickFrame = $('.joyStickContainer')[0];
    var menuBar = $('.Tool_blocks')[0];
    joyStickFrame.style.visibility='visible';
    menuBar.style.visibility='visible';

    //Initialise image
    dogSprite=new Image(); dogSprite.src="Resources/Images/Character.png";

    initJoystick();
    window.addEventListener("orientationchange", Resize);
    window.addEventListener("keypress",move);
    window.addEventListener("keyup",clearmove_Keyboard);
    
    startGame();
 
    loadChatBox();
    
    Resize();

    //Add window's fading animation
    $('#LoadingWindow').css("visibility","hidden");
    $('#loadingIcon_MainPage').css("visibility","hidden");
    $("body").css("animation-name","web_Enter");
    $("body").css("animation-duration","2s");

    this.canvasContainer = $('.GamingArea')[0];
    canvas_Background.style.top=-canvas_Background.clientHeight+this.canvasContainer.clientHeight;

    myGamePiece.x=0;
    myGamePiece.y=0;
}

function move() {
    if(document.getElementById('sendBox')!=document.activeElement&&!myGamePiece.frozen)
    {
        this.keycode=event.keyCode;
        if(jumping==false)
        {
            if( this.keycode == 87 || this.keycode == 32 || this.keycode == 119)
            {
                jumpWithForce(JumpForceConstant);
                startJumping=true;
            }
        }
        if ( this.keycode == 65 ||  this.keycode == 97) { //Left
            if(dogMoving)
            {
                myGamePiece.speedX=0;
            }
            myGamePiece.speedX = -xSpeed;
            dogMoving=true;
            return;
        }
        if ( this.keycode == 68 || this.keycode == 100) { //Right
            if(dogMoving)
            {
                myGamePiece.speedX=0;
            }
            myGamePiece.speedX = xSpeed;
            dogMoving=true;
            return;
        }
    }
}

function move_Joystick(x,y) {
    if(!myGamePiece.frozen)
    {
        if ( x < 0) {
            myGamePiece.speedX = (x/100)*xSpeed;
            dogMoving=true;
        }
        if ( x > 0) {
            myGamePiece.speedX = x/100*xSpeed;
            dogMoving=true;
        }
        if( y<-10 && jumping==false)
        {
            jumpWithForce(-y/100*JumpForceConstant);
        }
    }
}

function Resize()
{
    jumpForce=0;

    InitialBackground();

    this.canvas = $('#canvas')[0];
    this.background = $('#background')[0];
    this.canvasContainer = $('.GamingArea')[0];

    legShift_L*=this.canvasContainer.clientWidth/this.canvas.width;
    legShift_R*=this.canvasContainer.clientWidth/this.canvas.width;
    headShift*=this.canvasContainer.clientWidth/this.canvas.width;  
    
    JumpForceConstant=Math.pow(this.canvasContainer.clientWidth/2/30*0.4*8,0.5);
    xSpeed=Math.abs(this.canvasContainer.clientWidth/300);

    this.canvas.width=this.canvasContainer.clientWidth;
    this.canvas.height=this.canvasContainer.clientHeight;

    var blockSidesLength = this.canvasContainer.clientWidth/20/3;
    this.background.width = blockSidesLength*mapWidth;
    this.background.height = blockSidesLength*mapHeight;

    this.background.style.top=-(this.background.clientHeight)+this.canvasContainer.clientHeight;
    this.background.style.left=parseInt(this.background.style.left)*this.canvasContainer.clientWidth/this.canvas.width;

    var joyStickFrame = $('.joyStickContainer')[0];
    var joyStick = $('#joystick')[0];

    joyStickFrame.height=joyStickFrame.offsetWidth;
    joyStick.style.height=joyStickFrame.offsetWidth;
    joyStick.style.width=joyStick.style.height;//Auto resize the joystick

    joyStickFrame.style.left=(this.canvas.width)-joyStickFrame.offsetHeight;
    joyStickFrame.style.top=this.canvas.height-joyStickFrame.offsetHeight;

    //Set the loading icon to the central of the screen
    $('#loadingIcon_MainPage').css("margin-top",(this.canvasContainer.clientHeight-$('#loadingIcon_MainPage')[0].clientHeight)/2);
    $('#loadingIcon_MapEditor').css("top",(this.canvasContainer.clientHeight-$('#loadingIcon_MapEditor')[0].clientHeight)-28);
    myGamePiece.x=0;
    myGamePiece.y=0;

    if($("#itemCursor").length)
    {
        blockSidesLength=canvasContainer.clientWidth/20/3;
        itemCursor=$("#itemCursor")[0];
        itemCursor.style.width=blockSidesLength;
        itemCursor.style.height=itemCursor.style.clientWidth;
    }
    else
    {
        showItemCursor(0);
    }

    menuAnime_Refresh();
}

function startGame() {
    myGameArea = new gamearea();
    
    this.state=dogStat_R1;
    myGamePiece = new component(100, 82, this.state, 0,0, "image");
    myGameArea.start();
    setInterval(dogMovingEffect, 150);
}

function updateGameArea() {
        this.canvasContainer = $('.GamingArea')[0];
        //Move joystick when press
        if (joyStickDown==true)
        {
            move_Joystick(joyStick_X , joyStick_Y);
        }
        myGameArea.clear();

        //Move character left and right if won't make collision
        if(myGamePiece.speedX!=0)
        {
            //If not cross bound
            if(myGamePiece.x+myGamePiece.speedX>=0&&myGamePiece.x+myGamePiece.width+myGamePiece.speedX<=canvasContainer.clientWidth)
            {
                if(myGamePiece.speedX<0&&!checkCollision("LEFT",myGamePiece))
                {
                    if(myGamePiece.x<this.canvasContainer.clientWidth*1/2&&parseInt(canvas_Background.style.left)<myGamePiece.speedX)
                        {
                            canvas_Background.style.left=parseInt(canvas_Background.style.left)-myGamePiece.speedX;
                            alignItemCursor(oldCursorX,oldCursorY);
                        }
                        else{
                            myGamePiece.x += myGamePiece.speedX;
                        }
                }
                else if(myGamePiece.speedX>0)
                {
                    if(!checkCollision("RIGHT",myGamePiece))
                    {
                        if(myGamePiece.x+myGamePiece.width>this.canvasContainer.clientWidth*1/2&&parseInt(canvas_Background.style.left)>this.canvasContainer.clientWidth-canvas_Background.clientWidth+myGamePiece.speedX)
                        {
                            canvas_Background.style.left=parseInt(canvas_Background.style.left)-myGamePiece.speedX;
                            alignItemCursor(oldCursorX,oldCursorY);
                        }
                        else{
                            myGamePiece.x += myGamePiece.speedX;
                        }
                    }
                }
            }
        }
        dogFalling();
        dogJump();
        myGamePiece.update();
}
 
Initialize();
