import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | why-tmi', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:why-tmi');
    assert.ok(route);
  });
});
