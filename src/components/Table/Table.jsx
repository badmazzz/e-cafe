import React, { useState, useContext } from "react";
import "./Table.css";
import { StoreContext } from "../../context/StoreContext";
import TableReserved from "../TableReserved/TableReserved";

const Table = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guest, setGuest] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const { handleTableRegistration } = useContext(StoreContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    handleTableRegistration(name, date, time, guest);
    setShowPopup(true);

    setName("");
    setDate("");
    setTime("");
    setGuest("");

    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  return (
    <div className="reservation-container" id="table">
      <h2>Table Reservation</h2>
      <form className="reservation-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Number of Guests:</label>
          <input
            type="number"
            value={guest}
            onChange={(e) => setGuest(e.target.value)}
            required
          />
        </div>
        <div className="btn">
          <button type="submit">Reserve Table</button>
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
