import React, { Component } from 'react';
import TitleLine from '../../template/title-line';
import { Link } from 'react-router-dom';
import { fetchFormLayout } from '../../../actions/content';
import { connect } from 'react-redux';

class Forms extends Component {
	constructor() {
		super()
	}

	componentWillMount() {
		this.props.fetchFormLayout()
	}

	render() {
		const lang = this.props.language;
		
		const renderedTopics = this.props.formTopics.map((topic) => {
			return (
				<div className="Filter-list-group" key={topic.sys.id}>
					<hr className="cat-line"/>
					<li className="Filter-topic">
						<Link to={`/forms/${topic.fields.slug["en-US"]}`}>{topic.fields.title[lang]} <i className="material-icons Filter-topic-icon">keyboard_arrow_right</i></Link>
					</li>
				</div>
			)
		})

		const renderedSubHeading = this.props.formLayout.map((text) => {
			return (
					<h3 key={text.sys.id}>{text.fields.subheading[lang]}</h3>
			)
		})

		const renderedTitle = this.props.formLayout.map((text) => {
			return ( <TitleLine key={text.sys.id} title={text.fields.title[lang]} />)
		})


		return (
			<div>
				{renderedTitle}
				{renderedSubHeading}
				<ul className="Filter">
					{renderedTopics}
				</ul>
				<h3 className="Search-forms">Search Forms</h3>
				<div className="Filter-list-group">
					<ul className="Filter">
						<hr className="cat-line"/>
						<li className="Filter-topic">
							<Link to="/forms/search">Find a form <i className="material-icons Filter-topic-icon">keyboard_arrow_right</i></Link>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
  return { 
  	formTopics: state.content.formTopics,
  	formLayout: state.content.formLayout,
  	language: state.content.language
  }
}

export default connect(mapStateToProps, { fetchFormLayout })(Forms)
