import { BrowserRouter, Route, Routes } from "react-router-dom";
import { appRoutes } from "./routes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {appRoutes.map(({ path, component }) => (
          <Route path={path} element={component} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
