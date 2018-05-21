import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TitleLine from '../../../template/title-line';

import TextIconBox from '../../../template/text-icon-box';
import SquareBoxStatic from '../../../template/square-box-static';

import ChecklistIcon from '../../../../img/icn_checklist.svg';
import InfoBox from '../../../template/info-box';
import AccordionBoxContainer from '../../../template/accordion-box/accordion-box-container';
import { fetchContentByParty, fetchStages } from '../../../../actions/content.js';
import Bot from '../../../chatbot/Bot.jsx'; 
import { DEFAULT_LANG } from '../../../../actions/types';
import { bindActionCreators } from 'redux';


class SmallClaimsSubStage extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.toSentenceCase = this.toSentenceCase.bind(this);
  }
  componentWillMount() {

  }


  toSentenceCase(str) {
    return str.split('-').map(function(word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }

  
  render() {
    const currentTitle = this.props.stages.find(stage => stage.url === this.props.match.params.stage).title[this.props.language]
    const currentSlug = this.props.match.params.stage
    const slugTitle = this.toSentenceCase(currentSlug);
    //const currentSection = this.props.match.params.party

    return this.props.stages.length !== 0 && this.props.stageContent.length !== 0 && (
      <div>
        <Bot />

        <TitleLine title={currentTitle ? currentTitle : slugTitle} />

        <AccordionBoxContainer stageContent={ 
          this.props.stageContent.filter(tab => { return tab.stageId === stageIds[this.props.match.params.stage] })
            .sort((a, b) => a.id - b.id )} />
      </div>
    )
  } 
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchStages, fetchContentByParty}, dispatch);
}

function mapStateToProps(state) {
  return { 
    stageContent: state.content.tabs,
    stages: state.content.stages,
    content: state.content, 
    stageId: state.content.stageId,
    language: state.content.language
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SmallClaimsSubStage);


  // componentWillUpdate() {

  // }

  // onStageSelect(title, _id, e) {
  //   e.stopPropagation();
  //   this.setState({
  //     selectedStageId: _id, 
  //     selectedStageTitle: title,
  //     selectedContent: [] 
  //   })
  // }

  // filterContent(content, findById, lang) {
  //   let filledAry = [];
  //   let emptyAry = [];
  //   // filter content by party 
  //   return content.tabs.reduce(function (acc, tab) {
  //   // first reduce gets each tab 
  //     const thisTab = tab;
  //     console.log("tab", tab);
  //     console.log("tabs-lang: ", tab.fields.stage[lang]);
  //     // second reduce gets each tab's array of stages 
  //     const aryTabs = tab.fields.stage[DEFAULT_LANG].reduce(function (acc, cat) {
  //       // checks if ID is present in stage array
  //       const tabStage = cat.sys.id.includes(findById);
  //       console.log("tabstage: ", tabStage)
  //       // if the ID matches, push the tab content to a new array
  //       return !tabStage ? emptyAry.push(thisTab) : filledAry.push(thisTab)
  //       // return !tabStage ? acc : acc.concat(Object.assign({}, cat, { tabStage }));
  //     }, []); 
  //     // console.log("7. filledAry", filledAry)
  //     // pass content to AccordionBoxContainer as props
  //     console.log("stageContent: ", filledAry);
  //     return !filledAry.length ? <AccordionBoxContainer stageContent={null} /> : <AccordionBoxContainer stageContent={filledAry} />

  //   }, []);
  // }
