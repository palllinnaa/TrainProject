import * as awilix from 'awilix';
import { Sequelize } from 'sequelize';
import modelContainer, { IModelContainer } from './models';
import services, { IServicesContainer } from './services';
import controllers, { IControllerContainer } from './controllers';
import mysql2 from 'mysql2';

export interface IServerContextContainer extends IModelContainer, IServicesContainer, IControllerContainer {
    db: Sequelize;
}

const serverContainer = awilix.createContainer<IServerContextContainer>({
    injectionMode: awilix.InjectionMode.PROXY,
});
const createDB = () => {
    return new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PSWD,
        {
            dialect: 'mysql',
            dialectModule: mysql2,
        }
    );
}

serverContainer.register({
    ...modelContainer,
    ...services,
    ...controllers,
    db: awilix.asFunction(createDB).singleton(),
})

export default serverContainer;