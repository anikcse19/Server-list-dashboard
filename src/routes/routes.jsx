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
import SubClientTrashPage from "../pages/Dashboard/SubClientTrashPage";
import GeneralConfigList from "../pages/Dashboard/GeneralConfigList";
import SMSSetting from "../pages/Dashboard/Settings/SMSSetting";
import TransactionHistoryPage from "../pages/Dashboard/TransactionHistory/TransactionHistoryPage";
import SendSMSWAAlert from "../pages/Dashboard/SMS/SendSMSWAAlert";
import WhatsappConfigList from "../pages/Dashboard/WhatsappConfigList";
import LoginPageSubClient from "../pages/LoginPageSubClient";
import ClientConfigPage from "../pages/Dashboard/ClientConfig/ClientConfigPage";
import SetPrivateConfigPage from "../pages/Dashboard/ClientConfig/SetPrivateConfigPage";
import SetGroupConfigPage from "../pages/Dashboard/ClientConfig/SetGroupConfigPage";

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
    path: "/dashboard/client/config-profile/sms-config",
    element: (
      <PrivateRoute>
        <ConfigsList />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/client/config-profile/general-config",
    element: (
      <PrivateRoute>
        <GeneralConfigList />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/client/config-profile/whatsapp-config",
    element: (
      <PrivateRoute>
        <WhatsappConfigList />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/sub-client/settings/sms-setting",
    element: (
      <PrivateRoute>
        <SMSSetting />
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
    path: "/dashboard/trashlist/sub-client",
    element: (
      <PrivateRoute>
        <SubClientTrashPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/sub-client/sms/set-wa-alert",
    element: (
      <PrivateRoute>
        <SendSMSWAAlert />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/transaction-history/:id",
    element: (
      <PrivateRoute>
        <TransactionHistoryPage />
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
    path: "/dashboard/client/configs",
    element: (
      <PrivateRoute>
        <ClientConfigPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/client/private-config",
    element: (
      <PrivateRoute>
        <SetPrivateConfigPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/client/group-config",
    element: (
      <PrivateRoute>
        <SetGroupConfigPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPageSubClient />,
  },
  {
    path: "/admin/login",
    element: <LoginPage />,
  },
]);

export default routes;
