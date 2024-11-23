import React from "react";
import { Route, Routes } from "react-router-dom";
import RouterConnection from "./connection/RouterConnection";
import PageLogin from "./pages/public/PageLogin";
import PageNotFound from "./pages/public/PageNotFound";
import { basePath, usersPath, welcomePath } from "./services/UrlPaths";
import UsersList from "./pages/private/Users/UsersList";
import PrivateRoute from "./utils/PrivateRoute";
import Welcome from "./pages/private/Welcome/Welcome";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<PageLogin />} />
        <Route path={`${basePath}`} element={<PrivateRoute><RouterConnection /></PrivateRoute>}>
          <Route index path={`${basePath}${welcomePath}`} element={<Welcome />} />
          <Route path={`${basePath}${usersPath}`} element={<UsersList />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
