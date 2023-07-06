import serverContainer from '../../server/container';

export default serverContainer.resolve("StoreController").handler("/api/stores");