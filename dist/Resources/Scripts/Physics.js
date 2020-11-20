var gravity=0.2;
var Falling=1;
var legShift_L=10,legShift_R=10,headShift=12;
var fixedX=0;
var fixedY=0;

function checkCollision(direction,gameObject)
{
    switch (direction) 
    {
        case "LEFT":
            this.canvasContainer = $('.GamingArea')[0];
            this.smallJump=this.canvasContainer.clientWidth/350;
            for(let i = 1; i <= gameObject.height; i += gameObject.height / 4)
            {
                if(isSolid(gameObject.x,gameObject.y+i))
                {
                    if(i>=(3/4*gameObject.height))
                    { 
                        if(jumping==false&&!startJumping&&!isSolid(gameObject.x+gameObject.width*4/5,gameObject.y-blockSideLength)&&!isSolid(gameObject.x+gameObject.width*2/5,gameObject.y-blockSideLength))
                        {
                            jumpWithForce(this.smallJump);
                        }
                            return true;
                    }
                    return true;
                }
            }
            break;
        case "RIGHT":
            this.smallJump=this.canvasContainer.clientWidth/350;
            for(let i = 1; i <= gameObject.height; i += gameObject.height / 4)
            {
                if(isSolid(gameObject.x + gameObject.width,gameObject.y + i))
                {
                    if(i>=(3/4*gameObject.height))
                    { 
                        if(jumping==false&&!startJumping&&!isSolid(gameObject.x+gameObject.width/2,gameObject.y-blockSideLength)&&!isSolid(gameObject.x+gameObject.width*4/5,gameObject.y-blockSideLength)&&!isSolid(gameObject.x+gameObject.width,gameObject.y-blockSideLength))
                        {
                            jumpWithForce(this.smallJump);
                        }
                            return true;
                    }
                    return true;
                }
            }
            break;
        case "UP":
            //Collision box is difference for dog's two states.
            if(dogState=="Left")
            {
                if(isSolid(gameObject.x+gameObject.width/headShift+headShift/8,gameObject.y-1) || isSolid(gameObject.x+gameObject.width/2,gameObject.y-1) || isSolid(gameObject.x+gameObject.width-3,gameObject.y+gameObject.height/2-1))
                {
                    return true;
                }
            }
            else
            {
                if(isSolid(gameObject.x+gameObject.width-gameObject.width/headShift,gameObject.y-1) || isSolid(gameObject.x+gameObject.width/2,gameObject.y-1) || isSolid(gameObject.x+headShift,gameObject.y+gameObject.height/2-1))
                {
                    return true;
                }
            }
            break;
        case "DOWN":
            for(let i = legShift_L;i <= gameObject.width - legShift_R; i += (gameObject.width - legShift_L- legShift_R) / 6 )
            {
                if(isSolid(gameObject.x+i,gameObject.y+gameObject.height+1) )
                {
                    if(fixedY!=0)
                    {
                        myGamePiece.y=fixedY;
                    }
                    return true;
                }
            }
            break;
    }
    return false;
}

function dogFalling()
{
    this.canvasContainer = $('.GamingArea')[0];
    if(!myGamePiece.frozen&&!checkCollision("DOWN",myGamePiece))
    {
        if (jumping==false)
        {
            if(myGamePiece.y<this.canvasContainer.clientHeight-myGamePiece.height)
            {
                if(myGamePiece.y>this.canvasContainer.clientHeight*1/2&&parseInt(canvas_Background.style.top)+jumpForce*Falling>this.canvasContainer.clientHeight-canvas_Background.clientHeight)
                {
                    canvas_Background.style.top=parseInt(canvas_Background.style.top)+jumpForce*Falling;
                }else
                {
                    myGamePiece.y-=jumpForce*Falling;
                }
            jumpForce-=gravity;
            }
            else
            {
                myGamePiece.y=this.canvasContainer.clientHeight-myGamePiece.height;
            }
        }
    }
}

function dogJump() {
    this.canvasContainer = $('.GamingArea')[0];
    if(myGamePiece.y>this.canvasContainer.clientHeight-myGamePiece.height && jumping==true)
    {
        jumpForce=0;
        Falling=1;
        if(startJumping)
        {
            myGamePiece.y=this.canvasContainer.clientHeight-myGamePiece.height;
            jumpWithForce(JumpForceConstant);
            return;
        }
        if(myGamePiece.speedX==0) //Stop dog's motion anime when it fall on the ground statically.
        { 
            dogMoving=false;
        }
        myGamePiece.y=this.canvasContainer.clientHeight-myGamePiece.height;
        jumping=false;
        return;
    }
    if(!myGamePiece.frozen)
    {
        if(jumpForce*Falling<0&&checkCollision("DOWN",myGamePiece)==true)
        {
            jumpForce=0;
            Falling=1;
            if(startJumping)
            {
                jumpWithForce(JumpForceConstant);
                return;
            }
            if(myGamePiece.speedX==0)  
            { 
                dogMoving=false;
            }
            jumping=false;
            return;
        }
        if (jumping==true)
        {
            if(jumpForce*Falling>0)
            {
                if(checkCollision("UP",myGamePiece)==true)
                {
                    jumpForce=0;
                }
                if(myGamePiece.y<this.canvasContainer.clientHeight*1/2&&parseInt(canvas_Background.style.top)<-jumpForce)
                {
                    alignItemCursor(oldCursorX,oldCursorY);
                    canvas_Background.style.top=parseInt(canvas_Background.style.top)+jumpForce*Falling;
                }else
                {
                    myGamePiece.y-=jumpForce*Falling;
                }
            }
            else
            {
                if(myGamePiece.y>this.canvasContainer.clientHeight*1/2&&parseInt(canvas_Background.style.top)+jumpForce*Falling>this.canvasContainer.clientHeight-canvas_Background.clientHeight)
                {
                    alignItemCursor(oldCursorX,oldCursorY);
                    canvas_Background.style.top=parseInt(canvas_Background.style.top)+jumpForce*Falling;
                }else
                {
                    myGamePiece.y-=jumpForce*Falling;
                }
            }
        jumpForce-=gravity;
        }
    }
}

function isSolid(x,y)
{
    this.canvasContainer = $('.GamingArea')[0];
    this.blockSideLength=this.canvasContainer.clientWidth/20/3;
    this.map=map;
    //Calculate position of the checking point in the map.
    x=x+Math.abs(parseInt(canvas_Background.style.left));
    this.yShift= parseInt(canvas_Background.style.top)-(this.canvasContainer.clientHeight-canvas_Background.clientHeight);
    x=Math.floor(x/this.blockSideLength);
    y=Math.floor((this.canvasContainer.clientHeight - y + this.yShift) /this.blockSideLength);
    //Detected air.
    if(this.map[y]==undefined||y<0)
    {
        return false;
    }
    if(this.map[y][x]==undefined||this.map[y][x]==""||x>this.map[y].length||x<0)
    {
        return false;
    }
    //Detected solid.
    if(this.map[(y)][x]!=-1) //Not air
    {
        if( parseInt(this.map[(y)][x]) < ghostBlockRange[0] || parseInt(this.map[(y)][x]) > ghostBlockRange[1]) //Not in ghost blocks' range
        {
            fixedY=this.canvasContainer.clientHeight-myGamePiece.height-this.blockSideLength-((y)*this.blockSideLength)+this.yShift;
            return true;
        }
    }
    return false;
}

function PlayJumpSound()
{
    JumpSound.pause();
    JumpSound.currentTime=0;
    JumpSound.play();
}