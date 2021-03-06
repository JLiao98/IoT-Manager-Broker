// connect with PostgresSQL
const pg = require('pg');

// Database config
const config = {
  user: process.env.DB_user,
  database: process.env.DB,
  password: process.env.DB_password,
  host: process.env.DB_host,
  port: 5432,
  ssl: true,

  // extended attributes
  poolSize: 5,
  poolIdleTimeout: 30000,
  reapIntervalMillis: 10000,
};

const pool = new pg.Pool(config);

pool.connect((isErr, client, done) => {
  if (isErr) {
    console.log(`Connect query:${isErr.message}`);
    return;
  }

  client.query('select now();', [], (err, queryResult) => {
    if (err) {
      console.log('postgresql: connection failed ->', err);
    } else {
      console.log(`postgresql: connection established (${queryResult.rows[0].now})`);
    }

    done();
  });
});

const SQL = query => {
  return new Promise((resolve, reject) => {
    pool.query(query, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

pool.on('error', err => console.log('postgresql: error ->', err));

module.exports = { SQL };
