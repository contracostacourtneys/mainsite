import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import SquareBox from '../template/square-box.js';
import SquareBoxStatic from '../template/square-box-static.js';
import ViewProfile from '../profile/view-profile';
import Upcoming from '../calendar/upcoming';
import MyForms from './FormsBoxes/my-forms';
import MyCases from '../cases/my-cases';
import TitleLine from '../template/title-line';

// import ViewTodo from '../todo/view-todo';
import { API_URL, fetchUser, fetchAzureUser } from '../../actions/index';
// import axios from 'axios';
// import Cookies from 'universal-cookie';
// const cookie = new Cookies();

import SearchIcon from '../../img/icn_search.svg';
import LoginIcon from '../../img/icn_login.svg';
import Cookies from 'universal-cookie';
const cookie = new Cookies();

class Portal extends Component {
  componentWillMount() {
    // Fetch user data prior to component mounting
    if (this.props.authenticated){
      const user = cookie.get('user');
      const uid = user._id;
      this.props.fetchUser(uid);
    } 
    // else {
    //   const uid = this.props.location.pathname.substring(8);
    //   if (uid.length > 0){
        // this.props.fetchAzureUser();
    //   }
    //   console.log('uid: ', uid);
    // }
    
  }

  componentDidMount() {
    console.log("this props: ", this.props);
  }

  renderLinks() {
    if (this.props.authenticated) {
      return [

        <div key={`${1}profile`} className="Portal-box Portal-box-profile">
          <ViewProfile />
        </div>,
        // ============================
        <div key={`${2}cases`} className="Portal-box Portal-box-cases">
          <MyCases />
        </div>,
        // ============================
        // hide forms component for now
        // <div key={`${3}forms`}>
        //   <MyForms />
        // </div>,
        // ============================
        // hide "Find a Court Case" for now
        // <div className="Square-box-container" key={`${5}search`}>
          
        //   <Link to='find-a-case'>
        //     <SquareBoxStatic
        //       boxTitle='Find a Court Case'
        //       imgSrc={SearchIcon} />
        //   </Link>
        // </div>,
        // ============================
        <div key={`${4}logout`} className='Logout'>
          <Link to="logout">Logout</Link>
        </div>,
      ];
    } else {
      return [
        // Unauthenticated navigation
        <div className="Square-box-container" key={1}>
          <Link to="login">
            <SquareBoxStatic
              boxTitle='Login / Sign Up'
              imgSrc={LoginIcon} />
          </Link>
        </div>,
        <div className="Square-box-container" key={2}>
          <Link to="find-a-case">
            <SquareBoxStatic 
              boxTitle='Find a Case'
              imgSrc={SearchIcon} />
          </Link>
        </div>,
      ];
    }
  } 

  render() {
    return (
      <div>
        <TitleLine title="My Portal" />
        <div className="grid grid-pad portal-grid">
            {this.renderLinks()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, { fetchUser })(Portal);







// import React, { Component } from 'react';
// import SquareBox from '../template/square-box';
// import { Link } from 'react-router-dom';
// import profile from '../../../img/profile.svg';
// import search from '../../../img/search.svg';

// export default class PortalNoAuth extends Component {
//  render() {
//    return (
//      <div className='PortalNoAuth'>
//        <h1>My Portal</h1>
//            <Link to='/login'>
//              <SquareBox boxTitle='Log in / Sign up'
//                   imgSrc=''
//              />
//            </Link>
//            <Link to='/profile'>
//              <SquareBox boxTitle='Find a Court Case'
//                   imgSrc=''
//              />
//            </Link>
//        </div>
//    )
//  }
// }

// taking out "upcoming" box for now
{/*<div key={`${4}upcoming`}>
          <Upcoming />
        </div>,
        // ============================*/}