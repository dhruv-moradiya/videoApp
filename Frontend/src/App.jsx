import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./page/SignupPage";
import SigninPage from "./page/SigninPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// cloud_name: 'dpji4qfnu',
// api_key: '882453247339477',
// api_secret: 'B_JBn7v2o_tzDEVn0EWhmh10WKQ'
