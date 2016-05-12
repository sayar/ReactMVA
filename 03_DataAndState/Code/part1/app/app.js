var React = require('react');
var ReactDOM = require('react-dom');

var samples = require('./sample-data');

var App = React.createClass({
  getInitialState: function() {
    return { 
      "humans": {},
      "stores": {}
    };
  },
  loadSampleData: function(){
    this.setState(samples);
  },
  render: function() {
    return (
      <div>
        <div id="header"></div>
        <button onClick={this.loadSampleData}>Load Sample Data</button>
        <div className="container">
          <div className="column">
            <InboxPane humans={this.state.humans}/>
          </div>
          <div className="column"></div>
          <div className="column"></div>
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
      <div id="inbox-pane">
        <h1>Inbox</h1>
        <table>
          <thead>
            <tr>
              <th>Chat Received</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.props.humans).map(this.renderConvoSum)}
          </tbody>
        </table>
      </div>
    )
  }
});

var InboxItem = React.createClass({ 
  sortByDate: function(a, b) {
      return a.time>b.time ? -1 : a.time<b.time ? 1 : 0;
  },
  messageSummary: function(conversations){
    var lastMessage = conversations.sort(this.sortByDate)[0];
    return lastMessage.who + ' said: "' + lastMessage.text + '" @ ' + lastMessage.time.toDateString();
  },
  render: function(){
    return (
      <tr>
        <td>{this.messageSummary(this.props.details.conversations)}</td>
        <td>{this.props.index}</td>
        <td>{this.props.details.orders.sort(this.sortByDate)[0].status}</td>
      </tr>
    )
  }
});

ReactDOM.render(<App/>, document.getElementById('main'));
