# CCC SELF-HELP SITE AND AI CHAT BOT 
Team: Xi Chen, Michael Daly, Taylor Parsell
Last Updated: July 20, 2018

## Project Summary
 In the summer of 2016, we came together to tackle three challenges posed by the Judicial Council Innovations Grant, to build a natural language AI chatbot, to design a user portal with OAuth2 capabilities, and to develop an interactive forms application,  Planned for three years, this ambitious project was cut short in June 2018, a year after it was kick-started in June 2017. Currently, this code base features a revamped legal self-help site along with an integrated natural language chatbot functioning within the small claims pages and a user portal with MS Azure OAuth2. We just finished migrating content data from the old self-help site and updated the links. There's a lot of testing and debugging that needs to happen, especially with the family law case type. The forms app, which is hosted at https://github.com/contracostacourtneys/cc-form-viewer, will need to be integrated into the site, as well. It's sad to let the project go. We hope others will pick up where we left off, to go boldly where no one has gone before.    

## Working With This Project
- fork the repo
- install node modules $ npm install  
- for hot reload, use $ npm test 
	- runs on port 8000
- for server/chatbot webhooks (no hot reload) use $ npm start
	- runs on port 3000

## Technology
- React / Redux
- webpack
- Node
- Express
- MongoDB
- PassportJS
- Microsoft Identity Management / Azure
- [DialogFlow](https://dialogflow.com/)
- [Contentful](http://contentful.com/)

## Features
- React-based site with flexbox responsive grid
- Contentful content management platform with API integration
- Redux actions to handle flow of content into the site
- NLP chatbot backed by DialogFlow with training in small claims case flow
- Portal with user authentication handled through PassportJS and Microsoft Identity Management with Azure

## Resources
- starter from MERN Starter <https://github.com/joshuaslate/mern-starter>
