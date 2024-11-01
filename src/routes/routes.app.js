import { MainLayout } from "../layout";
import { Post } from "../components";

const routesMain = [
    {
        path: "/",
        layout: MainLayout,
        component: Post,
        exact: true
    }
]

export default routesMain