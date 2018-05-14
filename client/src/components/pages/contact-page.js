import React, { Component } from 'react';
import TitleLine from '../template/title-line';
import InfoBox from '../template/info-box';
import { Link } from 'react-router-dom';
import { fetchContactPage } from '../../actions/content';
import { connect } from 'react-redux';
const ReactMarkdown = require('react-markdown')

class Contact extends Component {
	constructor() {
		super()
	}

	componentWillMount() {
		this.props.fetchContactPage()
	}

	render() {
		const lang = this.props.language;

		const renderedSections = this.props.contactSections.map((section) => {
			const markedContent = <ReactMarkdown source={section.fields.blockText[lang]} />
			return (

				<InfoBox
					boxTitle={section.fields.title[lang]}
					boxContent={markedContent}
					key={section.sys.id} />
			)
		})


		const renderedTitle = <TitleLine title={this.props.contactTitle[lang]} />
		console.log(this.props.contactTitle, 'contactTitle')

		return (
			<div>
				{renderedTitle}
				{renderedSections}
			</div>
		)
	}
}

function mapStateToProps(state) {
  return { 
  	contactTitle: state.content.contactTitle,
  	contactSections: state.content.contactSections,
  	language: state.content.language
  }
}

export default connect(mapStateToProps, { fetchContactPage })(Contact)

/*import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchContactPage } from '../../actions/content.js';
import { fetchContact } from '../../actions/content.js';
import InfoBox from '../template/info-box';
import TitleLine from '../template/title-line';

class Contact extends Component {
	componentWillMount() {
		this.props.fetchContact()
	}

	renderTitle() {
		return (
			this.props.contactObj.items.map((item) => {
				return item.fields.title
			})
		)
	}

	/// whhyyyyyyy is this not working
	// FYI for tomorrow: 
	// 1. added new contact actions-- should remove those
	// 2. added reducers
	// NEED TO FIGURE OUT WHY THERES A DELAY UPDATE JUST FOR THIS COMPONENT

	render() {
		const lang = this.props.language
		const renderedTitle = this.props.contactObj.items.map((item) => {
			return (<TitleLine title={item.fields.title[lang]} />)
		})
		console.log(this.props.contactObj)
		
		return (
			<div>
				{renderedTitle}
			</div>
		)
	}
}  

function mapStateToProps(state) {
  return { 
    contactObj: state.content.contactObj,
    language: state.content.language
   };
}

export default connect(mapStateToProps, { fetchContact })(Contact);

// const Directories = [
// 	{
// 		title: "Immigration Resources",
// 		url: "http://www.courts.ca.gov/immigration.htm"
// 	},
// 	{
// 		title: "Find My Court",
// 		url: "http://www.courts.ca.gov/find-my-court.htm"
// 	},
// 	{
// 		title: "National Domestic Violence Hotline",
// 		url: "http://www.thehotline.org/"
// 	}, 
// 	{
// 		title: "Find Free Legal Help in Your Area",
// 		url: "http://www.courts.ca.gov/documents/SIJS_Non-Profit_Legal_Organizations.pdf"
// 	},
// 	{
// 		title: "Ask a Law Librarian",
// 		url: "http://www.questionpoint.org/crs/servlet/org.oclc.admin.BuildForm?&page=frame&institution=11341&type=2&language=1"
// 	}
// ]

/* 

this.props.fetchContactPage()

<div className="Contact">
  <TitleLine title={this.props.contact.title["en-US"]} />
  <div className="grid grid-pad">
    {this.renderSections()}
  </div>
</div>

renderSections() {
    const lang = this.props.language;
    console.log(this.props.contact.title, '4. this.props.contact.title')
    // return this.props.contact.fields.map((item) => {
    //   return (
    //     <InfoBox 
				// 	boxTitle={item.fields.title[lang]}
				// 	boxContent={item.fields.blockText[lang]}
				// 	key={item.sys.id} />
    //   );
    // });
  }


*/
