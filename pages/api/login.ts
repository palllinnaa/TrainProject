import serverContainer from '../../server/container';

export default serverContainer.resolve("AuthController").handler("/api/login");