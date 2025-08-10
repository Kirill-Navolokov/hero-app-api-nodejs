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
import { UsersService } from "./services/usersService";
import { WorkoutsRepository } from "./dal/repositories/workoutsRepository";
import { SupportService } from "./services/supportService";
import { SupportController } from "./controllers/supportController";
import { SupportRepository } from "./dal/repositories/supportRepository";
import SupportRoutes from "./routes/supportRoutes";
import { BusinessesRepository } from "./dal/repositories/businessesRepository";
import { BusinessCategoriesRepository } from "./dal/repositories/businessCategoriesRepository";
import { BusinessesService } from "./services/businessesService";
import { BusinessesController } from "./controllers/businessesController";
import { BusinessesRoutes } from "./routes/businessesRoutes";

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
        this.bind<SupportRoutes>(TYPES.SupportRoutes).to(SupportRoutes);
        this.bind<BusinessesRoutes>(TYPES.BusinessesRoutes).to(BusinessesRoutes);
    }

    private registerControllers() {
        this.bind<WodsController>(TYPES.WodsController).to(WodsController).inSingletonScope();
        this.bind<UnitsController>(TYPES.UnitsController).to(UnitsController).inSingletonScope();
        this.bind<AuthController>(TYPES.AuthController).to(AuthController).inSingletonScope();
        this.bind<SupportController>(TYPES.SupportController).to(SupportController).inSingletonScope();
        this.bind<BusinessesController>(TYPES.BusinessesController).to(BusinessesController).inSingletonScope();
    }

    private registerServices() {
        this.bind<WodsService>(TYPES.WodsService).to(WodsService).inRequestScope();
        this.bind<UnitsService>(TYPES.UnitsService).to(UnitsService).inRequestScope();
        this.bind<AuthService>(TYPES.AuthService).to(AuthService).inRequestScope();
        this.bind<UsersService>(TYPES.UsersService).to(UsersService).inRequestScope();
        this.bind<SupportService>(TYPES.SupportService).to(SupportService).inRequestScope();
        this.bind<BusinessesService>(TYPES.BusinessesService).to(BusinessesService).inRequestScope();
    }

    private registerRepositories() {
        this.bind<UnitsRepository>(TYPES.UnitsRepository).to(UnitsRepository).inRequestScope();
        this.bind<WodsRepository>(TYPES.WodsRepository).to(WodsRepository).inRequestScope();
        this.bind<UsersRepository>(TYPES.UsersRepository).to(UsersRepository).inRequestScope();
        this.bind<WorkoutsRepository>(TYPES.WorkoutsRepository).to(WorkoutsRepository).inRequestScope();
        this.bind<SupportRepository>(TYPES.SupportRepository).to(SupportRepository).inRequestScope();
        this.bind<BusinessesRepository>(TYPES.BusinessesRepository).to(BusinessesRepository).inRequestScope();
        this.bind<BusinessCategoriesRepository>(TYPES.BusinessCategoriesRepository).to(BusinessCategoriesRepository).inRequestScope();
    }

    private registerInfrastructure() {
        this.bind<EnvConfig>(TYPES.EnvConfig).to(EnvConfig).inSingletonScope();
        this.bind<DbClient>(TYPES.DbClient).to(DbClient).inSingletonScope();
    }
}

const iocContainer = new IoCContainer();
export { iocContainer }