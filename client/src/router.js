import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link, browserHistory } from 'react-router-dom';
import { CLIENT_ROOT_URL } from './actions/index';

// Import miscellaneous routes and other requirements
import NotFoundPage from './components/pages/not-found-page';
import Navbar from './components/template/navbar';
import Footer from './components/template/footer';
import Search from './components/template/search';
// DONT DELETE commented Bot out to hide from all views until bot works for all case types.
// for now bot will only live in small claims
import Bot from './components/chatbot/Bot.jsx';
import MobileBot from './components/mobilebot/MobileBot.jsx';

// Import static pages
import HomePage from './components/pages/home-page';
import TestAccordionBox from './components/template/accordion-box/accordion-box-container';
import ContactPage from './components/pages/contact-page';
import Forms from './components/pages/forms-page';
import FAQs from './components/pages/faqs-page';
import Videos from './components/pages/videos-page';
import Portal from './components/pages/portal-page';
import AzurePortal from './components/pages/azure-portal';
// import SmallClaims from './components/pages/topics/smallclaims';
// import SmallClaimsParty from './components/pages/topics/smallclaims-party';
import SmallClaims from './components/pages/topics/smallclaims/smallclaims';
import SmallClaimsParty from './components/pages/topics/smallclaims/smallclaims-party';
import SmallClaimsStage from './components/pages/topics/smallclaims/smallclaims-stage';
import Guardianship from './components/pages/topics/guardianship';
import Eviction from './components/pages/topics/eviction';
import Traffic from './components/pages/topics/traffic';
import Dv from './components/pages/topics/dv';
import FamilyHome from './components/pages/topics/family/family-home';
import Adoption from './components/pages/topics/family/family-adoption';

import TodoApp from './components/pages/todo/components/App';
// import ChecklistApp from './components/pages/checklist/checklistApp';
// import ComponentSamplesPage from './components/pages/component-samples';

// Import authentication related pages
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import Register from './components/auth/register';
import ForgotPassword from './components/auth/forgot-password';
import ResetPassword from './components/auth/reset-password';

// Import profile pages
import EditProfile from './components/auth/edit-profile';
import ViewProfile from './components/profile/view-profile';
import MyCasesDashboard from './components/cases/my-cases-dashboard'; // import Inbox from './components/dashboard/messaging/inbox';
import NewCase from './components/pages/new-case-page';
// import Conversation from './components/dashboard/messaging/conversation';
// import ComposeMessage from './components/dashboard/messaging/compose-message';
// import BillingSettings from './components/billing/settings';

// Import billing pages
// import InitialCheckout from './components/billing/initial-checkout';

// Import admin pages
// import AdminDashboard from './components/admin/dashboard';

// Import higher order components
import RequireAuth from './components/auth/require-auth';

export default class AppRouter extends Component {
  constructor(props) {
      super(props);
  }


  render() {
    return (
      <BrowserRouter history={browserHistory} >
        <div>
          {/* <ToggleBox />*/}
          <Switch>
            <Route path="/mbot" history={browserHistory} component={MobileBot} />
            <div className="App">
              <div className="App-mask" />
              <Navbar />
              <Search />
              {/* DONT DELETE commented Bot out to hide from all views until bot works for all case types.
              for now bot will only live in small claims*/}
              {/*<Bot /> */}
              <div className="Page">
                <Switch>
                  <Route exact path="/" component={HomePage} />
                    {/*if I want to load app and navs separately in {App} component, and load CaseType modules here--> */}
                    {/*<IndexRoute component={TopicsList} /> */} 
                  <Route path="/test" component={TestAccordionBox} />
                  <Route path="/checklist" component={TodoApp} />
                  <Route path="/contact-us" component={ContactPage} />
                  <Route path="/portal" component={Portal} />
                  <Route path="/azure-portal" component={AzurePortal} />
                  <Route path="/my-case" component={MyCasesDashboard} />
                  <Route path="/register" component={Register} />
                  <Route path="/login" component={Login} />
                  <Route path="/logout" component={Logout} />
                  <Route path="/faqs" component={FAQs} />
                  <Route path="/video-resources" component={Videos} />
                  <Route path="/forms" component={Forms} />
                  <Route
                    path="/locations"
                    component={() =>
                      (window.location = 'http://www.cc-courts.org/locations/locations.aspx')}
                  />
                  <Route
                    path="/find-a-case"
                    component={() =>
                      (window.location = 'http://www.cc-courts.org/civil/online-case.aspx')}
                  />
                  <Route path="/forgot-password" component={ForgotPassword} />
                  <Route path="/reset-password/:resetToken" component={ResetPassword} />

                  <Route exact path="/smallclaims" component={SmallClaims} />
                  <Route path="/smallclaims/:party/" component={SmallClaimsParty} >
                    <Route path="/:stage" component={SmallClaimsStage} />
                  </Route>
                  <Route path="/guardianship" component={Guardianship} />
                  <Route path="/eviction" component={Eviction} />
                  <Route path="/dv" component={Dv} />
                  <Route path="/traffic" component={Traffic} />
                  <Route path="/family" component={FamilyHome} />
                  <Route path="/adoption" component={Adoption} />

                  <Route path="/profile" component={RequireAuth(ViewProfile)} />

                  <Route path="/add-case" component={RequireAuth(NewCase)} />
                  <Route path="/edit-profile" component={RequireAuth(EditProfile)} />



                  <Route path="*" component={NotFoundPage} />
                </Switch>
              </div>
            </div>
            <div class="App-footer-push"></div>

          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

/*
<BrowserRouter>
				<Route path="/" component={App}>
				    <Route path="/contact-us" component={ContactPage} />
				    <Route path="*" component={NotFoundPage} />
				</Route>
			</BrowserRouter>
*/

//	 <Route path="component-samples" component={RequireAuth(ComponentSamplesPage)} />
//	 <Route path="contact-us" component={ContactPage} />

//     <Route path="register" component={Register} />
//     <Route path="login" component={Login} />
//     <Route path="logout" component={Logout} />
//     <Route path="forgot-password" component={ForgotPassword} />
//     <Route path="reset-password/:resetToken" component={ResetPassword} />

//     <Route path="checkout/:plan" component={RequireAuth(InitialCheckout)} />
//     <Route path="billing/settings" component={RequireAuth(BillingSettings)} />
//     <Route path="admin" component={RequireAuth(AdminDashboard)} />

//     <Route path="dashboard">
//       <IndexRoute component={RequireAuth(Dashboard)} />
//       <Route path="inbox" component={RequireAuth(Inbox)} />
//       <Route path="conversation/new" component={RequireAuth(ComposeMessage)} />
//       <Route path="conversation/view/:conversationId" component={RequireAuth(Conversation)} />
//     </Route>

// <Route exact path="profile" />
// 					    <Route component={RequireAuth(Profile)} />

//     <Route path="profile" component={RequireAuth(ViewProfile)} />
