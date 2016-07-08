import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import Publications from '../../lib/collections/Publications';
import Dashboard from '../components/Dashboard.jsx';

const composer = ( props, onData ) => {
  if ( Meteor.subscribe( 'publications' ).ready( ) ) {
    const data = Publications.find().fetch();
    onData( null, { data } );
  };
};

export default composeWithTracker( composer )( Dashboard );
