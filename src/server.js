import express from "express";
import cors from "cors";
import { router } from "./routes";

class Server {
  constructor() {
    this.expressServer = express();
  }

  loadMiddlewares() {
    this.expressServer.use(express.json());
    this.expressServer.use(
      "/storage",
      express.static(`${__dirname}/../storage`)
    );
    this.expressServer.use(cors());
  }

  loadRoutes() {
    this.expressServer.use(router);
  }

  async init() {
    try {
      this.loadMiddlewares();
      this.loadRoutes();

      await this.expressServer.listen(process.env.PORT);
      console.log("Servidor HTTP: iniciado");
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export { Server };
