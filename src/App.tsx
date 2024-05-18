import { useState } from "react";
import { AppContext } from "./AppContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Listing from "./Views/Listing/Listing";
import Registration from "./Views/ResumeBuilder/ResumeBuilder";
import Resume from "./Views/ResumeDetails/ResumeDetails";
import Home from "./Views/Home/Home";
import LandingPage from "./Views/LandingPage/LandingPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <AppContext>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="list-all" element={<Listing />} />
            <Route path="resume/:id" element={<Resume />} />
            <Route path="resume-builder" element={<Registration />} />
          </Route>
        </Routes>
      </AppContext>
    </BrowserRouter>
  );
}

export default App;
