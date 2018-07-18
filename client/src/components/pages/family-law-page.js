import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSubCategories } from '../../actions/content.js';
import Squarebox from '../template/square-box';
import Asset from '../template/responsive-image';
import client from '../../services/contentful-client'
import TitleLine from '../template/title-line';
import { DEFAULT_LANG } from '../../actions/types'; 

class FamilyLawPage extends React.Component {

  componentWillMount() {
      this.props.subcategories.length === 0 && this.props.fetchSubCategories()
  }

  renderSubCategories() {
    const lang = this.props.language;
    return this.props.subcategories.map((subcategory) => {
      return (
        <div className="Square-box-container" key={subcategory.id}>
          <Link to={ 'family-law/'+subcategory.slug }>
            <Squarebox 
              id={ subcategory.id}
              boxTitle={ subcategory.titles[lang] }  
              assetId={ subcategory.imageId }
            />
          </Link>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="mainpage">
        <TitleLine title="Self-Help Law Center" />
        <div className="grid grid-pad">
          {this.renderSubCategories()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    subcategories: state.content.subcategories,
    language: state.content.language,
   };
}

export default connect(mapStateToProps, { fetchSubCategories })(FamilyLawPage);