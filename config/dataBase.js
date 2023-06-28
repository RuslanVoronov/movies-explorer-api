const {
  DB_HOST = '127.0.0.1',
  DB_PORT = '27017',
  DB_NAME = 'bitfilmsdb',
} = process.env;

module.exports.mongoUrl = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
