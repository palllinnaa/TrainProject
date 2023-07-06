import serverContainer from '../../../server/container';

export default serverContainer.resolve("ProductController").handler("/api/product/:id");