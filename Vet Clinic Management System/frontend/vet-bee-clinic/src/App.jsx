import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Pets from "./components/Pets/Pets";
import Medications from "./components/Medications/Medications";
import Footer from "./components/Footer/Footer";
import AddPetForm from "./components/AddPetForm/AddPetForm";
import AddMedicationForm from "./components/AddMedicationForm/AddMedicationForm";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to={"/v1/pets"} />} />
        <Route path="/v1/pets" element={<Pets />} />
        <Route path="/v1/medications" element={<Medications />} />
        <Route path="/v1/add-pet" element={<AddPetForm />} />
        <Route path="/v1/add-medication" element={<AddMedicationForm />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
