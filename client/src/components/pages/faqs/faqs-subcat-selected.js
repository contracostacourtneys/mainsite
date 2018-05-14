import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFaqs } from '../../../actions/content';
import TitleLine from '../../template/title-line';
import AccordionBox from '../../template/accordion-box/accordion-box-container'
const ReactMarkdown = require('react-markdown')

// const stage = {
// 	"2b9rCFvuQ0iyOKQ26uO8ow": "Prepare and File a Claim",
// 	"6gfGyfVjEcuEuEAEi2OOWI": "Serving Your Court Papers",
// 	"6NhQ3ae4362oeGSiCwseIa": "After Being Served",
// 	"5IGXI1SREcyMY6IKYSmoWW": "Rescheduling My Court Date",
// 	"hAQbOpDcMSqIqswE26iWC": "Appeal, Collect, or Vacate Judgement",
// 	"3i48AXKI7SQEk4seuY8oAY": "Examples of Small Claims Cases Heard"
// }

class FaqsSelectedSubcategory extends Component {
	constructor() {
		super()
		this.state = {
			activeId: 0,
			pressed: false
		}
		this.toggleClass = this.toggleClass.bind(this);
		this.renderBreadcrumbs = this.renderBreadcrumbs.bind(this);
		this.toUpperCase = this.toUpperCase.bind(this)
	}

	toggleClass(id) {
		this.setState({ 
			activeId: id,
			pressed: !this.state.pressed 
		});
  }


	componentWillMount() {
		const label = this.props.match.params.page
		const subcatId = this.props.match.params.subcat
		this.props.fetchFaqs(label, subcatId)
	}

	toUpperCase(string) {
   	return string.charAt(0).toUpperCase() + string.slice(1);
  }

	renderBreadcrumbs(lang) {
		const currentSection = this.props.match.params.page
		const currentStage = this.props.match.params.subcat
		const faqSubcat = this.props.faqSubcat
		let subcatTitle;
		for (var i=0; i< faqSubcat.length; i++) {
			for (var key in faqSubcat[i]) {
				if (faqSubcat[i].sys.id == currentStage) {
					subcatTitle = faqSubcat[i].fields.title[lang]
					console.log(subcatTitle, "SubcatTitle")
				}
			}
		}
		return (
			<div className="breadcrumbs">
        <Link to="/faqs">FAQs</Link>
        <span className="breadcrumbs-chevron">></span>
        <Link to={`/faqs/${this.props.match.params.page}`}>{this.toUpperCase(currentSection)}</Link>
        <span className="breadcrumbs-chevron">></span>
        <Link to={`/faqs/${this.props.match.params.page}/${this.props.match.params.subcat}`}>{subcatTitle}</Link>
      </div>
    )
	}
	
 
	render() {

		const lang = this.props.language;
		const renderedContent = this.props.faqs.map((faq) => {
			return (
				<div className="Accordion-box-item " key={faq.fields.id["en-US"]} >
				

					<h3 onClick={() => this.toggleClass(faq.fields.id["en-US"])} className={this.state.activeId == faq.fields.id["en-US"] && this.state.pressed == true ? "blue-font": " "} >
            {faq.fields.title[lang]}
            <span className="Accordion-box-icon">
              {this.state.activeId == faq.fields.id["en-US"] && this.state.pressed == true ? "-" : "+"}
            </span>
          </h3>

          <div className={this.state.activeId == faq.fields.id["en-US"] && this.state.pressed == true ? " ": "hidden"}> 
						<div className="Accordion-box-content">
							<ReactMarkdown source={faq.fields.blockText[lang]} />
						</div>
					</div>
				
					
					<hr className="Accordion-box-line" />
				</div>


			)    
		})
			

		return (
			<div>
				<TitleLine title={this.props.language == "en-US" ? "Frequently Asked Questions" : "Preguntas frecuentes" }  />
				{this.renderBreadcrumbs(this.props.language)}
				<div className="Box AccordionBoxContainer ">
				<hr className="Accordion-box-line" />
				{renderedContent}
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
  return { faqs: state.content.faqs,
  				 language: state.content.language,
  				 faqSubcat: state.content.faqSubcategories  }
}

export default connect(mapStateToProps, { fetchFaqs })(FaqsSelectedSubcategory)

