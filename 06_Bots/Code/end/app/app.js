var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var $ = require('jquery');

var browserHistory = ReactRouter.browserHistory;
var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var Link = ReactRouter.Link;

var db = require('./sample-data');

require("./app.css");

var App = React.createClass({
  getInitialState: function() {
    return { 
      "humans": {},
      "stores": {}
     };
  },
  loadSampleData: function(){
    this.setState(db);
  },
  fetchData: function(){
    $.get('/api/humans', function (result) {
      for (var key in result) {
        for(var conv in result[key].conversations){
          result[key].conversations[conv].time = new Date(result[key].conversations[conv].time)
        }
      }
      this.setState({'humans': result});
      db = this.state;
    }.bind(this));
  },
  // Handle when user navigates to a conversation directly without first loading the index...
  componentWillMount: function(){
    if('human' in this.props.params){
      this.loadSampleData();
    }
  },
  render: function() {
    return (
      <div>
        <div id="header"></div>
        <button onClick={this.loadSampleData}>Load Sample Data</button>
        <button onClick={this.fetchData}>Fetch Data</button>
        <div className="container">
          <InboxPane humans={this.state.humans} />
          {this.props.children || <div id="conversation-pane" className="column"><h4>Select a Conversation from the Inbox</h4></div>}
          <StorePane stores={this.state.stores} />
        </div>
      </div>
    )
  }
});

var InboxPane = React.createClass({
  renderConvoSum: function(human){
    return <InboxItem key={human} index={human} details={this.props.humans[human]} />;
  },
  render : function() {
    return (
      <div id="inbox-pane" className="column">
        <h1>Inbox</h1>
        {Object.keys(this.props.humans).map(this.renderConvoSum)}
      </div>
    )
  }
});

var InboxItem = React.createClass({
  mixins: [PureRenderMixin],

  sortByDate: function(a, b) {
    return a.time>b.time ? -1 : a.time<b.time ? 1 : 0;
  },
  messageSummary: function(conversations){
    var lastMessage = conversations.sort(this.sortByDate)[0];
    return lastMessage.who + ' said: "' + lastMessage.text + '" @ ' + lastMessage.time.toDateString();
  },
  render: function(){
    return (
      <div className="inbox-item">
        <Link to={'/conversation/' + encodeURIComponent(this.props.index)}>Conversation with {this.props.index}</Link> ({this.props.details.orders.sort(this.sortByDate)[0].status})
      </div>
    )
  }
});

var ConversationPane = React.createClass({
  loadData: function(human){
    this.setState({conversation: db.humans[human].conversations});
  },
  // Handle when User navigates from / to /conversation/:human
  componentWillMount: function() {
    this.loadData(this.props.params.human);
  },
  // Handle when User navigates between conversations
  componentWillReceiveProps: function(nextProps) {
    this.loadData(nextProps.params.human);
  },

  sortByDateDesc: function(a, b) {
    return a.time < b.time ? -1 : a.time > b.time ? 1 : 0;
  },

  renderMessage: function(val){
    return <Message who={val.who} text={val.text} key={val.text+val.time.getTime()} />;
  },
  render: function() {
    return (
      <div id="conversation-pane" className="column">
        <h1>Conversation</h1>
        <h3>{this.props.params.human}</h3>
        <div id="messages">
         {this.state.conversation.sort(this.sortByDateDesc).map(this.renderMessage)}
        </div>
      </div>
    )
  }
});

var Message = React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return (
      <p className={this.props.who}><img src={require('./assets/' + this.props.who + '.png')} /> "{this.props.text}"</p>
    )
  }
});

var StorePane = React.createClass({
  renderStore: function(store){
    return <Store key={store} index={store} details={this.props.stores[store]} />;
  },
  render: function() {
    return (
      <div id="stores-pane" className="column">
        <h1>Stores & Ovens</h1>
        <ul>
          {Object.keys(this.props.stores).map(this.renderStore)}
        </ul>
      </div>
    )
  }
});

var Store = React.createClass({
  mixins: [PureRenderMixin],

  getCount: function(status){
    return this.props.details.orders.filter(function(n){ return n.status === status}).length;
  },
  render: function(){
    return (
      <div className="store">
        <div className="name">{this.props.index}</div>
        <div className="orders">
          <div><img src={require('./assets/order-confirmed.png')}/> {this.getCount("Confirmed")}</div>
          <div><img src={require('./assets/order-oven.png')}/> {this.getCount("In The Oven")}</div>
          <div><img src={require('./assets/order-delivered.png')}/> {this.getCount("Delivered")}</div>
        </div>
      </div>
    )
  }
});

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/conversation/:human" component={ConversationPane}></Route>
    </Route>
  </Router>
), document.getElementById('main'))
