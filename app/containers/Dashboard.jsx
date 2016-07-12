import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

// import Publications from '../../lib/collections/Publications';
import Dashboard from '../components/Dashboard.jsx';

const composer = ( props, onData ) => {
  const data = Meteor.call( 'getArticles', 'time' );
  const options = {};

  onData( null, { data, options } );
};

export default composeWithTracker( composer )( Dashboard );
