import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategories } from '../../actions/content.js';
import Squarebox from '../template/square-box';
import Asset from '../template/responsive-image';
import client from '../../services/contentful-client'
import TitleLine from '../template/title-line';
/* Testing integration with Contentful CMS */ 
class HomePage extends React.Component {
  componentWillMount() {
    if (!this.props.assets) {
      this.props.fetchCategories()
      console.log(this.props.categories, 'this.props.categories')
    }
  }
  // constructor() {
  //   super()
  //   this.state = {categories: []}
  // }

  // componentDidMount() {
  //   client.getEntries({content_type: 'category'}).then((response) => {
  //     this.setState({categories: response.items})
  //   })
  // }

  renderCategories() {
    return this.props.categories.map((unit, index) => {
      return (
        <div className="Square-box-container" key={unit.sys.id}>
          <Link to={unit.fields.url}>
            <Squarebox 
              id={unit.sys.id}
              boxTitle={unit.fields.title}  
              assetId={unit.fields.image.sys.id}
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
          {this.renderCategories()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { categories: state.content.categories,
           assets: state.content.assets
   };
}

// export default connect(mapStateToProps)(HomePage);

export default connect(mapStateToProps, { fetchCategories })(HomePage);

/*
renderCategories() {
    return this.props.content.map((category, index) => {
      return (
        <div key={category.sys.id}>
          <Link to={category.fields.url}>
            <Squarebox 
              id={category.sys.id}
              boxTitle={category.fields.title}  
              assetId={category.fields.image.sys.id}
            />

          </Link>

            
        </div>
      );
    });
  }

  render() {
    return (
      <div className="mainpage">
        <div className="mainpage-title">
          <hr className="mainpage-title-line" />
          <h1>Self-Help Law Center</h1>
          <hr className="mainpage-title-line"/>
        </div>
        <div className="grid grid-pad">
          {this.renderCategories()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { content: state.content.all };
}

export default connect(mapStateToProps, { fetchCategories })(TestHomePage);

*/