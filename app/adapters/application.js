var getServiceUrl = function(type) {
  if(type === 'collection') {
    return 'http://galactus.sisvcdev.us/api/v1'
  }
};

var config = {
  credentials: {
    shopigniter: 'OGVkN2RjY2E0ZTcwZTM3ODZhMWM6ZDE2ZWJhNmVlNzA5ZTMzNGUyZTA='
  },
  apiUrl  : {
    experience: '//galactus.sisvcdev.us/api/v1',
    share: '//share-bear.sisvcdev.us/api/v1',
    user: '//monkey-pox.sisvcdev.us/api/v1',
    asset: '//trust-fund.sisvcdev.us/api/v1',
    insights: '//stash-comb.sisvcdev.us/api/v1',
    sf: '/admin/fetch', //sf apiurl is same domain that admin resides on, no need to explicitly denote domain
    productRelationsQuery : 'variant[sku,price,inventory_count,is_orderable,link],variant.property_value,image,content'
  }
}

// Add the pre-filter for setting authentication headers
$.ajaxPrefilter(preFilter);

function preFilter(options) {
  var url = options.url;
  var serviceUrls = config.apiUrl;
  // Determine if we are dealing with a service URL.
  var urlMatches = _.map(serviceUrls, function(serviceUrl){
    return url.indexOf(serviceUrl) > -1;
  });
  var matches = _.compact(urlMatches);
  // If we are dealing with a call to a service URL add some headers.
  if (matches.length > 0 && config.credentials.shopigniter) {
    options.headers = options.headers || {};
    options.headers['si-datetime-format'] = 'U';

    // Check for urls that are blacklisted from getting Auth Headers
    // We don't want to send our headers to just anybody
    options.headers.Authorization = 'Basic ' + config.credentials.shopigniter;
  }
};


var Adapter = DS.RESTAdapter.extend({
  find: function(store, type, id) {
    return this.ajax('http://galactus.sisvcdev.us/api/v1/collection', 'GET');
  },
  findAll: function(store, type, sinceToken) {
    var query;

    if (sinceToken) {
      query = { since: sinceToken };
    }

    return this.ajax('http://galactus.sisvcdev.us/api/v1/collection', 'GET', { data: query });
  }
});

export default Adapter;