var builder = require('botbuilder');

var model = 'https://api.projectoxford.ai/luis/v1/application?id=' + process.env.LUIS_ID + '&subscription-key=' + process.env.LUIS_KEY
var dialog = new builder.LuisDialog(model);
var bot = new builder.BotConnectorBot({ appId: process.env.APP_ID, appSecret: process.env.APP_SECRET });
bot.add('/', dialog);

function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

// initalize humans-orders
var humans = {};

// Triggered by saying 'hi'
dialog.on('Greeting', [
    function (session, args, next) {
        // prompt user to order pizza    
        session.send("Hi, What is your name and can I take your order?");
    },
])

// Triggered by ordering a pizza
dialog.on('OrderPizza', [
    function (session, args, next) {
        // initialize empty array that will be passed on until end that holds conversations
        var conversations = [];
        conversations.push({ who: "bot", text: "Hi, What is your name and can I take your order?", time: new Date().toLocaleString() });
        // store conversations
        session.dialogData.conversations = conversations;
        
        var name = builder.EntityRecognizer.findAllEntities(args.entities, 'Name');
        if( Array.isArray(name)) {
            name[0] = name[0].entity;
            name = name.reduce(function(a, b){ return a + b.entity});
        }
        session.dialogData.human_name = toTitleCase(name.trim());
        
        // get the size
        var size = builder.EntityRecognizer.findEntity(args.entities, 'Size');
        // store size
        session.dialogData.size = size.entity;
        
        // get the toppings
        var toppings = builder.EntityRecognizer.findAllEntities(args.entities, 'Toppings');
        if(Array.isArray(toppings)){
            toppings = toppings.map(function (a) { return a.entity });
        } else {
            toppings = [topping.entity];
        }
        // store toppings
        session.dialogData.toppings = toppings;
        session.dialogData.pizzas = [];
        session.dialogData.order = {};
        next();
    },
    function (session, results, next) {
        // save order request user made
        session.dialogData.conversations.push({ who: "human", text: session.message.text, time: new Date().toLocaleString() });
        next();
    },
    function (session, results, next) {
        // prompt user for address
        session.dialogData.conversations.push({ who: "bot", text: "Where would like it delivered", time: new Date().toLocaleString() });
        builder.Prompts.text(session, "Where would you like it delivered?");
        next();
    },
    function (session, results, next) {
        // store the address
        session.dialogData.address = results.response;
        session.dialogData.conversations.push({ who: "human", text: session.dialogData.address, time: new Date().toLocaleString() });
        next();
    },
    function (session, results, next) {
        var name = session.dialogData.human_name;
        if(!(name in humans)){
            humans[name] = {
                'conversations': [],
                'orders': []
            }
        }
        humans[name].conversations.push.apply(humans[name].conversations, session.dialogData.conversations)
        humans[name].orders.push({
            'time': new Date(),
            'status': 'confirmed',
            'address': session.dialogData.address,
            'price': 15,
            'pizzas': [{
                'size': session.dialogData.size, 
                'toppings': session.dialogData.toppings
            }]
                
        });
        next();
    },    
    function(session, results){
        session.endDialog('Thank you for your order!');
    }
]);

var express = require('express');
var path = require('path');
var app = express();

app.get('/api/humans', function (req, res) {
   return res.json(humans);
});

app.get('/api/clear', function(req, res) {
    humans = {};
    res.sendStatus(200);
});

// Handle Bot Framework messages
app.post('/api/messages', bot.verifyBotFramework(), bot.listen());

app.use('/chat', express.static(path.join(__dirname, '')));
app.use('/', express.static(path.join(__dirname, '../dist')));

app.listen(process.env.PORT || 8080);
