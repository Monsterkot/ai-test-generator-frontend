import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer position="bottom-right" theme="dark" />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
