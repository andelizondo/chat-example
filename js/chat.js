

/************************* DOC READY *************************/
$(document).ready(function () {
    /* JQuery Selectors */
    var messagesView = $('#MessagesView');

    /* Toggle Members Info Panel Btn Event */
    $('.info-btn').on('click', function () {
        $("#MessagesCollapse").toggleClass('col-sm-12 col-sm-9');
    });

    /* Send Message Btn Event */
    $('.message-send-button').on('click', function () {
        var textContents = $('.message-text-contents');

        /*var newMessage = new Message({
            message: textContents.val()
        });*/
        textContents.val('');

        //allMessages.add(newMessage, {at: 0});
        // newMessage.save();

        scrollMessages();
    });

    /* Set Messages View to Bottom */
    var scrollMessages = function (){
        messagesView.animate({scrollTop: messagesView.prop("scrollHeight")}, 1500);
    }();

});



/*var newConversation = new ConversationPost();
 newConversation.save();*/
/*    $('.contact-btn').on('click', function () {


 var loggedUser = allUsers.find(function(model) { return model.get('name') === 'Lee'; });/!*
 $('#MessagesView').animate({scrollTop: $('#MessagesView').prop("scrollHeight")}, 1000);
 allMessages.add(newMessage, {at: 0});
 newMessage.save();*!/


 /!*var newConversation = new ConversationPost();
 newConversation.save();*!/
 });*/