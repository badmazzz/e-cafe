import React,{useState} from "react";
import "./AppDownload.css";

const AppDownload = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted:", { name, email, date, time, guests });

    setShowPopup(true);

    setName("");
    setEmail("");
    setDate("");
    setTime("");
    setGuests("");
    ds;
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };
  return (
    <div className="reservation-container">
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
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reserve Table</button>
      </form>
    </div>
  );
};

export default AppDownload;
