const TYPES = {
    WodsRepository: Symbol.for('WodsRepository'),
    WodsService: Symbol.for('WodsService'),
    WodsController: Symbol.for('WodsController'),
    WodsRoutes: Symbol.for('WodsRoutes'),

    UnitsRepository: Symbol.for('UnitsRepository'),
    UnitsService: Symbol.for('UnitsService'),
    UnitsController: Symbol.for('UnitsController'),
    UnitsRoutes: Symbol.for('UnitsRoutes'),

    SupportController: Symbol.for('SupportController'),
    SupportService: Symbol.for('SupportService'),
    SupportRepository: Symbol.for('SupportRepository'),
    SupportRoutes: Symbol.for('SupportRoutes'),

    UsersRepository: Symbol.for('UsersRepository'),
    UsersService: Symbol.for('UsersService'),

    AuthService: Symbol.for('AuthService'),
    AuthController: Symbol.for('AuthController'),
    AuthRoutes: Symbol.for('AuthRoutes'),

    WorkoutsRepository: Symbol.for('WorkoutsRepository'),

    EnvConfig: Symbol.for('EnvConfig'),
    DbClient: Symbol.for('DbClient')
}

export { TYPES }