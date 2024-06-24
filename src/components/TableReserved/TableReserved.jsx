import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import "./TableReserved.css"; // Ensure this path is correct

function TableReserved() {
  const { table, handleDeleteTable, user } = useContext(StoreContext);

  const handleEdit = (id) => {
    console.log("Edit item with id:", id);
    // Implement edit functionality as needed
  };

  const handleDelete = (id) => {
    console.log("Delete item with id:", id);
    handleDeleteTable(id);
  };

  return (
    <div className="table-container">
      <h2>Reserved Tables</h2>
      <div className="table-wrapper">
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Username</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {table.map((item) => (
              <tr key={item._id}>
                <td data-label="Username">{item.user.username}</td>
                <td data-label="Date">
                  {new Date(item.date).toLocaleDateString("en-CA")}
                </td>
                <td data-label="Time">{item.time}</td>
                <td data-label="Guests">{item.guests}</td>
                <td className="action-column" data-label="Edit">
                  <button
                    className="btn1 btn-sm mx-1"
                    onClick={() => handleEdit(item._id)}
                  >
                    <img
                      src={assets.edit_icon}
                      alt="Edit"
                      className="edit-icon"
                      height={20}
                      width={20}
                    />
                  </button>
                </td>
                <td className="action-column" data-label="Delete">
                  <button
                    className="btn1 btn-sm mx-1"
                    onClick={() => handleDelete(item._id)}
                  >
                    <img
                      src={assets.trash_icon}
                      alt="Delete"
                      className="delete-icon"
                      height={20}
                      width={20}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableReserved;
