exports.up = function(knex, Promise) {
  return knex.schema.createTable('group_member', function(table){
    table.increments('id');
    table.integer('group_id');
    table.integer('member_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('group_member');
};
