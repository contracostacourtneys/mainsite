import React, { Component, PropTypes } from 'react';
import marked from 'marked';
const ReactMarkdown = require('react-markdown')

const fakeContent = [
	{
		id: 1,
		title: "What is Small Claims Court?",
		text: "Small claims court is set-up to resolve disputes quickly with little costs. Cases are always for less than $10,000. The rules are more simple and the hearings are less formal than in other courts. You can talk to a lawyer about your small claims case, but your lawyer cannot represent you in court."
	},
	{
		id: 2,
		title: "Who Can File a Claim in Small Claims Court",
		text: "Generally, any adult, business or government agency (except the federal government) can sue or be sued in small claims court – as long as the dispute is about money."
	}
]; 

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
					<div className={this.state.activeId == tab.sys.id && this.state.pressed == true ? " ": "hidden"}> 
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