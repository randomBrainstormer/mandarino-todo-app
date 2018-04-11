'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable('lists', {
    id: { type: 'int', primaryKey: true },
    name: {
      type: 'string',
      notNull: true,
    },
    expires: 'datetime',
    created: 'timestamp',
    userId: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'list_user_id',
        table: 'users',
        mapping: 'id'
      }
    }
  }, callback);

  db.createTable('item', {
    id: { type: 'int', primaryKey: true },
    name: 'string',
    expires: 'datetime',
    created: 'timestamp',
    listId: {
      type: 'int', 
      notNull: true,
      foreignKey: {
        name: 'list_item',
        table: 'lists',
        mapping: 'id'
      }
    }
  }, callback);

  // dummy data
  db.insert('lists', ['name', 'userId'], ['Home Shores', 0], callback)
  db.insert('lists', ['name', 'userId'], ['Work', 0], callback)
};

exports.down = function(db, callback) {
  db.dropTable('lists', callback);
};

exports._meta = {
  "version": 1
};
