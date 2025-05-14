import { Container } from "inversify";
import WodsService from "./services/wodsService";
import { TYPES } from "./types";
import { WodsController } from "./controllers/wodsController";
import WodsRoutes from "./routes/wodsRoutes";
import { EnvConfig } from "./config/environment";
import { DbClient } from "./dal/dbConnection";
import UnitsRoutes from "./routes/unitsRoutes";
import { UnitsController } from "./controllers/unitsController";
import UnitsService from "./services/unitsService";
import { UnitsRepository } from "./dal/repositories/unitsRepository";
import { WodsRepository } from "./dal/repositories/wodsRepository";

class IoCContainer extends Container {
    constructor() {
        super();
        this.registerDependecies();
    }

    private registerDependecies() {
        this.registerRoutes();
        this.registerControllers();
        this.registerServices();
        this.registerRepositories();
        this.registerInfrastructure();
    }

    private registerRoutes() {
        this.bind<WodsRoutes>(TYPES.WodsRoutes).to(WodsRoutes);
        this.bind<UnitsRoutes>(TYPES.UnitsRoutes).to(UnitsRoutes);
    }

    private registerControllers() {
        this.bind<WodsController>(TYPES.WodsController).to(WodsController);
        this.bind<UnitsController>(TYPES.UnitsController).to(UnitsController);
    }

    private registerServices() {
        this.bind<WodsService>(TYPES.WodsService).to(WodsService);
        this.bind<UnitsService>(TYPES.UnitsService).to(UnitsService);
    }

    private registerRepositories() {
        this.bind<UnitsRepository>(TYPES.UnitsRepository).to(UnitsRepository);
        this.bind<WodsRepository>(TYPES.WodsRepository).to(WodsRepository);
    }

    private registerInfrastructure() {
        this.bind<EnvConfig>(TYPES.EnvConfig).to(EnvConfig).inSingletonScope();
        this.bind<DbClient>(TYPES.DbClient).to(DbClient).inSingletonScope();
    }
}

const iocContainer = new IoCContainer();
export { iocContainer }