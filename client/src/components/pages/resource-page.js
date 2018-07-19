import React from 'react';
import { connect } from 'react-redux';
import { fetchResourceLinks } from '../../actions/content.js';
import TitleLine from '../template/title-line';


import AccordionBoxContainer from '../template/accordion-box/accordion-box-container';

const pageIds = {
	"guardianship": "25rk8cpWJeA666YKwumQyu", 
	"dv": "2rfORKm0KQe4K0uuEuoQci",
	// "family-law": "4O0eqo7xHOaMMA8WyYW80C",
	"eviction": "6qxRrat4HKc8UUk4yCGuSg",
	"traffic": "2Syl95Uko8IwQqUgi2wSem",
  "divorce": '3e4Q77Bx9SA4e68kEqAqqm',
  'parentage': '2gLuMFQiogM4yKMcysMAmO',
  'spousal-support': 'cJ50XZ428SGUWSosGceQ2',
  'child-support': '1nOttXluzOkgW6ccKCSAmm',
  'child-custody': '7zUEVvEpskIGiqYiySWqeO',
  'adoption': 'iFwZyXKaVa4Uk2qWkOSWu'
}


class ResourcePage extends React.Component{
	componentWillMount(){
		console.log("resource page mounted");
		this.props.fetchResourceLinks(pageIds[this.props.match.params.topic]);
	}

	render(){
		return (
			<div>
				<TitleLine title={'Resources'} />
				<AccordionBoxContainer stageContent={this.props.resources} resource={true}/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		resources: state.content.resources
	}
}

export default connect(mapStateToProps, { fetchResourceLinks })(ResourcePage)