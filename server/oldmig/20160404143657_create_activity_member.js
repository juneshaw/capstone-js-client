exports.up = function(knex, Promise) {
  return knex.schema.createTable('activity_member', function(table){
    table.increments('id');
    table.integer('activity_id');
    table.integer('member_id');
    table.string('rsvp');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('activity_member');
};
