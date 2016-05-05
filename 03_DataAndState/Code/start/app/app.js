var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
  render : function() {
    return (
      <div>
        <div id="header"></div>
        <div className="container">
          <div className="column">
            <Inbox />
          </div>
          <div className="column"></div>
          <div className="column"></div>
        </div>
      </div>
    )
  }
});

var Inbox = React.createClass({
  render : function() {
    return (
      <div id="inbox">
        <h1>Inbox</h1>
        <table>
          <tr>
            <th>Chat Received</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
          <ConversationSummary />
        </table>
      </div>
    )
  }
});

var ConversationSummary = React.createClass({
  render: function(){
    return (
      <tr>
        <td>5PM</td>
        <td>Rami Loves Pizza</td>
        <td>Order Sent</td>
      </tr>
    )
  }
});

ReactDOM.render(<App/>, document.querySelector('#main'));
