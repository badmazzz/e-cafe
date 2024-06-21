import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import "./TableReserved.css"; // Ensure this path is correct

function TableReserved() {
  const { table, handleDeleteTable } = useContext(StoreContext);

  const handleEdit = (id) => {
    console.log("Edit item with id:", id);
    // Define your edit logic here
  };

  const handleDelete = (id) => {
    console.log(id);
    handleDeleteTable(id);
  };

  return (
    <div className="container">
      <h2>Reserved Tables</h2>
      <div className="table-wrapper">
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">
                <h3>Username</h3>
              </th>
              <th scope="col">
                <h3>Date</h3>
              </th>
              <th scope="col">
                <h3>Time</h3>
              </th>
              <th scope="col">
                <h3>Guests</h3>
              </th>
              <th scope="col">
                <h3>Actions</h3>
              </th>
            </tr>
          </thead>
          <tbody>
            {table.map((item) => (
              <tr key={item._id}>
                <td>{item.user.username}</td>
                <td>
                  {
                    (new Date(item.date).toLocaleDateString(
                      "en-CA"
                    ))
                  }
                </td>
                <td>{item.time}</td>
                <td>{item.guests}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn btn-sm mx-1"
                      onClick={() => handleEdit(item._id)}
                    >
                      <img
                        src={assets.edit_icon}
                        alt="Edit"
                        className="edit-icon"
                      />
                    </button>
                    <button
                      className="btn btn-sm mx-1"
                      onClick={() => handleDelete(item._id)}
                    >
                      <img
                        src={assets.trash_icon}
                        alt="Delete"
                        className="delete-icon"
                      />
                    </button>
                  </div>
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
