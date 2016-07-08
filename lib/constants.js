export const BASE_URL = 'https://search-tardismonitor-nj2o6jgbgdm6luc7ugjnsxsu2q.us-west-2.es.amazonaws.com/published/article/_search';

export const BRAND_IDS = ['time', 'si', 'money', 'instyle', 'fortune'];

export const COLUMN_MAP = {
    slug:     '$slug',
    ingested: '$time',
    facebook: 'facebook.success',
    google:   'google.success',
    apple:    'apple.success'
};

export const POST_ARTICLE_DATA = {
  sort: [
    {}
  ],
  query: {
    bool: {
      must: []
    }
  }
};

export const POST_PUBLISH_DATA = {
  size: 0,
  aggs: {
    google_amp_publishes_by_day: {
      date_histogram: {
        field: 'google.time',
        interval: 'day',
        min_doc_count: 0,
        extended_bounds: {
          min: 'now-9d/d',
          max: 'now'
        }
      }
    },
    facebook_ia_publishes_by_day: {
      date_histogram: {
        field: 'facebook.time',
        interval: 'day',
        min_doc_count: 0,
        extended_bounds: {
          min: 'now-9d/d',
          max: 'now'
        }
      }
    },
    apple_anf_publishes_by_day: {
      date_histogram: {
        field: 'apple.time',
        interval: 'day',
        min_doc_count: 0,
        extended_bounds: {
          min: 'now-9d/d',
          max: 'now'
        }
      }
    }
  }
}

export const POST_PUBLISHER_DATA = {
  size: 0,
  query: {
    range: {}
  },
  aggs: {
    docs_published: {
      terms: {
        field: null
      }
    }
  }
};

export const TIMEFRAME = 10; // Days
