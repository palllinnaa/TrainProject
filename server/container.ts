import * as awilix from 'awilix';
import { Sequelize } from 'sequelize';
import modelContainer, { IModelContainer } from './models';
import services, { IServicesContainer } from './services';
import mysql2 from 'mysql2';

export interface IContextContainer extends IModelContainer, IServicesContainer {
    db: Sequelize;
    config: {
        db: {
            database: string;
            username: string;
            password: string;
            dialect: string;
        };
    };
}

const container = awilix.createContainer<IContextContainer>({
    injectionMode: awilix.InjectionMode.PROXY,
});
const createDB = (ctx: IContextContainer) => {
    return new Sequelize(
        ctx.config.db.database,
        ctx.config.db.username,
        ctx.config.db.password,
        {
            dialect: 'mysql',
            dialectModule: mysql2,
        }
    );
}

container.register({
    ...modelContainer,
    ...services,
    config: awilix.asValue({
        db: {
            database: 'foodstore',
            username: 'root',
            password: 'qwerty',
            dialect: 'mysql',
        },
    }),
    db: awilix.asFunction(createDB).singleton(),

})

export default container;