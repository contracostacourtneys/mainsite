import React from 'react';
import ReactDOM from 'react-dom';
import ReactHtmlParser from 'react-html-parser';
import ChatIcon from './icons/ChatIcon.jsx';
import ChatContainer from './ChatContainer.jsx';
import {connect} from 'react-redux';

const BotBox = ({ visible }) => {

  return (
  <div id="bot" className={visible?'slideIn':'slideOut'} >
    <ChatContainer />
  </div>
  );

}

// class NavigationBar extends React.Component = ({ visible }) =>
//   <div id="navbar" className={visible ? 'slideIn' : 'slideOut'}>
//     <ChatContainer />
//   </div>;
const SpeechBubble = (props) => {
  let className;
  if (props.visible){
    className = 'hide-speech-bubble';
  }
  return (
    <div className={className}>
      <svg
              fill="#7fcde5"
              height="36"
              viewBox="0 0 24 24"
              width="36"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              <path d="M0 0h24v24H0z" fill="none" />
      </svg>

    </div>
    );

};


class OpenBot extends React.Component {
  constructor(props) {
    super(props);
    // this.handleClick = this.handleClick.bind(this);
    // this.state = { visible: false };
  }

  // handleClick() {
  //   this.setState(prev => ({ visible: true}));
  // }

  render() {
    // let chatContainerCSS;
    // if (this.state.visible){
    //   chatContainerCSS=

    // }
    return (
      // wrapper completely hides bot until chat icon is clicked
      <div id="wrapper">
        <div className="chat-icon" onClick={this.props.onClick.bind(this)}>
          {this.props.visible
            ? <SpeechBubble visible={this.props.visible}/>
            : <SpeechBubble /> }
        </div>
        <BotBox visible={this.props.visible} /> 
      </div>
    );
  }
}

const mapStateToProps = state => ({
    visible: state.chat.botVisibility
});

const mapDispatchToProps = dispatch => ({
  onClick() {
    dispatch({type: "TOGGLE_BOT"})
  }
});

// ReactDOM.render(<OpenBot />, document.getElementById('root'));
export default connect(mapStateToProps, mapDispatchToProps)(OpenBot);
