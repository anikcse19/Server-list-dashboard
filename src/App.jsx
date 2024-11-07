// import LoginPage from "./pages/LoginPage";

import ClientListsPage from "./pages/Dashboard/ClientListsPage";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <div className="w-full h-full">
      <PrivateRoute>
        <ClientListsPage />
      </PrivateRoute>
    </div>
  );
}

export default App;
