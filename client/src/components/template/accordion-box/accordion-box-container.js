import React, { Component, PropTypes } from 'react';
import marked from 'marked';
const ReactMarkdown = require('react-markdown')

export default class AccordionBoxContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeId: 0,
			pressed: false
		}
		this.toggleClass = this.toggleClass.bind(this);
		this.getParsedMarkdown = this.getParsedMarkdown.bind(this);
	}

	toggleClass(id) {
		this.setState({ 
			activeId: id,
			pressed: !this.state.pressed 
		});
		// console.log(this.state, 'print this.state for toggleClass')
  }

  componentWillMount() {
  	// console.log("Next Page: this.props.stageContent", this.props.stageContent)
  }

  getParsedMarkdown(content) {
  	return {
  		__html: marked(content, {sanitize: true})
  	}
  }

	render() {
		// return <div>test</div>

		const renderedContent = this.props.stageContent.map((tab) => {
			const input = tab.fields.blockText
			return (
				<div className="Accordion-box-item " key={tab.sys.id}>
					<h3 onClick={() => this.toggleClass(tab.sys.id)}>{tab.fields.title}<span></span></h3>
					<div className=`Accordion-box-content ${this.state.activeId == tab.sys.id && this.state.pressed == true ? " ": "hidden"}`> 
							<ReactMarkdown source={input} />
					
{/*						<div dangerouslySetInnerHTML={this.getParsedMarkdown(input)}></div>
*/}					</div>
					<hr />
				</div>
			)
		})
		// const newContent = this.props.stageContent.filter((tab) => {
  // 		tab.fields.stage.map((item) => item.sys.id == stageId)
  // 	})

		return (
			<div className="Box AccordionBoxContainer medium-box">
				<hr />
				{renderedContent}
			</div>
		)
	}
} 

AccordionBoxContainer.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    activeId: PropTypes.number.isRequired,
    // expanded: PropTypes.bool.isRequired,
    // blockText: PropTypes.string.isRequired, 
    
  }).isRequired).isRequired,
  	toggleClass: PropTypes.func.isRequired
  // onTabClick: PropTypes.func.isRequired,
  // onAccordionClick: PropTypes.func.isRequired,
}

/* 
	render() {
		const renderedContent = this.props.stageContent.map((tab) => {
			return (
				<div className="Accordion-box-item " key={tab.sys.id}>
					<h3 onClick={() => this.toggleClass(tab.sys.id)}>{tab.sys.title}<span></span></h3>
					<div className={this.state.activeId == tab.sys.id && this.state.pressed == true ? " ": "hidden"} >{tab.fields.blockText}</div>
					<hr />
				</div>
			)
		})
		return (
			<div className="Box AccordionBoxContainer medium-box">
				<hr />
				{renderedContent}
			</div>
		)
	}
} 
*/