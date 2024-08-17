import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import SignupPage from "./page/SignupPage";
import SigninPage from "./page/SigninPage";
import HomePage from "./page/HomePage";
import { useEffect, useState } from "react";
import Layout from "./layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData } from "./store/slice/userSlice/userThunk";
import UserDetail from "./page/user/UserDetail";
import Home from "./page/user/Home";
import Videos from "./page/user/Videos";

function App() {
  const { userAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUserData());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout userAuth={userAuth} />}>
          <Route index element={<HomePage userAuth={userAuth} />} />
          <Route
            path="/user-detail"
            element={<UserDetail userAuth={userAuth} />}
          >
            <Route index element={<Home />} />
            <Route path="/user-detail/videos" element={<Videos />} />
          </Route>
        </Route>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
