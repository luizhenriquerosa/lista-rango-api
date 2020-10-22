import { Server } from "./server";
import "dotenv/config";
import { Database } from "./config/Database";

class App {
  constructor() {
    this.server = new Server();
    this.db = new Database();
  }

  async init() {
    try {
      await this.db.connect();
      await this.server.init();

      console.log("Goomer Lista Rango");
    } catch (error) {
      console.error("Algo inesperado aconteceu... \n", error);
      process.exit(1);
    }
  }
}

export default new App().init();
