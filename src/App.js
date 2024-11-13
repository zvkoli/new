import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/main/Home.js";
import Login from "./pages/auth/Login.js";
import Signup from "./pages/auth/signup.js";
import CreateForm from "./pages/main/CreateForm.js";
import { Provider } from "react-redux";
import store from "./redux_toolkit/store.js";

const App = () => {
  return (
    <Provider store={store}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create-form" element={<CreateForm />} />
        </Routes>
      </Layout>
    </Provider>
  );
};

export default App;
