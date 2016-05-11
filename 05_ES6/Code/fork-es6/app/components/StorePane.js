import React from 'react';
import Store from './Store';
import autoBind from 'react-autobind';

class StorePane extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  
  renderStore(store){
    return <Store key={store} index={store} details={this.props.stores[store]} />;
  }
  
  render() {
    return (
      <div id="stores-pane" className="column">
        <h1>Stores & Ovens</h1>
        <ul>
          {Object.keys(this.props.stores).map(this.renderStore)}
        </ul>
      </div>
    )
  }
};

export default StorePane;
