import Mongoose from "mongoose";

class Database {
  constructor() {
    this.config = {
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      db: process.env.DB_NAME,
    };
  }

  async connect() {
    try {
      await Mongoose.connect(
        `mongodb://${this.config.user}:${this.config.pass}@${this.config.host}:${this.config.port}/${this.config.db}`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          authSource: "admin",
          useCreateIndex: true,
        }
      );
      console.log("Conexão com o banco de dados: estabilizada");
    } catch (err) {
      throw new Error(`Erro ao conectar ao banco de dados: ${err.message}`);
    }
  }
}

export { Database };
