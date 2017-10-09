import Realm from 'realm';

const Schemas = [
  {
    schema: [
      {
        name: 'Cache', // 缓存表
        primaryKey: 'key',
        properties: {
          key: 'string',
          value: 'string',
          createdAt: 'date'
        }
      },
      {
        name: 'User', // 用户表
        primaryKey: 'id',
        properties: {
          id: 'int',
          token: 'string',
          nickname: {type: 'string', optional: true},
          avatar: {type: 'string', optional: true},
          description: {type: 'string', optional: true},
          money: {type: 'int', default: 0},
          role: {type: 'int', default: 0},
          favorite_count: {type: 'int', default: 0},
          wallpaper_count: {type: 'int', default: 0}
        }
      }
    ], schemaVersion: 4, migration: (oldRealm, newRealm) => {}
  }
];

let nextSchemaIndex = Realm.schemaVersion(Realm.defaultPath);
if (nextSchemaIndex > -1) {
  while (nextSchemaIndex < Schemas.length) {
    let migratedRealm = new Realm(Schemas[nextSchemaIndex++]);
    migratedRealm.close();
  }
}

const DB = new Realm(Schemas[Schemas.length - 1]);
export default DB;