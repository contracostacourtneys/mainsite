import React, {Component} from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
// import { CLIENT_ROOT_URL } from '../../actions/index';
import logoBw from '../../img/logo-219.svg';

import NavbarBurger from './navbar-burger';


const Navbar = (props) => {
  const lang = props.language
  const menuLinks = props.menuLinks.map((link) => {
    // slugs should always be hard-coded in english so 
    // that page will route correctly
    const slug = link.fields.slug["en-US"]
    // all other text should use props to dynamically update
    // page language of content
    const title = link.fields.title[lang]
    return (
      <NavLink
        key={link.sys.id}
        activeClassName="Menu-link--active"
        className="Menu-link"
        exact
        to={`/${slug}`}>
        {title}
      </NavLink>
    )
  })
  //issue where menu links appending instead of taking over route when not on home page

  return (
    <div className="Menu">
      <div className='Menu-logo'>
        <NavLink to="/">
          <img
            alt='Contra Costa Superior Courts logo'
            className='Menu-logo-img'
            src={logoBw}
          />
          <img
            alt='Contra Costa Superior Courts logo'
            className='Menu-logo-img-sm'
            src={logoBw}
          />
        </NavLink>
      </div>
      {/*burger menu for mobile screens -->*/}
      <NavbarBurger menuLinks={props.menuLinks}/>
      <div className="Menu-links">
        {menuLinks}
      </div>
    </div>
  )
};

export default Navbar
