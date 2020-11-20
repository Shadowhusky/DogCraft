var blockAmount;
var blockIconsPerColumn=8;
var blockSelected_Id;
var blockSelected;
var loadedIcon=0;
var mapFolder = "Resources/Map";
var map=new Array; //map[y][x]
var mapEditorGenerated=false;
var mapEditorAmine_Show=new Array();
var mapEditorAmine_Fold=new Array();
var mapEditorIconLoaded;
var itemCursorX;
var itemCursorY;
var oldCursorX=-1000;
var oldCursorY;
var mapInitialized=false;
var mapHeight=200;
var mapWidth=300;
var keepPuttingBlocks=false;
var lastSelectedBlock=0;

function destroyBlock(x,y)
{
    var blockSidesLength=canvasContainer.clientWidth/20/3;

    this.ctx=canvas_Background.getContext("2d");
    this.ctx.clearRect(x, y, blockSidesLength, blockSidesLength);

    this.blockX = Math.floor( ( x+5 ) / blockSidesLength );
    this.blockY = Math.floor( ( y+5 ) / blockSidesLength );

    map[map.length-1-this.blockY][this.blockX] = -1;
}

function drawMap()
{
    var canvasContainer = document.getElementsByClassName("GamingArea")[0];
    this.ctx=canvas_Background.getContext("2d");

    this.blockWidth=canvasContainer.clientWidth/20/3;
    this.blockHeight=this.blockWidth;

    var put_X;

    for(var n in map)
    {
        put_X=0;
        var y=canvas_Background.clientHeight-this.blockHeight-this.blockHeight*n;
        for(var m in map[n])
        {  
            var x=this.blockWidth*put_X;
            if(map[n][m]==-1||map[n][m]==undefined||map[n][m]==null)
            {
                put_X++;
                continue;
            }
            if(map[n][m]==""||textureId[map[n][m]]==undefined||textureId[map[n][m]]==null)
            {
                continue;
            }
            drawBlock(map[n][m],x,y,this.blockWidth,this.blockHeight);
            put_X++;
        }
    }
}

function drawBlock(id,x,y,blockWidth,blockHeight)
{
    this.block=textureId[id];
    this.ctx.drawImage( textures[this.block[0]],
                        this.block[1]+1,
                        0,
                        98,
                        100,
                        (x),
                        (y),
                        (blockWidth),
                        (blockHeight) );
}

function generateMapEditor()
{
    var src = document.getElementById("mapEditor");

    var row=0;
    var column=1;
    var foldIcon;var newItem;var newItem_Background;
    for(var i=0;i<blockAmount;i++)
    {
        row+=1.05;
        if(row>blockIconsPerColumn)
        {
            column+=1.05;
            row=1.05;
        }

        if(mapEditorGenerated)
        {
            foldIcon=$("#foldIcon")[0];
            newItem=$("#itemIcon"+i)[0];
            newItem_Background=$("#itemIconBack"+i)[0];
        }
        else
        {
            newItem=document.createElement("img");
            newItem_Background=document.createElement("span");
            foldIcon=document.createElement("img");
        }

        newItem_Background.style.width="3.1vw";
        newItem_Background.style.height="3.1vw";
        newItem_Background.style.left=(column*3.3)+"vw";
        newItem_Background.style.top=((row*3.3)+6)+"vw";
        newItem_Background.style.position="absolute";
        newItem_Background.style.backgroundColor="rgba(25,25,25,0.15)";
        newItem_Background.style.zIndex="-2";
        newItem_Background.id="itemIconBack"+i;
        newItem_Background.style.visibility="hidden";
        newItem_Background.style.userSelect="none";

        newItem.src="Resources/Images/TextureIcons/"+i+".png";
        newItem.style.width="3.1vw";
        newItem.style.left=(column*3.3)+"vw";
        newItem.style.top=((row*3.3)+6)+"vw";
        newItem.alt="ERR";
        newItem.style.position="absolute";
        newItem.style.zIndex="-1";
        newItem.id="itemIcon"+i;
        newItem.style.visibility="hidden";
        newItem.style.zIndex=textureId.length-1-i;
        newItem.style.userSelect="none";

        newItem.style.borderRadius="20%";

        if(!mapEditorGenerated)
        {
            src.appendChild(newItem);
            src.appendChild(newItem_Background);
        }
        document.querySelector("#itemIcon"+i).onload=itemIconLoaded;
        newItem.ondragstart=function(){return false;}; //Preventing drag the itemIcons
        newItem_Background.ondragstart=function(){return false;}; //Preventing drag the itemIcons

    }
    foldIcon.src="Resources/Images/Fold.png";
    foldIcon.style.width="2.7vw";
    foldIcon.style.height="2.3vw";
    foldIcon.style.left=(column*3.3)+0.2+"vw";
    foldIcon.style.top=(((row+1)*3.3)+6)+0.2+"vw";
    foldIcon.style.position="absolute";
    foldIcon.style.zIndex="-2";
    foldIcon.style.opacity="0.8";
    foldIcon.style.visibility="hidden";
    foldIcon.id="foldIcon";
    foldIcon.style.userSelect="none";
    src.appendChild(foldIcon);
    $("#foldIcon").hover(function(){
        $("#foldIcon").css("width", "2.1vw");
        $("#foldIcon").css("height", "1.7vw");
        $("#foldIcon").css("margin", "0.3vw");
    },function(){
        $("#foldIcon").css("width", "2.7vw");
        $("#foldIcon").css("height", "2.3vw");
        $("#foldIcon").css("margin", "0vw");
    });

    foldIcon.ondragstart=function(){return false;}; //Preventing drag the itemIcons

    //Event when fold the mapEditor
    $("#foldIcon").mousedown(function(){
        for(var index in mapEditorAmine_Fold)
        {
            $("#itemIconBack"+index).css("visibility", "hidden");
            mapEditorAmine_Fold[index].restart();
        }
    });
    mapEditorGenerated=true;
}

function itemIconLoaded()
{
    loadedIcon++;

    //Wait all icons to be loaded
    if(loadedIcon<blockAmount)
    {
        return;
    }

    mapEditorAmine_Fold_Align();
    for(let i=0;i<blockAmount;i++)
    {             
        document.querySelector("#itemIcon"+i).onclick=function(){
            blockSelected=true;
            selectBlock(i);
        };

        $("#itemIconBack"+i).css("visibility","visible");
        $("#itemIcon"+i).css("visibility","visible");
        $("#foldIcon").css("visibility","visible");
        $("#itemIcon"+i).css("transform","none");

        //Construct anime for showing and folding map editor
        mapEditorAmine_Show[i]= anime.timeline({
            direction: 'normal',
            duration: 50,
            loop: false,
            autoplay: false
            });  
        mapEditorAmine_Show[i]
        .add({
            targets: "#itemIcon"+i,
            opacity: 0.5,
            scale: 0,
            rotate:'270',
            });
        mapEditorAmine_Show[i]
        .add({
            duration:50,
            targets: "#itemIcon"+i,
            opacity: 1,
            scale: 1,
            rotate:'360',
            easing: 'spring',
            });
        //Interaction when mouse enter the block icon
        $("#itemIcon"+i).mouseenter(function(){
            for(var j=0;j<blockAmount;j++)
            {
                if(this.id!="#itemIcon"+j&&$("#itemIcon"+j).css("width")!="3.1vw")
                {
                    $("#itemIcon"+j).css("opacity", "1");
                    $("#itemIcon"+j).css("cursor", "default");
                    $("#itemIcon"+j).css("width", "3.1vw");
                    $("#itemIcon"+j).css("margin", "0vw");
                }
            }
            $(this).css("opacity", "0.8");
            $(this).css("cursor", "grab");
            $(this).css("width", "2.5vw");
            $(this).css("margin", "0.3vw");
        });

        mapEditorAmine_Show[blockAmount]= anime.timeline({
            direction: 'normal',
            duration: 50,
            loop: false,
            autoplay: false
            });  
        mapEditorAmine_Show[blockAmount]
        .add({
            targets: "#foldIcon",
            opacity: 0.5,
            scale: 0,
            rotate:'270',
            });
        mapEditorAmine_Show[blockAmount]
        .add({
            duration:50,
            targets: "#foldIcon",
            opacity: 1,
            scale: 1,
            rotate:'360',
            easing: 'spring',
            });
    }

    PlayMapEditorAnime();

    mapEditorIconLoaded=true;

    document.querySelector('#canvasContainer').onmouseenter=restoreIconState;
}

function mapEditorAmine_Fold_Align()
{
    if(mapEditorAmine_Fold==null)
    {
        console.log("mapEditorAmine_Fold==null");
        return;
    }
    for(var i=0;i<blockAmount;i++)
    {
        this.translateY= parseFloat($("#foldIcon").css("top")) - parseInt($("#itemIcon"+i).css("top"));
        this.translateX= parseFloat($("#foldIcon").css("left")) - parseInt($("#itemIcon"+i).css("left"));
        mapEditorAmine_Fold[i]= anime.timeline({
            direction: 'normal',
            loop: false,
            autoplay: false
            })
            .add({
                delay:Math.pow(i,0.5)*100,
                duration:1000,
                targets: "#itemIcon"+i,
                translateY: this.translateY+"px",
                translateX: this.translateX+"px",
                easing: 'easeOutExpo',
            })
            .add({
                duration:1,
                targets: "#foldIcon",
                scale:0,
                easing: 'easeOutExpo',
            })
            .add({
                duration:800,
                targets: "#itemIcon"+i,
                scale:0,
                rotate:360,
                easing: 'easeOutExpo',
            });
    }
    mapEditorAmine_Fold[blockAmount]= anime.timeline({
        direction: 'normal',
        loop: false,
        autoplay: false
        })
        .add({
            delay:Math.pow(blockAmount,0.5)*100,
            duration:1000,
            targets: "#itemIcon"+blockAmount,
            translateY: this.translateY+"px",
            translateX: this.translateX+"px",
            easing: 'easeOutExpo',
        })
        .add({
            duration:1,
            targets: "#foldIcon",
            scale:0,
            easing: 'easeOutExpo',
        })
        .add({
            duration:800,
            targets: "#itemIcon"+blockAmount,
            scale:0,
            rotate:360,
            easing: 'easeOutExpo',
        });
}

function PlayMapEditorAnime()
{
    $("#foldIcon").css("transform","none");
    $("#foldIcon").css("visibility","visible");
    $('#loadingIcon_MapEditor').css("visibility","hidden")
    for(var i in  mapEditorAmine_Show)
    {
        $("#itemIcon"+i).css("transform","none");
        $("#itemIconBack"+i).css("visibility", "visible");
        mapEditorAmine_Show[i].restart();
    }
}

function restoreIconState()
{
    for(var i=0;i<blockAmount;i++)
    {
        if($("#itemIcon"+i).css("width")!="3.1vw")
        {
            $("#itemIcon"+i).css("opacity", "1");
            $("#itemIcon"+i).css("cursor", "default");
            $("#itemIcon"+i).css("width", "3.1vw");
            $("#itemIcon"+i).css("margin", "0vw");
        }
    }
}

function selectBlock(id)
{
    showItemCursor(id);
}

function showItemCursor(id)
{
    blockSelected_Id=id;
    var canvasContainer = document.getElementsByClassName("GamingArea")[0];
    var blockSidesLength=canvasContainer.clientWidth/20/3;
    var itemCursor;
    if(!$("#itemCursor").length)
    {
        
        itemCursor=document.createElement("img");
        
        itemCursor.id="itemCursor";
        itemCursor.style.position="absolute";
        itemCursor.style.visibility="hidden";
        itemCursor.style.opacity="0.6";
        itemCursor.style.userSelect="none";

        itemCursor.ondragstart=function(){return false;};                           //Preventing drag the itemCursor

        var container=$("#canvasContainer");
        container.mousedown(function(event){                                        //Hide the itemselectIcon when right click the mouse
            if (event.which == 1 && blockSelected==true)                            //Put block on map when left click the mouse
            {
                keepPuttingBlocks=true;
                alignItemCursor(event.pageX,event.pageY);
                putBlock(blockSelected_Id, itemCursorX+Math.abs(canvas_Background.offsetLeft), itemCursorY+Math.abs(canvas_Background.offsetTop));   
            }
            if (event.which == 2)                                                   //Become/End  detroy mode when press the wheel
            {
                if(blockSelected_Id==blockAmount && itemCursor.style.visibility=="visible")
                {
                    itemCursor.style.visibility="hidden";
                    blockSelected=false;
                    return;
                }
                alignItemCursor(event.pageX,event.pageY);

                if(blockSelected_Id!=blockAmount)
                {
                    lastSelectedBlock=blockSelected_Id;
                }
                blockSelected_Id=blockAmount;

                itemCursor.src="Resources/Images/Pickaxe.png";
                itemCursor.style.visibility="visible";
                blockSelected=true;                      
            }
            if(event.which == 3)                                                    //Show/Hide item cursor when right press the mouse
            {
                event.preventDefault(); 
                if(itemCursor.style.visibility=="visible")
                {
                    itemCursor.style.visibility="hidden";
                    blockSelected=false; 
                }else{
                    blockSelected_Id=lastSelectedBlock;
                    itemCursor.src="Resources/Images/TextureIcons/"+blockSelected_Id+".png";
                    alignItemCursor(event.pageX,event.pageY);
                    itemCursor.style.visibility="visible";
                    blockSelected=true; 
                }
            }
        });
        container.mouseup(function(event){                                          //Stop putting blocks whe mouseup
            if (event.which == 1 && keepPuttingBlocks)                             
            {
                keepPuttingBlocks=false;
            }});
        container.on("wheel",function(event)
        {
            if(event.originalEvent.deltaY>0&&blockSelected_Id+1<=blockAmount)        //Scroll down to change selected item
            {
                if(blockSelected_Id +1 == blockAmount)
                {
                    blockSelected_Id++;
                    itemCursor.src="Resources/Images/Pickaxe.png";
                    return;
                }
                itemCursor.src="Resources/Images/TextureIcons/"+(++blockSelected_Id)+".png";
                return;
            }    
            if(event.originalEvent.deltaY<0&&blockSelected_Id>0)                    //Scroll up to change selected item
            {
                itemCursor.src="Resources/Images/TextureIcons/"+(--blockSelected_Id)+".png";
                return;
            }    
        });

        container.append(itemCursor);
        container.mousemove(function(event){
            if(blockSelected)
            {
                if(event==undefined){return;}
                if(keepPuttingBlocks)
                {
                    alignItemCursor(event.pageX,event.pageY);
                    putBlock(blockSelected_Id, itemCursorX+Math.abs(canvas_Background.offsetLeft), itemCursorY+Math.abs(canvas_Background.offsetTop));   
                }
                alignItemCursor(event.pageX,event.pageY);
            }
        });
        container.mouseleave(function(event){
            if(itemCursor.style.visibility=="visible"){itemCursor.style.visibility="hidden";}
        });
    }
    else
    {
        itemCursor=$("#itemCursor")[0];
    }
    itemCursor.src="Resources/Images/TextureIcons/"+id+".png";
    itemCursor.style.width=blockSidesLength;
    itemCursor.style.height=itemCursor.style.clientWidth;
}

function alignItemCursor(cursorX,cursorY)
{
    if(blockSelected==0)
    {
        return;
    }
    var blockSidesLength=canvasContainer.clientWidth/20/3;
    var itemCursor=$("#itemCursor")[0];
    itemCursor.style.width=blockSidesLength;
    itemCursor.style.height=itemCursor.style.clientWidth;
    if(itemCursor.style.visibility=="hidden"){itemCursor.style.visibility="visible";}

    oldCursorX=cursorX;
    oldCursorY=cursorY;

    this.canvasShift_Y = Math.abs( canvas_Background.offsetTop - (canvasContainer.clientHeight-canvas_Background.clientHeight) );  //This will change according to y axis
    this.canvasOffSet_Y = ( canvasContainer.offsetHeight - blockSidesLength * Math.floor( canvasContainer.offsetHeight/blockSidesLength) ); //This won't change                                                                                                               //This won't change
    this.shiftY =  this.canvasShift_Y - Math.abs( Math.floor(this.canvasShift_Y/blockSidesLength)*blockSidesLength );
    this.shiftX =  Math.abs( canvas_Background.offsetLeft - Math.abs(Math.floor(canvas_Background.offsetLeft/blockSidesLength)*blockSidesLength) );

    itemCursorX = -this.shiftX + Math.floor((cursorX + this.shiftX) / blockSidesLength )*blockSidesLength;
    itemCursorY = this.shiftY + Math.floor((cursorY  - this.canvasOffSet_Y - this.shiftY) /blockSidesLength)*blockSidesLength + this.canvasOffSet_Y;
    
    itemCursor.style.left =  itemCursorX;
    itemCursor.style.top =  itemCursorY;
}

function putBlock(id,x,y)
{
    var blockSidesLength=canvasContainer.clientWidth/20/3;

    if(blockSelected_Id==blockAmount)
    {
        destroyBlock(x,y);
        return;
    }

    if(isSolid(itemCursorX+blockSidesLength/10,itemCursorY+blockSidesLength/10))                                         //Can't put block on another one
    {
        return;
    }

    tempX=x-Math.abs(canvas_Background.offsetLeft);
    tempY=y-Math.abs(canvas_Background.offsetTop);
    if( tempX+blockSidesLength/10 < myGamePiece.x+myGamePiece.width && tempX+blockSidesLength/10 > myGamePiece.x && tempY+blockSidesLength/10 > myGamePiece.y && tempY+blockSidesLength/10 < myGamePiece.y+myGamePiece.height)    //Can't put on player
    {
        return;
    }
    
    this.blockX = Math.floor( ( x+5 ) / blockSidesLength );
    this.blockY = Math.floor( ( y+5 ) / blockSidesLength );

    map[map.length-1-this.blockY][this.blockX] = id.toString();
    drawBlock(id,x,y,blockSidesLength,blockSidesLength);
}

function iniMap()
{
    if(mapInitialized){return;}
    var mapCache=localStorage.getItem("mapData");
    if(mapCache!=null)
    {
        map=JSON.parse(mapCache);
        return;
    }
        $.ajax({
          url:mapFolder+"/test.json",
          dataType: "text",
          async: false,
          success: function (data){
            mapContent_Raw = data;
            loadMap(mapContent_Raw);
            mapInitialized=true;
          }
        });
}

function loadMap(mapContent_Raw)
{
    //initialize map array(For storing map info)
    for(let i=0;i<mapHeight;i++)
    {
        map[i]=new Array(mapWidth);
        for(let j=0;j<mapWidth;j++)
        {
            map[i][j]="-1";
        }
    }
    mapContent_Raw=mapContent_Raw.replace(/[\r\n]|\r|\n/g,"");
    map=JSON.parse(mapContent_Raw);
    return map;
}

function saveMap()
{
	localStorage.setItem("mapData",JSON.stringify(map));
}


