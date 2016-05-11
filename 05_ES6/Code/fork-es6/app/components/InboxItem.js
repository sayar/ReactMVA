import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import autoBind from 'react-autobind';

class InboxItem extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  sortByDate(a, b) {
    return a.time>b.time ? -1 : a.time<b.time ? 1 : 0;
  }
  
  messageSummary(conversations) {
    var lastMessage = conversations.sort(this.sortByDate)[0];
    return lastMessage.who + ' said: "' + lastMessage.text + '" @ ' + lastMessage.time.toDateString();
  }
  
  render() {
    return (
      <div className="inbox-item">
        <Link to={'/conversation/' + encodeURIComponent(this.props.index)}>Conversation with {this.props.index}</Link> ({this.props.details.orders.sort(this.sortByDate)[0].status})
      </div>
    )
  }
};

export default InboxItem;
