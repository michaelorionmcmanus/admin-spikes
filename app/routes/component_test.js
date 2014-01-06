export default Ember.Route.extend({
  model: function() {
    return ['purple', 'green', 'orange'];
  },
  renderTemplate: function() {
    this.render({ outlet: 'component-test', into: 'application' });
  }
});
