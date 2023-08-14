import serverContainer from "../server/container";
import { IPaginationParams } from "../server/interfaces/common";

export function runControllers(controller: string, routeName?: string, params?: IPaginationParams, pagination?: boolean) {
    return (store) =>
        async (context) => {
            if (params && pagination) {
                const { page, limit } = context.query
                params = {
                    ...params,
                    page: parseInt(page) || 1,
                    perPage: parseInt(limit) || 10,
                }
                return serverContainer.resolve(`${controller}`).run({ ...context, routeName, params }, store);
            }
            return serverContainer.resolve(`${controller}`).run({ ...context, routeName }, store);
        }
}
