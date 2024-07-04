import axios from "axios";
import styles from "./AddPetForm.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function AddPetForm() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/v1/pets`, {
        name,
        dob,
        client_email: clientEmail,
      });
      navigate(-1);
    } catch (error) {
      console.error("Error adding pet", error);
    }
  }

  function handleBackButton() {
    navigate(-1);
  }

  return (
    <div className={styles.addPetPage}>
      <button className={styles.backButton} onClick={handleBackButton}>
        Back
      </button>
      <h1>Add Pet</h1>
      <form className={styles.addPetForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="clientEmail">Client Email</label>
          <input
            type="email"
            id="clientEmail"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Add Pet
        </button>
      </form>
    </div>
  );
}
