var socket_chat=io();

function deleteChatHistory()
{
    localStorage.removeItem("ChatHistory");
    $('#receiveBox').val('');
}

function loadChatBox()
{
    if(localStorage.getItem("ChatHistory")!=null)
    {
        loadChatHistory();
    }
}

function loadChatHistory()
{
    $('#receiveBox').val(localStorage.getItem("ChatHistory"));
}

function saveChatHistory()
{
    localStorage.setItem("ChatHistory", $('#receiveBox').val());
}

function  send_clientMessage()
{
    var message=$('#sendBox').val();
    if(message==''){
        return;
    }
    socket_chat.emit('message_client_public', message);
    $('#sendBox').val('');
}

function sendButton_Keydown()
{
    if(event.keyCode==13)
    {
        send_clientMessage();
    }
}

socket_chat.on('chat_public', function(msg){
    if($('#receiveBox').val()==" "||$('#receiveBox').val()=="")  
    {
        $('#receiveBox').val(msg);
    }
    else
    {
        $('#receiveBox').val($('#receiveBox').val()+"\n"+msg);
    }
    saveChatHistory();
    //Scroll to bottom to see the latest chat
    document.getElementById("receiveBox").scrollTop = document.getElementById("receiveBox").scrollHeight;
  });
