import * as awilix from 'awilix';
import { asClass } from "awilix";
import entities, { IEntityContainer } from "./models/entityContainer";
import ReduxStore from "./store";

export interface IClientContextContainer extends IEntityContainer {
    redux: ReduxStore;
}

const clientContainer = awilix.createContainer<IClientContextContainer>({
    injectionMode: awilix.InjectionMode.PROXY
});

clientContainer.register({
    ...entities,
    redux: asClass(ReduxStore).singleton()
})

export default clientContainer;