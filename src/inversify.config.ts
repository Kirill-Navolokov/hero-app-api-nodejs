import { Container } from "inversify";
import WodsService from "./services/wodsService";
import { TYPES } from "./types";
import { WodsController } from "./controllers/wodsController";
import WodsRoutes from "./routes/wodsRoutes";
import { EnvConfig } from "./config/environment";
import { DbClient } from "./dal/dbConnection";

class IoCContainer extends Container {
    constructor() {
        super();
        this.registerDependecies();
    }

    private registerDependecies() {
        this.registerRoutes();
        this.registerControllers();
        this.registerServices();
        this.registerInfrastructure();
    }

    private registerRoutes() {
        this.bind<WodsRoutes>(TYPES.WodsRoutes).to(WodsRoutes);
    }

    private registerControllers() {
        this.bind<WodsController>(TYPES.WodsController).to(WodsController);
    }

    private registerServices() {
        this.bind<WodsService>(TYPES.WodsService).to(WodsService);
    }

    private registerInfrastructure() {
        this.bind<EnvConfig>(TYPES.EnvConfig).to(EnvConfig).inSingletonScope();
        this.bind<DbClient>(TYPES.DbClient).to(DbClient).inSingletonScope();
    }
}

const iocContainer = new IoCContainer();
export { iocContainer }