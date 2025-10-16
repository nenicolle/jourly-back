import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg", // ou 'mysql2'
    connection: {
      host: "localhost",
      user: "seu_usuario",
      password: "sua_senha",
      database: "jourly",
    },
    migrations: {
      directory: "./src/migrations",
    },
    seeds: {
      directory: "./src/seeds",
    },
  },
};

export default config;
