import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Pets from "./components/Pets/Pets";
import Medications from "./components/Medications/Medications";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/v1/pets" element={<Pets />} />
        <Route path="/v1/medications" element={<Medications />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
