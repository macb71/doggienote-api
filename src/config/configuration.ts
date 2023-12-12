export default () => ({
    PORT: parseInt(process.env.PORT),
    database: {
      HOST: process.env.DB_HOST,
      USER: process.env.DB_USERNAME,
      PASSWORD: process.env.DB_PASSWORD,
      DATABASE: process.env.DATABASE,
    },
  });