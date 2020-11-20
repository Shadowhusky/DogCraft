function alignScreenRotationWindow()
{
    var canvasContainer = $('.GamingArea')[0];
    var rotateScreenWindow=$("#Alarm_RotateScreen")[0];
    var doge=$("#rotatescreen")[0];
    if(canvasContainer.clientHeight/canvasContainer.clientWidth>1)
    {
        doge.style.left = $('.GamingArea')[0].clientWidth/2 - doge.offsetWidth/2;    //Set loading icon to screen central
        doge.style.top = $('.GamingArea')[0].clientHeight/2 - doge.offsetHeight/2;
        rotateScreenWindow.style.visibility="visible";
        $(".Tool_blocks")[0].style.visibility="hidden";

        $(".chatBox")[0].style.left=0;
        $(".chatBox")[0].style.width="100%";
        $(".chatBox")[0].style.height="30%";

        $("#deleteChatHistory")[0].style.width="6vh";
        $("#deleteChatHistory")[0].style.height="6vh";
        $("#deleteChatHistoryIcon")[0].style.fontSize="5.5vh";

        //Hide map editor
        if($("#foldIcon").length)
        {
            for(var index in mapEditorAmine_Fold)
            {
                mapEditorAmine_Fold[index].pause();
                $("#itemIconBack"+index).css("left", "-1000");
                $("#itemIcon"+index).css("left", "-1000");
                $("#foldIcon").css("left", "-1000");
            }
        }

        AnimateDogeRotation.restart();
    }
    else{
        $(".Tool_blocks")[0].style.visibility="visible";
        rotateScreenWindow.style.visibility="hidden";

        $(".chatBox")[0].style.left="80%";
        $(".chatBox")[0].style.width="20%";
        $(".chatBox")[0].style.height="30%";

        $("#deleteChatHistory")[0].style.width="2vw";
        $("#deleteChatHistory")[0].style.height="2vw";
        $("#deleteChatHistoryIcon")[0].style.fontSize="1.8vw";
        
        AnimateDogeRotation.pause();
    }
}


var AnimateDogeRotation = anime.timeline({
    loop: true,
  });

AnimateDogeRotation.
add({
    targets: '#rotatescreen',
    delay: 1000,
    rotate: [
        {
        direction: 'normal',
        easing: 'spring(1, 80, 30, 0)',},
        {
            direction: 'alternate',
            value: -20,
            duration: 600},
        {
            direction: 'alternate',
            value: 90,
            duration: 450},
        {
            direction: 'alternate',
            value: 0,
            duration: 400},
    ]
});
