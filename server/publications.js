// import { Meteor } from 'meteor/meteor';
// import Publications from '../lib/collections/Publications';
//
// // Publish collections for consuming client-side
// Meteor.publish( 'publications', ( ) => {
//   const selector = {};
//   const sort = { sort: {} };
//
//   const entries = Publications.find( selector, sort );
//
//   if ( entries ) {
//     return entries;
//   }
//
//   return this.ready();
// } );
