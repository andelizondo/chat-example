/************************* DOC READY *************************/
$(document).ready(function () {

    /* Send Message Btn Event */
    $('.message-send-button').on('click', function () {
        sendMessage();
    });

    /* Toggle Members Info Panel Btn Event */
    $('.info-btn').on('click', function () {
        $("#MessagesCollapse").toggleClass('col-sm-12 col-sm-9');
    });

    /* Trigger click when Enter */
    $("#messageText").keyup(function(event){
        if(event.keyCode == 13){
            sendMessage();
        }
    });
});