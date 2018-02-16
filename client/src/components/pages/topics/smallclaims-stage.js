import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// a template box with title, and list of items that can be expanded accordion-style
class StageContent extends Component {
  constructor(props) {
    super(props);  
  }

  toggleAccordion() {

  }

  render() {
    return (
      <div className='Stage-content' >
      	<div className={this.props.classStyle}>
      		<div className='Portal-box-content White-background'>
	      		<h3>{this.props.title}</h3>
	      	 	{this.props.content.map((item) => {
	      	 		return (
	      	 			<div>
	      	 				<h4>{item.title}</h4>
	      	 				<p onclick={} className='accordion-hidden'>{item.blockText}</p>
	      	 			</div>
	      	 		)
	      	 	})}
          </div>
       	</div>

      <div className='Menu-box' >
      </div>
      	
      </div>
    );
  }
}
 
function mapStateToProps(state) {
  
  return {
    // content: state.user.content,
  };
}

StageContent.defaultProps = { classStyle: 'Box medium-box col-2' };    
