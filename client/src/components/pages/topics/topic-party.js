import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStages, fetchResourceLinks, fetchChecklist } from '../../../actions/content.js';
import { storeStageId } from '../../../actions/content.js';

import TitleLine from '../../template/title-line';

import TextIconBox from '../../template/text-icon-box';
import ChecklistIcon from '../../../img/icn_checklist.svg';
import InfoBox from '../../template/info-box';
import AccordionBoxContainer from '../../template/accordion-box/accordion-box-container';
import SquareBox from '../../template/square-box';
// temporarily porting in bot here and on /smallclaims. eventually bring outside of topics pages
import { DEFAULT_LANG } from '../../../actions/types';

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

const partyIds = {
  'defendant': 'mI8A9AawXACAmYEmSyU0g',
  'plaintiff': '2zYmskK1EUW22uukow4CaU',
  'other-occupant': 'zRzI8ug932cSgAU2KkIsS',
  'parent': '5mVZkVVv7GQCCEgAyAiaay',
  'tenant': '14F7MuQjQCkUiy8gIO48Mc',
  'landlord': '5ZDpEk6mPeECMCe0oGEe2K',
  'child': '2qX3uG3lq0iaekEMsqMQcs', 
  'potential-guardian': '66Lp25CQJaQq2yUUcMacIu',
  'guardianship': '25rk8cpWJeA666YKwumQyu',
  'person-accused-of-abuse': '6hzNHOCpUWO8AuUISAyUo2', 
  'person-seeking-protection': '6yqV1xQ4fuQWs0U2SY6smW',
  'other-protected-person': '6zmut3k6ruyIucIwGaoge4',
  'party': '5PSEN0jq12KU6C0oIyCaq6',
  'adoptive-parent': '7kYjskasww8suQCSEQkwkq',
  'respondent': '5EZjTNSV2gi8WAGeouuEAc',
  'petitioner': '84dTTeyxHOAUgc2uAWgQy',
  'birth-parent': '4XArK00RJSuIwGWUcEaWQ2'  
}

class TopicParty extends Component {
  constructor() {
    super();
    this.toSentenceCase = this.toSentenceCase.bind(this)
  }

  componentWillMount() {
    const url = this.props.match.params.topic;
    console.log("url on topic generic page: ", url)
    const pageTopicId = pageIds[url]
    console.log("pageTopicId: ", pageTopicId);

    const partyId = partyIds[this.props.match.params.party];
    console.log("partyId: ", partyId);

    this.props.fetchStages(pageTopicId, partyId);
    this.props.fetchResourceLinks(pageTopicId);

  }

  toSentenceCase(str) {
    // create a readable title from the slug
    return str.split('-').map(function(word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }

	render() {
    const lang = this.props.language;
		// const resources = this.props.resources.map((item) => {
		// 	return (
		// 		<div key={item.resourceId}>
  //         {unavailable translations now default to 'en-US'}
		// 			<a href={item.url} target="_blank">{item.titles[lang] || item.titles['en-US']}</a>
		// 		</div>
		// 	)
		// })
    const params = this.props.match.url.split('/').slice(0, -1).join('/')

    const resources = this.props.resources.map((item) => {
      return (
        <div key={item.resourceId}>
          {/*resource link titles not translated, now default to 'en-US'*/}
          {/*} <a href={item.url } target="_blank">{item.titles[lang] || item.titles['en-US']}</a>*/}
          <Link to={`${params}/resources`}>
            {item.titles[lang] || item.titles['en-US']}
          </Link>
        </div>
      )
    })

    const currentUnit = this.props.match.url.split('/')[1];
    const currentTitle = this.toSentenceCase(currentUnit)
    // console.log('this.props.stages', this.props.stages)
    const renderedStages = this.props.stages.map((stage) => {
      // const currentParty = this.props.match.params.party;
      //console.log(currentParty, stage, '====currentParty')
      return (
        <div  className="Square-box-container" key={stage.id}>
         <Link to={`${this.props.match.url}/${stage.slug}`}>
           <SquareBox
             id={stage.id}
             boxTitle={stage.title[lang]}
             assetId={stage.imageId}
           />
         </Link> 
       </div> 
      )
    })

		return (
  		<div>
  			<TitleLine title={currentTitle === "Dv" ? "Domestic Violence" : currentTitle} />
        <div className="grid grid-pad">
          {renderedStages}
        </div>

        <TitleLine title="More Resources" />
        <div className="grid grid-pad">  
         
            {/*<TextIconBox 
              className="Text-icon-box-container"
              boxTitle="Small Claims Checklist"
              boxContent="Use our interactive checklist to help you manage your small claims case before you file, during your case, and after a judgement has been made."
              iconLarge={ChecklistIcon}
              TextIconBoxClass="Box Text-icon-box Blue-border Grey-background medium-box"
              buttonLink="/checklist"
              caseType='smallClaims'
              party={this.props.match.params.party}
            />*/}
        	<InfoBox 
        		boxTitle="Resources"
        		boxContent={resources}
        		buttonVisibilityClass="hidden"
        		infoboxClass="Box Info-box small-box col-2"
        		/>
        </div>
	    </div>
		)
  } 
}

function mapStateToProps(state) {
  return { 
    stages: state.content.stages,
    resources: state.content.resources,
    language: state.content.language
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchStages, fetchResourceLinks, fetchChecklist}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicParty);
