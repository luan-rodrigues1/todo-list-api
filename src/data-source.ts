import "reflect-metadata"
import "dotenv/config"
import path from "path"
import { DataSource, DataSourceOptions } from "typeorm"

const setDataSourceConfig = (): DataSourceOptions => {
    const entitiesPath: string = path.join(__dirname, "./entities/**.{js,ts}");
    const migrationsPath: string = path.join(
      __dirname,
      "./migrations/**.{js,ts}"
    );
  
    const nodeEnv = process.env.NODE_ENV;
  
    if (nodeEnv === "test") {
      return {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: [entitiesPath],
      };
    }
  
    return {
        type: "postgres",
        host: process.env.PGHOST!,
        port: parseInt(process.env.PGPORT!),
        username: process.env.PGUSER!,
        password: process.env.PGPASSWORD!,
        database: process.env.PGDATABASE!,
        logging: true,
        synchronize: false,
        entities: [entitiesPath],
        migrations: [migrationsPath],
    };
  };

// const AppDataSource = new DataSource({
//     type: "postgres",
//     host: process.env.PGHOST!,
//     port: parseInt(process.env.PGPORT!),
//     username: process.env.PGUSER!,
//     password: process.env.PGPASSWORD!,
//     database: process.env.PGDATABASE!,
//     logging: true,
//     synchronize: false,
//     entities: [path.join(__dirname, "./entities/**.{js,ts}")],
//     migrations: [path.join(__dirname, "./migrations/**.{js,ts}")]
// })

const dataSourceConfig = setDataSourceConfig();

export default new DataSource(dataSourceConfig);