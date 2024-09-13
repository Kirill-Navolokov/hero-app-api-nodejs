import { Container } from "inversify";
import WodsService from "./services/wodsService";
import { TYPES } from "./types";
import { WodsController } from "./controllers/wodsController";
import WodsRoutes from "./routes/wodsRoutes";
import HeroDb from "./db/dbConnection";

class IoCContainer extends Container {
    constructor() {
        super();
        this.registerDependecies();
    }

    private registerDependecies() {
        this.registerRoutes();
        this.registerControllers();
        this.registerServices();
        this.registerOthers();
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

    private registerOthers() {
        this.bind<HeroDb>(TYPES.Db).to(HeroDb);
    }
}

const iocContainer = new IoCContainer();
export { iocContainer }