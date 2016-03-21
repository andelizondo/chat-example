/* Jquery Selectors */
var contacts = $("#Contacts");
var conversationWrap = $(".conversation-wrap");
var members = $("#Members");
var messageWrap = $(".message-wrap");

/* Toggle Contacts Visibility */
contacts.on("show.bs.collapse", function(){
    conversationWrap.hide();
    contacts.css( "display", "block")
});
contacts.on("hide.bs.collapse", function(){
    contacts.css( "display", "none");
    conversationWrap.show();
});

/* Toggle Members Visibility & Message Size */
members.on("show.bs.collapse", function(){
    messageWrap.addClass("col-sm-6");
    messageWrap.removeClass("col-sm-9");
    members.css( "display", "block");
});
members.on("hide.bs.collapse", function(){
    members.css( "display", "none");
    messageWrap.removeClass("col-sm-6");
    messageWrap.addClass("col-sm-9");
});
