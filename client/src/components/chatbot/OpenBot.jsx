import React from 'react';
import ReactDOM from 'react-dom';
import ReactHtmlParser from 'react-html-parser';
import ChatContainer from './ChatContainer.jsx';
import CloseBot from './CloseBot.jsx';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ChatbotIcon } from '../../img/icn_chatbot.svg';

const BotBox = ({ visible }) =>
  <div id="bot" className={visible ? 'slideIn' : 'slideOut'}>
    <ChatContainer />
  </div>;

const SpeechBubble = props =>
  <div>
    <div className="open-bot-icon-circle">
{/*      <img src={props.imgSrc} alt="open chatbot icon"/>
*/}      
      <div className="open-bot-icon-text">Chat</div>
      <div className="open-bot-icon"><i className="material-icons md-36">chat_bubble</i></div>
    </div>
    {/* dont delete. might need if we decide to add to text menu
      <div className="text-bot-icon">
      Chat <i className="material-icons md-18">chat_bubble</i>
    </div>*/}
  </div>;

const MobileSpeechBubble = props =>
  <div className="open-bot-icon-m-circle">
{/*    <img src={ChatbotIcon} alt="open chatbot icon"/>
*/}    
    <div className="open-bot-icon-m"><i className="material-icons md-36">chat_bubble</i></div>
  </div>;

class OpenBot extends React.Component {
  constructor(props) {
    super(props);
    this.onTouchStart = this.handleTouchStart.bind(this);
    this.onTouchMove = this.handleTouchMove.bind(this);
    this.onTouchEnd = this.handleTouchEnd.bind(this);
    // this.toggleSwiped = this.toggleSwiped.bind(this);
    // this.state = {swiped : false};
    this.swipe = {};
    this.minDistance = 50;
  }

  handleTouchStart(e){
    let touchObj = e.touches[0];
    this.swipe = {x:touchObj.clientX};
    // swiped = false;
    // this.setState(this.toggleSwiped(false));
  }

  handleTouchMove(e){
    if (e.changedTouches && e.changedTouches.length){
      const touchObj = e.changedTouches[0];
      this.swipe.swiping = true;
    }
  }

  handleTouchEnd(e){
    const touchObj = e.changedTouches[0];
    const dist = touchObj.clientX - this.swipe.x;
    if (this.props.visible && this.swipe.swiping && dist>this.minDistance){
      // this.setState(this.toggleSwiped(true));
      // swiped = true;
      this.props.onSwipe();
      // console.log("swiped", swiped);
    }
    this.swipe = {};
  }

  // toggleSwiped(toggle){
  //   return (prevState, toggle) => ({swiped: prevState.swiped && toggle  });
  // }

  render() {
    return (
      // wrapper completely hides bot until chat icon is clicked
      <div id="wrapper" className={this.props.visible ? 'bot-is-open' : 'bot-is-closed'} ref={el => (this.wrapperRef=el)} onTouchStart={(e) => this.handleTouchStart(e)} onTouchMove={(e) => this.handleTouchMove(e)} onTouchEnd={(e) => this.handleTouchEnd(e)}>
        <div className="chat-icon" onClick={this.props.onClick.bind(this)} >
          {this.props.visible
            ? <CloseBot
              handleClickOutside={event => this.props.handleClickOutside(event, this.wrapperRef)}
            />
            : <SpeechBubble imgSrc={ChatbotIcon}/>}
        </div>
        <Link to="mbot">
          <MobileSpeechBubble />
        </Link>

        <BotBox visible={this.props.visible} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  visible: state.chat.botVisibility,
});

const mapDispatchToProps = dispatch => ({
  onClick(event) {
    dispatch({ type: 'TOGGLE_BOT' });
  },

  handleClickOutside (event, wrapperRef) {
    if (wrapperRef && event.target.tagName !== 'HTML' && !wrapperRef.contains(event.target) ){
      // console.log(event.target.tagName);
      dispatch({type: "TOGGLE_BOT"});
    }
  }, 

  onSwipe () {
    dispatch({type: "TOGGLE_BOT"});
  }
  
});

export default connect(mapStateToProps, mapDispatchToProps)(OpenBot);
