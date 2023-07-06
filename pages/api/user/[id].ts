import serverContainer from '../../../server/container';

export default serverContainer.resolve("UserController").handler("/api/user/:id");