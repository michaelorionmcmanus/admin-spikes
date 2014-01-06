// routes/collections/index.js
export default Ember.Route.extend({
  model: function() {
    return this.modelFor('collections');
  }
});