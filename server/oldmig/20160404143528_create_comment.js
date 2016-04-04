exports.up = function(knex, Promise) {
  return knex.schema.createTable('comment', function(table){
    table.increments('id');
    table.integer('activity_id');
    table.integer('member_id');
    table.text('body');
    table.timestamps;
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comment');
};
