var textureSprites=["Rigid","Ghost"];
var textures=new Array();
var textureId=new Array();  //Has two paramter, first is the id, second is the position(x-axis of block in sprite) of the block
var updated=false;
var canvas_Background=document.createElement("canvas");
canvas_Background.id=("background");
canvas_Background.style.left=0;
var NumberOfTextures=5;
var ghostBlockRange = new Array(2);

function calculateIDs()
{
    var sumOfItems=0;
    var j;

    firstGhostBlockId=textureSprites[0].length; //Length of rigid is the id of first ghost block(This may change)

    for(var singleTextureSprite in textureSprites)
    {
        for(j=sumOfItems;j<sumOfItems+textures[singleTextureSprite].width/100;j++)
        {
            if(textureSprites[singleTextureSprite]=="Ghost" && j==sumOfItems)
            {
                ghostBlockRange[0]=(sumOfItems);
                ghostBlockRange[1]=(sumOfItems+textures[singleTextureSprite].width/100-1);
            }
            textureId[j]=[singleTextureSprite,(j-sumOfItems)*100];
        }
        sumOfItems=j;
    }
    blockAmount=textureId.length;
    UpdateBackground();
}

function chooseBlock(index)
{
    var block=new Array(2);
    block[0]=index;
    block[1]=100*(Math.floor(Math.random()*(textures[index].width/100)));
    return block;
}

function InitialBackground()
{
    LoadTextures();

    document.getElementById("canvasContainer").appendChild(canvas_Background);

    UpdateBackground();
}

function LoadTextures()
{
    var i=0;
    for(var singleTextureSprite in textureSprites)
    {
        this.src="Resources/Images/Texture/"+textureSprites[singleTextureSprite]+".png";
        if(this.src==null || this.src==undefined)
        {
            alert("Missing texture: "+singleTextureSprite);
            break;
        }
        textures[i] = new Image();
        textures[i].addEventListener("load", calculateIDs);
        textures[i].src=this.src;
        i++;
    }
}

function UpdateBackground()
{
    iniMap();
    drawMap();
    myGamePiece.frozen=false;
}



