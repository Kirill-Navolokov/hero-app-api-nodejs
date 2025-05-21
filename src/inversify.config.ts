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
import { AuthController } from "./controllers/authController";
import { AuthService } from "./services/authService";
import { UsersRepository } from "./dal/repositories/usersRepository";
import AuthRoutes from "./routes/authRoutes";

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
        this.bind<AuthRoutes>(TYPES.AuthRoutes).to(AuthRoutes);
    }

    private registerControllers() {
        this.bind<WodsController>(TYPES.WodsController).to(WodsController);
        this.bind<UnitsController>(TYPES.UnitsController).to(UnitsController);
        this.bind<AuthController>(TYPES.AuthController).to(AuthController);
    }

    private registerServices() {
        this.bind<WodsService>(TYPES.WodsService).to(WodsService);
        this.bind<UnitsService>(TYPES.UnitsService).to(UnitsService);
        this.bind<AuthService>(TYPES.AuthService).to(AuthService);
    }

    private registerRepositories() {
        this.bind<UnitsRepository>(TYPES.UnitsRepository).to(UnitsRepository);
        this.bind<WodsRepository>(TYPES.WodsRepository).to(WodsRepository);
        this.bind<UsersRepository>(TYPES.UsersRepository).to(UsersRepository);
    }

    private registerInfrastructure() {
        this.bind<EnvConfig>(TYPES.EnvConfig).to(EnvConfig).inSingletonScope();
        this.bind<DbClient>(TYPES.DbClient).to(DbClient).inSingletonScope();
    }
}

const iocContainer = new IoCContainer();
export { iocContainer }