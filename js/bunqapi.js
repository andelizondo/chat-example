/******************* User Model ****************/
var User = Backbone.Model.extend({
    url: function () {
        return 'http://assignment.bunq.com/user/' + id;
    }
});
var Users = Backbone.Collection.extend({
    model: User,
    url: "http://assignment.bunq.com/users"
});


/********************** Conversation Model ****************/
var Conversation = Backbone.Model.extend({
});
var Conversations = Backbone.Collection.extend({
    url: function () {
        return 'http://assignment.bunq.com/conversation/user/' + loggedUser.attributes.id;
    }
});


/*********************** Message Model **************************/
var Message = Backbone.Model.extend({
    url: function () {
        return 'http://assignment.bunq.com/conversation/' + selectedConversation.attributes.conversation.id + '/message/send';
    }
});
var Messages = Backbone.Collection.extend({
    url: function () {
        return 'http://assignment.bunq.com/conversation/' + selectedConversation.attributes.conversation.id + '/message/limited?limit=30&offset=0';
    }
});


/********************** Participants Model ****************/
var Participant = Backbone.Model.extend({
});
var Participants = Backbone.Collection.extend({
    model: Participant
});


/*************************************************** INSTANTIATE ******************************************************/

var users = new Users();
var conversations = new Conversations();
var messages = new Messages();
var participants = new Participants();

var loggedUser = new User();
var selectedConversation = new Conversation();


/********************************************************* VIEWS ******************************************************/

/******************* Contact View ***************************/
var ContactView = Backbone.View.extend({
    className: 'contact btn',

    initialize: function (){
        this.template = _.template($('#ContactTemplate').html());
    },
    render: function (){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        "click": "loadConversations"
    },
    loadConversations: function(){
        loggedUser = this.model;
        conversations.fetch().done(function(){
            // To update GUI after fetching the data;
            $('#ConversationsView').animate({scrollTop: 0}, 400);
        });

        // To update GUI while fetching the data;
        $('#loggedUser').html(loggedUser.attributes.name);
        $('#ContactsCollapse').collapse('toggle');
    }
});
var ContactsView = Backbone.View.extend({
    model: users,
    el: '#ContactsView',

    initialize: function () {
        this.listenTo(this.model, 'sync', this.render);
    },
    render: function (){
        var cache = document.createDocumentFragment();
        this.model.each(function(_model){
            cache.appendChild(new ContactView({
                model: _model
            }).render().el);
        });
        this.$el.html(cache);
    }
});


/********************** Conversation View **************************/
var ConversationView = Backbone.View.extend({
    tagName: 'div',
    className: 'conversation btn',

    initialize: function (){
        this.template = _.template($('#ConversationTemplate').html());
    },
    render: function (){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        "click": "loadMessages"
    },
    loadMessages: function(){
        selectedConversation = this.model;
        messages.fetch().done(function(){
            // To update GUI after fetching the data;
            $('#MessagesView').animate({scrollTop: $('#MessagesView').prop("scrollHeight")}, 500);
        });
        new ParticipantsView();
        
        // To update GUI while fetching the data;
        $('#selectedConversation').html(selectedConversation.attributes.conversation.name);
    }
});
var ConversationsView = Backbone.View.extend({
    model: conversations,
    el: '#ConversationsView',

    initialize: function () {
        this.listenTo(this.model, 'sync', this.render);
    },
    render: function (){
        this.$el.empty();
        var container = document.createDocumentFragment();
        _.each(this.model.models, function(subview) {
            // Generate Conversation Name
            var conversationAttributes = subview.attributes.conversation;
            if (conversationAttributes.name == null){
                var convUsers = $.grep(subview.attributes.users, function(e){ return e.userid != conversationAttributes.userid; });
                var convUser = users.where({id: (convUsers.length > 0) ? convUsers[0].userid : '' });
                conversationAttributes.name = (convUser.length > 0) ? convUser[0].attributes.name : 'Me!';
            }

            container.insertBefore(new ConversationView({
                model: subview
            }).render().el, container.firstChild);
        });
        this.$el.append(container);
    }
});


/*********************** Message View ********************/
var MessageView = Backbone.View.extend({
    model: new Message(),
    tagName: 'div',
    className: 'msg',

    initialize: function (){
        this.template = _.template($('#MessageTemplate').html());
    },
    render: function (){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});
var MessagesView = Backbone.View.extend({
    model: messages,
    el: '#MessagesView',

    initialize: function () {
        this.listenTo(this.model, 'sync', this.render);
    },
    render: function (){
        this.$el.empty();
        var container = document.createDocumentFragment();
        _.each(this.model.models, function(subview) {
            // Generate Sender Name
            var msgUser = users.where({id: subview.attributes.senderId });
            subview.attributes.senderName = (msgUser.length > 0) ? msgUser[0].attributes.name : 'Ghost';

            container.insertBefore(new MessageView({
                model: subview
            }).render().el, container.firstChild);
        });
        this.$el.append(container);
    }
});


/*********************** Participant View ********************/
var ParticipantView = Backbone.View.extend({
    model: new Participant(),
    tagName: 'div',
    className: 'contact',

    initialize: function (){
        this.template = _.template($('#ParticipantTemplate').html());
    },
    render: function (){
        this.$el.html(this.template(this.model));
        return this;
    }
});
var ParticipantsView = Backbone.View.extend({
    el: '#ParticipantsView',

    initialize: function () {
        this.render();
    },
    render: function (){
        this.$el.empty();
        var container = document.createDocumentFragment();
        _.each(selectedConversation.attributes.users, function(subview) {
            // Generate Participant Name
            var participant = users.where({id: subview.userid });
            subview.participantName = (participant.length > 0) ? participant[0].attributes.name : 'Ghost';
            
            container.appendChild(new ParticipantView({
                model: subview
            }).render().el);
        });
        this.$el.append(container);
    }
});


/*************************************************** INSTANTIATE ******************************************************/
var contactsView = new ContactsView();
var conversationsView = new ConversationsView();
var messagesView = new MessagesView();

users.fetch();


/* SEND MESSAGE */
function sendMessage() {
    var newMessage = new Message({
        message: $('.message-text-contents').val(),
        senderId: loggedUser.id,
        timestamp: 'Just sent'
    });
    $('.message-text-contents').val('');

    messages.add(newMessage, {at: 0});
    newMessage.save().done(function () {
        // To update GUI after fetching the data;
        $('#MessagesView').animate({scrollTop: $('#MessagesView').prop("scrollHeight")}, 1500);
    });
}