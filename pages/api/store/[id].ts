import container from "../../../server/container";

export default container.resolve("StoreController").handler("/api/store/:id");