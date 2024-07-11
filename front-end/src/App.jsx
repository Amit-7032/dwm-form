import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "./components";
import "./App.css";
import Plantoverview from "./pages/plant-overview/Plantoverview";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate to="/plant-overview" />} />
        <Route path="plant-overview" element={<Plantoverview />} />
      </Route>
    </>
  )
);
function App() {
  return (
    <>
      <div className="App" id="app">
        <RouterProvider router={router} />
        <ToastContainer closeOnClick />
      </div>
    </>
  );
}

export default App;
