import serverContainer from '../../../server/container';

export default serverContainer.resolve("ReviewController").handler("/api/review/:id");