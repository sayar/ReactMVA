// Create bot and add dialogs
var restify = require('restify');
var builder = require('botbuilder');
var request = require('request');

var server = restify.createServer();
var model = 'https://api.projectoxford.ai/luis/v1/application?id=' + process.env.LUIS_ID + '&subscription-key=' + process.env.LUIS_KEY
var dialog = new builder.LuisDialog(model);
var bot = new builder.BotConnectorBot({ appId: process.env.APP_ID, appSecret: process.env.APP_SECRET });
bot.add('/', dialog);

// initalize array to store pizza orders
var pizzaOrders = [];

// Triggered by saying 'hi'
dialog.on('Greeting', [
    function (session, args, next) {
        // prompt user to order pizza    
        session.send("Hi, can I take your order?");
    },
])

// Triggered by ordering a pizza
dialog.on('OrderPizza', [
    function (session, args, next) {
        // initialize empty array that will be passed on until end that holds conversations
        var conversations = [];
        conversations.push({ who: "bot", text: "Hi, can I take your order?", time: new Date().toLocaleString() });
        // get the size
        var size = builder.EntityRecognizer.findEntity(args.entities, 'Size');
        // get the toppings
        var toppings = builder.EntityRecognizer.findAllEntities(args.entities, 'Topping');
        // store conversations
        session.dialogData.conversations = conversations;
        // store size
        session.dialogData.size = size.entity;
        // store toppings
        session.dialogData.toppings = toppings.map(function (topping) { return topping.entity });
        var pizzas = [];
        session.dialogData.pizzas = pizzas;
        var order = {};
        session.dialogData.order = order;
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
        var time = new Date().toLocaleString();
        // store pizza information
        session.dialogData.pizzas.push({ size: session.dialogData.size, toppings: session.dialogData.toppings });
        // store conversation 
        session.dialogData.order.conversations = session.dialogData.conversations;
        session.dialogData.order.pizzas = session.dialogData.pizzas;
        // store time
        session.dialogData.order.time = time;
        // total price 
        session.dialogData.order.price = 15;
        // store address
        session.dialogData.order.address = session.dialogData.address;
        // store status
        session.dialogData.order.status = 'confirmed';
        // add pizza order to array of orders
        pizzaOrders.push(session.dialogData.order);
        next();
    },    
    function(session, results){
        session.endDialog('Thank you for your order!');
    }
]);


// Serve a static web page
server.get('/index', restify.serveStatic({
	'directory': '.',
	'default': 'index.html'
}));

// Store pizza orders into memory
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/pizzaorders', function (req, res, next) {
   res.send({'orders': pizzaOrders});
   return next();
});

// Handle Bot Framework messages
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());

server.listen(process.env.PORT || 8080, function () {
    console.log('%s listening to %s', server.name, server.url); 
});