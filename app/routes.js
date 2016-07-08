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
