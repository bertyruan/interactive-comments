import "./App.css";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { Forum } from "./components/forum/forum.component";
import { ErrorPage } from "./routes/error-page.component";
import { Home } from "./routes/home.component";
import { Auth } from "./components/auth/auth.component";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Forum />,
      },
      {
        path: "/auth",
        element: <Auth></Auth>,
      },
    ],
  },
];
const router = createBrowserRouter(routes);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
