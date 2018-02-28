import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { fetchStageContent } from '../../../../actions/content.js';
import TitleLine from '../../../template/title-line';

import TextIconBox from '../../../template/text-icon-box';
import ChecklistIcon from '../../../../img/icn_checklist.svg';
import InfoBox from '../../../template/info-box';
import AccordionBoxContainer from '../../../template/accordion-box/accordion-box-container';
import { fetchContent } from '../../../../actions/content.js';

let beforeID = '1cMyrIaZ680ukwwSi8YscC';
// let duringID = 5iDqJ92Rzqksq88gYWawE4;
// let afterID = 4HkTlYlsFqqIgscmGWOCkk;
// const stageIds = [
//   {
//     before: '1cMyrIaZ680ukwwSi8YscC'
//   },
//   {
//     during: '5iDqJ92Rzqksq88gYWawE4'
//   },
//   {
//     after: '4HkTlYlsFqqIgscmGWOCkk'
//   }
// ]

const selectedStageID = '';
const filteredTabs = [];

class SmallClaimsStage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedStage: this.props.match.params.stage,
      selectedStageId: beforeID,
      selectedContent: []
    }
    this.renderMenuLinks = this.renderMenuLinks.bind(this)
    this.filterContent = this.filterContent.bind(this)
    this.onStageSelect = this.onStageSelect.bind(this);
  }
  componentWillMount() {
    this.props.fetchContent('SmallClaims')
  }

  onStageSelect(title, _id, e) {
    // console.log(title)
    e.stopPropagation();
    this.setState({
      selectedStageId: _id, 
      selectedStage: title,
      selectedContent: [] 
    })
  }

  filterContent(content, findById) {
    let filledAry = [];
    let emptyAry = [];

    // first reduce gets each tab array
    return content.tabs.reduce(function (acc, tab) {
      const thisTab = tab;
      // second reduce gets each stage array
      const aryTabs = tab.fields.stage.reduce(function (acc, cat) {
          // includes checks if ID is present in stage array
          const tabStage = cat.sys.id.includes(findById);
          // if the ID matches, push the tab content to a new array
          return !tabStage ? emptyAry.push(thisTab) : filledAry.push(thisTab)
          // return !tabStage ? acc : acc.concat(Object.assign({}, cat, { tabStage }));
      }, []);
      console.log("5. aryTabs", aryTabs)
      console.log("7. filledAry", filledAry)
      console.log("8. emptyAry", emptyAry)
      // return !aryTabs.length ? acc : acc.concat(Object.assign({}, { aryTabs }));
      // pass content to AccordionBoxContainer as props
      return !filledAry.length ? <AccordionBoxContainer stageContent={emptyAry} /> : <AccordionBoxContainer stageContent={filledAry} />
    }, []);
  }

  renderMenuLinks() {
    const renderedLinks = this.props.stage.map((stage, index) => {
      return (
          <div onClick={(e) => this.onStageSelect(stage.fields.url, stage.sys.id, e)} key={stage.sys.id}>
            <Link to={stage.fields.url}>{stage.fields.title}</Link>
            
          </div>
        )
    })

    return [
      <InfoBox 
          boxTitle={`Menu - ${this.props.match.params.stage}`}
          boxContent={renderedLinks}
          buttonVisibilityClass="hidden"
          infoboxClass="Box Info-box small-box col-2"
      />
    ]
  }
  
  render() {
    return (
      <div>
        <TitleLine title="Small Claims" />
        <div className="grid grid-pad">
          {this.renderMenuLinks()} 
          {this.filterContent(this.props.content, this.state.selectedStageId)}
        </div>
      </div>

    )
  } 
}

function mapStateToProps(state) {
  return { 
    stageContent: state.content.tabs,
    stage: state.content.stages,
    content: state.content
  };
}
export default connect(mapStateToProps, { fetchContent })(SmallClaimsStage);

// export default connect(mapStateToProps, { fetchStages })(SmallClaimsStage);

          {/*<div className="White-background">{this.props.match.params.stage} Your Case</div>
          <div className="col-2 Grey-background">menu*/}
            {/*<p>{this.props.match.params.stage}</p>*/}
            {/*<Link to={`${this.props.match.url}/before`}>before</Link>
            <Link to={`${this.props.match.url}/during`}>during</Link>
            <Link to={`${this.props.match.url}/after`}>after</Link>*/}
