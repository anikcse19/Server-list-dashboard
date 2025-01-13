import { createBrowserRouter } from "react-router-dom";
import ClientListsPage from "../pages/Dashboard/ClientListsPage";
import App from "../App";
import LoginPage from "../pages/LoginPage";
import ClientMessageListPage from "../pages/Dashboard/ClientMessagelist";
import CreateClientPage from "../pages/Dashboard/CreateClientPage";
import CreateUserPage from "../pages/Dashboard/CreateUserPage";
import UsersListPage from "../pages/Dashboard/UsersListPage";
import UpdateUserPage from "../pages/Dashboard/UpdateUserPage";
import TrashListPage from "../pages/Dashboard/TrashListPage";
import PrivateRoute from "./PrivateRoute";
import ConfigsList from "../pages/Dashboard/ConfigsList";
import SubClientPage from "../pages/Dashboard/SubClientPage";
import CreateSubClientPage from "../pages/Dashboard/CreateSubClient";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard/client-lists",
    element: (
      <PrivateRoute>
        <ClientListsPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/sub-client-lists",
    element: (
      <PrivateRoute>
        <SubClientPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/client-list-message",
    element: (
      <PrivateRoute>
        <ClientMessageListPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/create-client",
    element: (
      <PrivateRoute>
        <CreateClientPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/create-sub-client",
    element: (
      <PrivateRoute>
        <CreateSubClientPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/create-user",
    element: (
      <PrivateRoute>
        <CreateUserPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/user-lists",
    element: (
      <PrivateRoute>
        <UsersListPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/all-configs",
    element: (
      <PrivateRoute>
        <ConfigsList />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/trashlist",
    element: (
      <PrivateRoute>
        <TrashListPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/user/:id",
    element: (
      <PrivateRoute>
        <UpdateUserPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default routes;
