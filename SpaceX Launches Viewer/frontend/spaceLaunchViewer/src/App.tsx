import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import LaunchList from "./components/LaunchList/LaunchList";
import LaunchDetails from "./components/LaunchDetails/LaunchDetails";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/launches" element={<LaunchList />} />
        <Route path="/launch/:id" element={<LaunchDetails />} />
      </Routes>
    </div>
  );
}

export default App;
