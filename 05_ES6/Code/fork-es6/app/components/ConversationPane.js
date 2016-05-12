import React from 'react';
import Message from './Message';
import autoBind from 'react-autobind';
import samples from '../sample-data';

class ConversationPane extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  sortByDateDesc(a, b) {
    return a.time < b.time ? -1 : a.time > b.time ? 1 : 0;
  }
  loadSampleData(human) {
    this.setState({conversation: samples.humans[human].conversations});
  }
  // Handle when User navigates from / to /conversation/:human
  componentWillMount() {
    this.loadSampleData(this.props.params.human);
  }
  // Handle when User navigates between conversations
  componentWillReceiveProps(nextProps) {
    this.loadSampleData(nextProps.params.human);
  }
  renderMessage(val) {
    return <Message who={val.who} text={val.text} key={val.time.getTime()} />;
  }
  render() {
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
};

export default ConversationPane;
