import React from 'react';
import { mount } from 'react-mounter';

import Page from './layouts/Page';
import Dashboard from './containers/Dashboard';

FlowRouter.route( '/', {
  name: 'Home',

  subscriptions ( params, queryParams ) {
    this.register( 'publications', Meteor.subscribe( 'publications' ) );
  },

  action ( ) {
    mount( Page, {
      Body: <Dashboard />
    } );
  }
} );


// import React from 'react';
// import { Router, Route, Link, browserHistory } from 'react-router';
// import { render } from 'react-dom';
//
// import PageLayout from './layouts/Page';
// import DashboardContainer from './containers/Dashboard';
//
// render((
//   <Router history={browserHistory}>
//     <Route path="/" component={PageLayout}>
//       <Route path="about" component={DashboardContainer}/>
//     </Route>
//   </Router>
// ), document.body);
