import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router';


class Search extends Component {
  constructor(props){
    super(props);
    this.state={value: ''};
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  
  handleChange(event){
    this.setState({value: event.target.value});
    console.log("state:", this.state.value);
  }

  handleSubmit(event){
    //process query string
    console.log("form submitted");
    let queryStr = this.state.value.trim().toLowerCase();
    queryStr = '/?q='+encodeURIComponent(queryStr);
    console.log("query string: ", queryStr);
    event.preventDefault();
    console.log("props", this.props);
    this.props.history.push('/search-results'+queryStr);
  }

  componentDidMount(){
            var config = {
          gcseId: '010012988809159316594:zgkefy-h6yk',
          resultsUrl: 'http://localhost:8000/search-results',
          searchWrapperClass: 'gcse-search-wrapper',
          resultsWrapperClass: 'gcse-results-wrapper'
        };

        var renderSearchForms = function () {
          if (document.readyState == 'complete') {
            queryAndRender();
          } else {
            google.setOnLoadCallback(function () {
              queryAndRender();
            }, true);
          }
        };

        var queryAndRender = function() {
          var gsceSearchForms = document.querySelectorAll('.' + config.searchWrapperClass);
          var gsceResults = document.querySelectorAll('.' + config.resultsWrapperClass);

          if (gsceSearchForms) {
            console.log("found search forms", gsceSearchForms);
            renderSearch(gsceSearchForms[0]);
          }
          if (gsceResults) {
            renderResults(gsceResults[0]);
          }
        };

        var renderSearch = function (div) {

            google.search.cse.element.render(
              {
                div: div.id,
                tag: 'searchbox-only',
                attributes: {
                  resultsUrl: config.resultsUrl
                }
              }
            );

            console.log("google element has been created");
            if (div.dataset &&
                div.dataset.stylingFunction &&
                window[div.dataset.stylingFunction] &&
                typeof window[div.dataset.stylingFunction] === 'function') {
              window[div.dataset.stylingFunction](form);
            }
        };

        var renderResults = function(div) {
          google.search.cse.element.render(
            {
              div: div.id,
              tag: 'searchresults-only'
            });
        };

        window.__gcse = {
          parsetags: 'explicit',
          callback: renderSearchForms
        };

        (function () {
          var cx = config.gcseId;
          var gcse = document.createElement('script');
          gcse.type = 'text/javascript';
          gcse.async = true;
          gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
            '//cse.google.com/cse.js?cx=' + cx;
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(gcse, s);
        })();

  }

  



  render() {   

    return (
        <div>
            <form onSubmit={this.handleSubmit} value="search">         
             <div className="Search">
                <input className="Search-bar" type="text" placeholder=" Search our site" onChange={this.handleChange} value={this.state.value} />
                
             </div>
             </form>
          
          <div className="gcse-search-wrapper" id="testSearch"></div>
          {/*<div className="gcse-results-wrapper" id="testResults"></div>*/}
        </div>
        
    );
  }
}

export default withRouter(Search);
