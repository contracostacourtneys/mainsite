import React from 'react';
import { connect } from 'react-redux';
import { toggleLanguages } from '../../actions/content';
import { withRouter } from 'react-router';

class Languages extends React.Component{
	constructor(props){
		super(props);
		// this.state = {lang : 'en-US'};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e){
		this.props.toggleLanguages(e.target.value);
	}

	render(){
	  return ( 	
		  <div className="Languages">
		  	<div className="Language-select">
					<select className="Languages-btns" onChange={this.handleClick}>
						<option value="en-US"  onClick={this.handleClick} className="Language-btn" disabled={this.props.language === 'en-US'} selected>English</option>
				    	<option value="es"  onClick={this.handleClick} className="Language-btn" disabled={this.props.language === 'es'}>Español</option>
				    	<option value="zh"  onClick={this.handleClick} className="Language-btn" disabled={this.props.language === 'zh'}>中文</option>
			  		</select>
			</div>
		  </div>
		);
	}
}

function mapStateToProps (state) {
	return {language: state.content.language};
}

export default withRouter(connect(mapStateToProps, { toggleLanguages })(Languages));
