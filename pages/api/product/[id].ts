import container from '../../../server/container';

export default container.resolve("ProductController").handler("/api/product/:id");