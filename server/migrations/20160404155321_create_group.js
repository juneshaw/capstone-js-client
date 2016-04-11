exports.up = function(knex, Promise) {
  return knex.schema.createTable('group', function(table){
    table.increments('id');
    table.string('title');
    table.integer('host_id');
    table.text('bio');
    table.string('image_url');
    table.integer('preference_id');
    table.integer('location_id');
    table.date('next_activity_date');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('group');
};
