import React, { Component } from 'react';
import ChatContainer from './ChatContainer.jsx';
import OpenBot from './OpenBot.jsx';
import { connect } from 'react-redux';



class Bot extends Component {
	constructor(props) {
		super(props);
	}


	render() {
    return (
      <div className={ this.props.visible ? "position-bot the-bot bot-z-index": "position-bot the-bot "}>
        <OpenBot ref={el => (this.chatWindow = el)}/>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  visible: state.chat.botVisibility,
});

// export default Bot;
export default connect(mapStateToProps)(Bot);

/* 

class Bot extends React.Component {
  render() {
    return (
      <div>
        <div className="position-bot the-bot">
          <OpenBot ref={el => (this.chatWindow = el)} />
        </div>
      </div>
    );
  }
}

export default Bot;

 + (this.props.visible ? 'bot-is-open' : 'bot-is-closed')
*/