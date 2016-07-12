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
} from './imports/constants';

function getSortProperty ( columnName = 'ingested' ) {
  check( columnName, String );

  return COLUMN_MAP[ columnName ];
}

Meteor.methods( {

  getData ( method = 'GET', endpoint = '', data = {}, query = '', params = {}, timeout = 4000 ) {
    check( method,   String );
    check( endpoint, String );
    check( data,     Object );
    check( query,    String );
    check( params,   Object );
    check( timeout,  Number );

    let response;

    this.unblock();

    try {
      console.log( `\n::::::: GET Data :::::::\n`,
                   `Endpoint: ${ endpoint }\n`,
                   data    ? `Data: ${ JSON.stringify( data ) }\n` : '',
                   timeout ? `Timeout: ${ timeout }\n` : '',
                   params  ? `Params: ${ JSON.stringify( params ) }\n` : '',
                   query   ? `Query: ${ JSON.stringify( query ) }\n` : '',
                 );

      response = HTTP.call(
        method,
        endpoint,
        {
          data,
          query,
          params,
          timeout
        }
      );

      console.log( `\n**** Result ****\n`, `\tSUCCESS\n` );

      return response.data;

    } catch ( e ) {
      console.log( `\n**** Result ****\n`, `\tERROR - CODE: ${ e.code }\n` );

      return {};
    }
  },

  getArticles ( brand = '', count = 10, offset = 0, sortOptions = {}, filter = '' ) {
    check( brand,       String );
    check( count,       Number );
    check( offset,      Number );
    check( sortOptions, Object );
    check( filter,      String );

    if ( !brand ) return { articles: [] };

    const postData = POST_ARTICLE_DATA;
    const url = `${ BASE_URL }?size=${ count }&from=${ offset }`;
    const order = sortOptions.direction;
    const sortProperty = getSortProperty( sortOptions.column );

    let data;

    postData.sort[0][ sortProperty ] = { order };

    if ( brand ) {
      postData.query.bool.must.push({ term: { $brand: brand } });
    }

    if ( filter ) {
      postData.query.bool.must.push({ wildcard: { $slug: `*${ filter }*` } });
    }

    data = Meteor.call( 'getData', 'POST', url, postData );
console.log( data );
    return {
      articles:   data.hits,
      totalCount: data.total
    };
  }
} );
