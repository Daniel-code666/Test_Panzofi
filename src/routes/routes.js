import { NotFound } from "../pages";
import { BasicLayout } from "../layout";
import routesMain from "./routes.app";

const routes = [
    ...routesMain,
    {
        path: "*",
        layout: BasicLayout,
        component: NotFound
    },
]

export default routes