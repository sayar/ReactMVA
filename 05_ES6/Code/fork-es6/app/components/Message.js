import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import autoBind from 'react-autobind';

class Message extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      <p className={this.props.who}><img src={'/app/assets/' + this.props.who + '.png'} /> "{this.props.text}"</p>
    )
  }
};

export default Message;
