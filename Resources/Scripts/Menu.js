var menu_Folding=false;
var menu_Visible=false;

var animateButtonOnHover_create = anime.timeline({
    targets: "#create",
    autoplay: false,
  });

animateButtonOnHover_create.
add({
    translateX: {
        direction: 'alternate',
        value:  18+$('#menu')[0].clientWidth,
        duration: 1,
    }
},'-=1').
add({
    rotate: [
        {
        direction: 'normal',
        easing: 'spring(1, 80, 10, 0)',
        value: [30,-45],
        duration: 300},
        {
            direction: 'alternate',
            easing: 'linear',
            value: -10,
            duration: 200},
        {
            direction: 'alternate',
            easing: 'linear',
            value: -40,
            duration: 200},
        {
            direction: 'alternate',
            easing: 'linear',
            value: 0,
            duration: 200},
    ]
},1);

var animateMenu_Hover_Opened = anime.timeline({
    direction: 'alternate',
    autoplay: false,
  });

animateMenu_Hover_Opened.
add({
    duration: 10,
    targets: '#menu',
    rotate:{
        value: [45,135],
        duration:500,
        easing: 'spring(1, 80, 10, 0)',
    }
});

var animateMenu_Hover_Closed = anime.timeline({
    direction: 'alternate',
    autoplay: false,
  });

animateMenu_Hover_Closed.
add({
    duration: 10,
    targets: '#menu',
    rotate:{
        value: [0,-90],
        duration:500,
        easing: 'spring(1, 80, 10, 0)',
    }
});

var animateMenu_Click = anime.timeline({
    direction: 'normal',
    easing: 'spring(1, 100, 11, 0)',
    autoplay: false,
    begin: function(anim) {
        menu_Folding=true;
        if(this.direction=='reverse') 
        {
            menu_Visible=false;
        }
    },
    complete: function(anim) {
        if(this.direction=='normal') 
        {
            menu_Visible=true;
            this.direction='reverse';
        }
        else 
        {
            this.direction='normal';
        }
        menu_Folding=false;
    }
  });

animateMenu_Click.
add({
    targets: '#menu',
    rotate: '315',
}).
add({
    targets: '#create',
    translateX: 18+$('#menu')[0].clientWidth,
    rotate:{
        direction: 'alternate',
        value:[-45,0],
        easing: 'spring(1, 60, 10, 0)',}
    },60)
.add({
    targets: '#save',
    translateX: 2*(18+$('#menu')[0].clientWidth),
    rotate:{
        direction: 'alternate',
        value:[-45,0],
        easing: 'spring(1, 60, 20, 0)',}
},90)
.
add({
    targets: '#help',
    translateX: 3*(18+$('#menu')[0].clientWidth),
    rotate:{
        direction: 'alternate',
        value:[-45,0],
        easing: 'spring(1, 60, 30, 0)',}
},120);

function buttonOnHover_create()
{
    if(animateMenu_Click.progress>=40&&animateMenu_Click.direction=='normal')
    {
        animateButtonOnHover_create.restart();
    }
    if(menu_Visible==false)
    {
        return;
    }
    if(animateButtonOnHover_create.progress==0||animateButtonOnHover_create.progress==100)
    {
        animateButtonOnHover_create.restart();
    }
}

function EditMap()
{
    loadedIcon=0;

    if(mapEditorAmine_Fold[0]==null||mapEditorAmine_Fold[0].progress==100||mapEditorAmine_Fold[0].progress==0)
    {
        //Show loading icon
        for(var i in mapEditorAmine_Fold)
        {
            $("#itemIcon"+i).css("transform","none");
        }
        $('#loadingIcon_MapEditor').css("visibility","visible");
        generateMapEditor();
    }

    menu_lostFocus();
}

function detectmob() { 
    if( navigator.userAgent.match(/Android/i) 
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPad Pro/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ){
       return true;
    }
    else {
       return false;
    }
}

function  menuAnime_Refresh()
{
    menu_lostFocus();
    $('#create').css("transform","none");
    $('#save').css("transform","none");
    $('#help').css("transform","none");

    animateButtonOnHover_create = anime.timeline({
        targets: "#create",
        autoplay: false,
    });

    animateButtonOnHover_create.
    add({
        translateX: {
            direction: 'alternate',
            value:  18+$('#menu')[0].clientWidth,
            duration: 1,
        }
    },'-=1').
    add({
        rotate: [
            {
            direction: 'normal',
            easing: 'spring(1, 80, 10, 0)',
            value: [30,-45],
            duration: 300},
            {
                direction: 'alternate',
                easing: 'linear',
                value: -10,
                duration: 200},
            {
                direction: 'alternate',
                easing: 'linear',
                value: -40,
                duration: 200},
            {
                direction: 'alternate',
                easing: 'linear',
                value: 0,
                duration: 200},
        ]
    },1);

    animateMenu_Click = anime.timeline({
        direction: 'normal',
        easing: 'spring(1, 100, 11, 0)',
        autoplay: false,
        begin: function(anim) {
            menu_Folding=true;
            if(this.direction=='reverse') 
            {
                menu_Visible=false;
            }
        },
        complete: function(anim) {
            if(this.direction=='normal') 
            {
                menu_Visible=true;
                this.direction='reverse';
            }
            else 
            {
                this.direction='normal';
            }
            menu_Folding=false;
        }
    });

    animateMenu_Click.
    add({
        targets: '#menu',
        rotate: '315',
    }).
    add({
        targets: '#create',
        translateX: 18+$('#menu')[0].clientWidth,
        rotate:{
            direction: 'alternate',
            value:[-45,0],
            easing: 'spring(1, 60, 10, 0)',}
        },60)
    .add({
        targets: '#save',
        translateX: 2*(18+$('#menu')[0].clientWidth),
        rotate:{
            direction: 'alternate',
            value:[-45,0],
            easing: 'spring(1, 60, 20, 0)',}
    },90)
    .
    add({
        targets: '#help',
        translateX: 3*(18+$('#menu')[0].clientWidth),
        rotate:{
            direction: 'alternate',
            value:[-45,0],
            easing: 'spring(1, 60, 30, 0)',}
    },120);
}

function menuClick()
{
    animateMenu_Hover_Closed.pause();
    animateMenu_Hover_Opened.pause();
    if(animateMenu_Click.direction=='normal')
    {
        if(menu_Folding)
        {
            animateMenu_Click.reverse();
        }
        else
        {
            animateMenu_Click.restart();
        }
    }
    else
    {
        if(menu_Folding)
        {
            animateMenu_Click.reverse();
        }
        else
        {
            animateMenu_Click.restart();
        }
    }
}

function menu_lostFocus()
{
    if(animateMenu_Click.direction=='reverse')
    {
        if(!menu_Folding)
        {
            animateMenu_Click.delay=0;
            animateMenu_Click.restart();
        }
    }
    else if(animateMenu_Click.direction=='normal'&&menu_Folding)
    {
        animateMenu_Click.reverse();
    }
}

function menuOnHover()
{
    if(menu_Folding)
    {
        if(animateMenu_Click.direction=='normal') animateMenu_Hover_Opened.restart();
        else animateMenu_Hover_Closed.restart();
    }
    else{
        if(menu_Visible==false)
        {
            animateMenu_Hover_Closed.restart();
        }
        else{
            animateMenu_Hover_Opened.restart();
        }
    }
}

function closeHelpWindow()
{
    $("#Help_Window_Image")[0].style.visibility="hidden";
    $(".Tool_blocks")[0].style.visibility="visible";
}

function showHelpWindow()
{
    $("#Help_Window_Image")[0].style.visibility="visible";
    $(".Tool_blocks")[0].style.visibility="hidden";
}

//Add click event
document.querySelector('#canvasContainer').onclick = menu_lostFocus;
document.querySelector('#menu').onclick = menuClick;
document.querySelector("#create").onclick = EditMap;
document.querySelector("#save").onclick = saveMap;
document.querySelector("#help").onclick = showHelpWindow;
if(detectmob()==false){
    document.querySelector('#menu').onmouseover = menuOnHover;
    document.querySelector('#create').onmouseover = buttonOnHover_create;
}