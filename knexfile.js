require('dotenv').config()

module.exports = {
  development: {
    client: 'sqlite3', // || pg
    useNullAsDefault: true,
    // connection: {
    //   host: "127.0.0.1",
    //   port: "5432",
    //   user: "postgres",
    //   password: process.env.DB_PASSWORD,
    //   database: "anytimefitness"
    // },

    connection: { // use this for for sqlite3 local dev
      filename: './database/auth.db3'

    },    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations'
    },
    seeds:{
      directory: './database/seeds'
    }
  },

testing: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      host: "127.0.0.1",
      port: "5432",
      user: "postgres",
      password: process.env.DB_PASSWORD,
      database: 'pokedexreact_test'
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directtory: './database/seeds'
    }
  },

production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  }
};
