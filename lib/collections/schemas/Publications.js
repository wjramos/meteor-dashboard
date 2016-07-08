import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export default new SimpleSchema( {
  key: {
    type:     Number,
    label:    'ID',
    unique:   true,
    optional: false
  }
} );
