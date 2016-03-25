/**************************** MODELS & COLLECTIONS ************************/

/******************* User Model */
var User = Backbone.Model.extend({
    url: function () {
        return 'http://assignment.bunq.com/user/';// + this.id;
    }
});
/* User Collection */
var Users = Backbone.Collection.extend({
    model: User,
    url: "http://assignment.bunq.com/users"
});

/********************** Conversation Model */
var Conversation = Backbone.Model.extend({
});
/* Conversation Collection */
var Conversations = Backbone.Collection.extend({
    url: function () {
        return 'http://assignment.bunq.com/conversation/user/' + this.userModel.toJSON().id;
    }
});
/* Conversation POST */
/*var ConversationPost = Backbone.Model.extend({
    url: 'http://assignment.bunq.com/conversation/group',
    defaults: {
        users: '2,3',
        name: 'Work Chat'
    }
});*/

/*********************** Message Model */
/*var Message = Backbone.Model.extend({
    url: 'http://assignment.bunq.com/conversation/10/message/send',
    defaults: {
        senderId: '2'
    }
});
/!* Message Collection *!/
var Messages = Backbone.Collection.extend({
    url: 'http://assignment.bunq.com/conversation/10/message/limited?limit=30&offset=0'
});*/


/******************************** VIEWS ***********************************/

/******************* Contact View ************/
var ContactView = Backbone.View.extend({
    model: new User(),
    tagName: 'div',
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
        new ConversationsView(this.model);
        $('#ContactsCollapse').collapse('toggle');
    }
});
/* Contacts View */
var ContactsView = Backbone.View.extend({
    model: new Users(),
    el: '#ContactsView',

    initialize: function () {
        this.listenTo(this.model, 'sync', this.render);
        this.model.fetch();
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

/********************** Conversation View ***********/
var ConversationView = Backbone.View.extend({
    model: new Conversation(),
    tagName: 'div',
    className: 'conversation btn',

    initialize: function (){
        this.template = _.template($('#ConversationTemplate').html());
    },
    render: function (){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});
/* Conversation Collection View */
var ConversationsView = Backbone.View.extend({
    el: '#ConversationsView',
    model: new Conversations(),

    initialize: function (userModel) {
        this.model.userModel = userModel;

        this.listenTo(this.model, 'sync', this.render);
        this.model.fetch();
    },
    render: function (){
        var cache = document.createDocumentFragment();
        this.model.each(function(_model){
            cache.appendChild(new ConversationView({
                model: _model
            }).render().el);
        });
        this.$el.html(cache);
    }
});


/*********************** Message View ********************/
/*var MessageView = Backbone.View.extend({
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
/!* Messages Collection View *!/
var MessagesView = Backbone.View.extend({
    model: new Messages,
    el: '#MessagesView',

    initialize: function () {
        this.model.on('add', this.render, this);
        this.model.fetch();
    },
    render: function (){
        var cache = document.createDocumentFragment();
        this.model.each(function(_model){
            cache.appendChild(new MessageView({
                model: _model
            }).render().el);
        });
        this.$el.html(cache);
    }
});*/


/*********************** Instantiate ****************/
new ContactsView();
// var contactsView = new ContactsView();
//var messagesView = new MessagesView();
//var conversationsView = new ConversationsView();











/*

 //this.model.on('add', this.render, this);

 THIS IS FOR var ContactsView = Backbone.View.extend({
 initialize: function () {
 this.model.on('add', this.render, this);
 //this.listenTo(this.model, 'sync', this.render);
 this.model.fetch({
 success: function(response){
 _.each(response.toJSON(), function (item) {
 console.log('Successfully GOT item with id: ' + item.id);
 });
 },
 error: function (){
 _.each(response.toJSON(), function (item) {
 console.log('Failed to get Users');
 });
 }
 });
 },
* */