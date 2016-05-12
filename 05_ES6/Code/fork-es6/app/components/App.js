import React from 'react';
import InboxPane from './InboxPane';
import StorePane from './StorePane';
import autoBind from 'react-autobind';
import samples from '../sample-data';

class App extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
 
    this.state = { 
      "humans": {},
      "stores": {}
    };
  }
  
  loadSampleData() {
    this.setState(samples);
  }
  
  // Handle when user navigates to a conversation directly without first loading the index...
  componentWillMount() {
    if('human' in this.props.params){
      this.loadSampleData();
    }
  }
  
  render() {
    return (
      <div>
        <div id="header"></div>
        <button onClick={this.loadSampleData}>Load Sample Data</button>
        <div className="container">
          <InboxPane humans={this.state.humans} />
          {this.props.children || <div id="conversation-pane" className="column"><h4>Select a Conversation from the Inbox</h4></div>}
          <StorePane stores={this.state.stores} />
        </div>
      </div>
    )
  }
};

export default App;
