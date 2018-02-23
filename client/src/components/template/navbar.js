import React, {Component} from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
// import { CLIENT_ROOT_URL } from '../../actions/index';
import ccscLogo from '../../img/ccsc-logo.svg';
import ccscLogoSm from'../../img/ccsc-logo-sm.svg';
import logoModern from '../../img/logo-modern.svg';

import NavbarBurger from './navbar-burger';
// import ReactSVG from 'react-svg';

// const path = require('path');
// const ccscLogo = require(CLIENT_ROOT_URL+'/img/ccsc-logo.svg');
// const ccscLogoSm = require(CLIENT_ROOT_URL+'/img/ccsc-logo-sm.svg');

/* 
<img className="Menu-logo-img"
  alt='Contra Costa Superior Courts logo'
  src={ ccscLogo }
/>

<img className="Menu-logo-img-sm"
  alt='Contra Costa Superior Courts logo'
  src={ ccscLogoSm }
/>
*/
class Navbar extends Component {
  render() {
  return (
    <div className='Menu'>
        <div className='Menu-logo'>
          <NavLink to="/">
            <img
              alt='Contra Costa Superior Courts logo'
              className='Menu-logo-img'
              src={logoModern}
            />
            <img
              alt='Contra Costa Superior Courts logo'
              className='Menu-logo-img-sm'
              src={logoModern}
            />
          </NavLink>
          
        </div>
        <NavbarBurger />
        <div className='Menu-links'>
          <NavLink
            activeClassName='Menu-link--active'
            className='Menu-link'
            exact
            to='/'
          >
            Home
          </NavLink>
          {this.props.azure === 'AZURE'? <NavLink
            activeClassName='Menu-link--active'
            className='Menu-link'
            to='/azure-portal'
          >
            My Portal
          </NavLink> : 
          <NavLink
            activeClassName='Menu-link--active'
            className='Menu-link'
            to='/portal'
          >
            My Portal
          </NavLink>}
          <NavLink
            activeClassName='Menu-link--active'
            className='Menu-link'
            to='/forms'
          >
            Forms
          </NavLink>
          <NavLink
            activeClassName='Menu-link--active'
            className='Menu-link'
            to='/faqs'
          >
            FAQs
          </NavLink>
          <NavLink
            activeClassName='Menu-link--active'
            className='Menu-link'
            to='/video-resources'
          >
            Video Resources
          </NavLink>
          <NavLink
            activeClassName='Menu-link--active'
            className='Menu-link'
            to='/locations'
          >
            Find a Courthouse
          </NavLink>
          <NavLink
            activeClassName='Menu-link--active'
            className='Menu-link'
            to='/contact-us'
          >
            Contact
          </NavLink>
        </div>
      </div>
  );
  }
}

const mapStateToProps = (state) => { return {azure: state.auth.message}; };

export default connect(mapStateToProps)(Navbar);