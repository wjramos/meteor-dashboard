import { Meteor } from 'meteor/meteor';
import { HTTP }   from 'meteor/http';
import { check }  from 'meteor/check';
import {
  BASE_URL,
  // BRAND_IDS,
  COLUMN_MAP,
  POST_ARTICLE_DATA,
  // POST_PUBLISH_DATA,
  // POST_PUBLISHER_DATA,
  // TIMEFRAME,
  // QUERY_BASE
} from './constants';

function getSortProperty ( columnName = 'ingested' ) {
  check( columnName, String );

  return COLUMN_MAP[ columnName ];
}

Meteor.methods( {

  getData ( method = 'GET', endpoint = '', query = {}, property = '' ) {
    check( method, String );
    check( endpoint, String );
    check( query,    Object );
    check( property, String );

    let response;

    this.unblock();

    try {
      console.log( `\n::::::: GET Data :::::::\n`,
                   `Endpoint: ${ endpoint }\n`,
                   `Query:\n`,
                   Object.keys( query ).forEach( param => `\t${ param } : ${ query[ param ] }` )
                 );

      response = HTTP.call(
        method,
        endpoint,
        {
          params:  query,
          timeout: 4000
        }
      );

      console.log( `\n**** Result ****\n`, `\tSUCCESS\n` );

      return property ? response.data[ property ] : response.data;

    } catch ( e ) {
      console.log( `\n**** Result ****\n`, `\tERROR - CODE: ${ e.code }\n` );

      return [];
    }
  },

  getArticles ( brand = '', count = 10, offset = 0, sortOptions = {}, filter = '' ) {
    const postData = POST_ARTICLE_DATA;
    const url = `${ BASE_URL }?size=${ count }&from=${ offset }`;

    check( brand,       String );
    check( count,       Number );
    check( offset,      Number );
    check( sortOptions, Object );
    check( filter,      String );


    if ( !brand ) return { articles: [] };

    const order = sortOptions.direction;
    const sortProperty = getSortProperty( sortOptions.column );

    postData.sort[0][ sortProperty ] = { order };

    if ( brand ) {
      postData.query.bool.must.push({ term: { $brand: brand } });
    }

    if ( filter ) {
      postData.query.bool.must.push({ wildcard: { $slug: `*${ filter }*` } });
    }

    console.log( url, postData, 'hits' );

    const data = Meteor.call( 'postData', 'POST', url, postData, 'hits' );
console.log( data )
    return {
      articles:   data.hits,
      totalCount: data.total
    };
  }
} );
