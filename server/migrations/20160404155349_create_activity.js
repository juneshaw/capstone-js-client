exports.up = function(knex, Promise) {
  return knex.schema.createTable('activity', function(table){
    table.increments('id');
    table.integer('group_id');
    table.string('name');
    table.integer('custom_category_id');
    table.integer('category_id');
    table.date('date');
    table.time('time');
    table.integer('location_id');
    table.integer('business_id');
    table.string('address');
    table.string('city');
    table.string('state');
    table.string('category_name');
    table.float('lat');
    table.float('long');
    table.string('phone');
    table.string('image_url');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('activity');
};
