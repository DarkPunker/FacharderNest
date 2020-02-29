export default () => ({
  port: parseInt(process.env.API_PORT, 10) || 4000,
  database: {
    DB_TYPE: process.env.DB_TYPE,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: parseInt(process.env.DB_PORT, 10) || 3306,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
    BD_SYNCHRONIZE: process.env.BD_SYNCHRONIZE
  },
  upload: {
    DESTINATION_FILES: process.env.DESTINATION_FILES,
    MAX_FILE_SIZE: process.env.MAX_FILE_SIZE,
  },
  mongo: {
    MONGODB_URI: process.env.MONGODB_URI
  }
});