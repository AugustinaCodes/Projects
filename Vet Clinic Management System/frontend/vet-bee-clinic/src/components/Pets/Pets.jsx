import axios from "axios";
import PetContainer from "../PetContainer/PetContainer";
import styles from "./Pets.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function Pets() {
  const [pets, setPets] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/v1/pets`)
      .then((response) => {
        setPets(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleAddPet() {
    navigate("/v1/add-pet");
  }

  function handleViewLog(id) {
    navigate(`/v1/health-records/${id}`);
  }

  async function handleArchivePet(id) {
    try {
      await axios.delete(`${API_URL}/v1/pets/${id}`);
      const response = await axios.get(`${API_URL}/v1/pets`);
      setPets(response.data);
    } catch (error) {
      console.error("Error archiving pet", error);
    }
  }

  return (
    <div className={styles.petsPage}>
      <div className={styles.header}>
        <h1>Pet List</h1>
        <button className={styles.addPet} onClick={handleAddPet}>
          Add Pet
        </button>
      </div>
      <div className={styles.petList}>
        {pets.map((pet) => (
          <PetContainer
            key={pet._id}
            pet={pet}
            onViewLog={handleViewLog}
            onDelete={handleArchivePet}
          />
        ))}
      </div>
    </div>
  );
}
