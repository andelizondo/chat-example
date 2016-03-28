/************************* DOC READY *************************/
$(document).ready(function () {

    /* Send Message Btn Event */
    $('.message-send-button').on('click', function () {
        sendMessage();
    });
    /* Trigger click when Enter */
    $("#MessageText").keyup(function(event){
        if(event.keyCode == 13){
            sendMessage();
        }
    });

    /* Create Conversation Btn Event */
    $('.create-conversation-button').on('click', function () {
        createConversation();
    });
    /* Trigger click when Enter */
    $("#ConverstionName").keyup(function(event){
        if(event.keyCode == 13){
            createConversation();
        }
    });

});

/*********************** GLOBAL FUNCTIONS ********************/

/* Toggle Members Info Panel Btn Event */
function toggleConversationInfo() {
    $("#MessagesCollapse").toggleClass('col-sm-12 col-sm-9');
}

// Reset Selected Conversation View & Messages View
function clearMessages(){
    selectedConversation.clear();
    messages.reset();
    participants.reset();
}