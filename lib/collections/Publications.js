import { Mongo }  from 'meteor/mongo';
import Schema from './schemas/Publications';

export default Publications = new Mongo.Collection( 'publications' );
Publications.attachSchema( Schema );
