// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import RouterConnection from "./connection/RouterConnection";
import PageLogin from "./pages/public/PageLogin";
import PageDashboard from "./pages/private/Dasboard/PageDashboard";
import Table from "./components/Table";
import PageNotFound from "./pages/public/PageNotFound";
import { usersPath, welcomePath } from "./services/UrlPaths";
import UsersList from "./pages/private/Users/UsersList";
import PrivateRoute from "./utils/PrivateRoute";
import Welcome from "./pages/private/Welcome/Welcome";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<PageLogin />} />
        <Route path="/" element={<PrivateRoute><RouterConnection /></PrivateRoute>}>
          <Route index path={welcomePath} element={<Welcome />} />
          <Route path={usersPath} element={<UsersList />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
