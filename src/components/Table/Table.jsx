import React, { useState, useContext } from "react";
import "./Table.css";
import { StoreContext } from "../../context/StoreContext";

const Table = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guest, setGuest] = useState("");

  const { handleTableRegistration, showPopup } = useContext(StoreContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    handleTableRegistration(name, date, time, guest);
    
    setName("");
    setDate("");
    setTime("");
    setGuest("");
  };

  return (
    <div className="reservation-container" id="table">
      <h1>Table Reservation</h1>
      <form className="reservation-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">Name:</label>
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Date:</label>
          <input
            className="input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Time:</label>
          <input
            className="input"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Number of Guests:</label>
          <input
            className="input"
            type="number"
            value={guest}
            onChange={(e) => setGuest(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit" className="btn">
            Reserve Table
          </button>
        </div>
      </form>
      {showPopup && (
        <div className="popup">
          <p>Reservation Successful!</p>
        </div>
      )}
      <hr />
    </div>
  );
};

export default Table;
