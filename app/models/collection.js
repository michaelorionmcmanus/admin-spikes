App.CollectionSerializer = DS.RESTSerializer.extend({
  extractArray: function(store, primaryType, payload) {
    var collections = {};
    collections.collections = payload;
    payload = collections;
    return this._super(store, primaryType, payload);
  },
  extractSingle: function(store, type, payload, id, requestType) {
    var artist = {
      artist: payload
    };
    payload = artist;
    return this._super(store, type, payload, id, requestType);
  },
  serializeIntoHash: function(hash, type, record, options) {
    var payload = this.serialize(record, options);
    for (prop in payload) {
      hash[prop] = payload[prop];
    }
  }
});

export default DS.Model.extend({
  name: DS.attr('string')
});