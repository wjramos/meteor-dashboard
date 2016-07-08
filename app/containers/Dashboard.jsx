// import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { getArticles } from '../../lib/methods';

import Publications from '../../lib/collections/Publications';
import Dashboard from '../components/Dashboard.jsx';

const composer = ( props, onData ) => {
  const data = Meteor.call( 'getArticles', 'time' );
  // if ( Meteor.subscribe( 'publications' ).ready( ) ) {
    // const data = Publications.find().fetch();
    onData( null, { data } );
  // };
};

export default composeWithTracker( composer )( Dashboard );
