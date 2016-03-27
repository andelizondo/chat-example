/************************* DOC READY *************************/
$(document).ready(function () {

    /* Send Message Btn Event */
    $('.message-send-button').on('click', function () {
        sendMessage();
    });
    /* Trigger click when Enter */
    $("#messageText").keyup(function(event){
        if(event.keyCode == 13){
            sendMessage();
        }
    });

});

/*********************** GLOBAL FUNCTIONS ********************/

/* Toggle Members Info Panel Btn Event */
function toggleConversationInfo() {
    $("#MessagesCollapse").toggleClass('col-sm-12 col-sm-9');
}