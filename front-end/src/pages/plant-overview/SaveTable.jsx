/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-toastify";
import { updateFormData } from "../../api/api";

const SaveTable = ({
  data,
  setData,
  totalPages,
  currentPage,
  handlePageChange,
}) => {
  const newValue = [];
  const inputActive = true;
  const activeFilter = "saved";

  // -----api-update-or-get-api---------
  const [editingRow, setEditingRow] = useState(null);
  const [editedValues, setEditedValues] = useState(
    Array(data?.length).fill("")
  ); // To store edited values

  const handleEdit = (row) => {
    setEditingRow(row._id);
    setEditedValues([...editedValues]);
  };

  const handleUpdate = async (row, index) => {
    if (isNaN(Number(editedValues[index]))) {
      toast.error("Please enter a valid numeric value");
      return;
    }
    if (!editedValues[index]) {
      toast.error("Empty value not allowed");
      return;
    }
    try {
      const updatedValue = await updateFormData(
        row._id,
        editedValues[index],
        "Updated"
      );
      const updatedData = data?.map((item) =>
        item._id == row._id ? { ...item, value: updatedValue } : item
      );
      setData(updatedData);
    } catch (error) {
      console.error("Error updating data:", error);
    }
    setEditingRow(null); // Reset editing state
  };

  const handleInputChange = (event, index) => {
    // ---------You may also want to update the data array or API accordingly
    const { value } = event.target;
    const newEditedValues = [...editedValues];
    newEditedValues[index] = value;
    setEditedValues(newEditedValues);
  };

  const isActiveInput = (row) => {
    return editingRow === row._id; // Check if the current row is being edited
  };

  return (
    <>
      {/* --------Table----- */}
      <div>
        <table className="w-100">
          <thead>
            <tr>
              <th>Type</th>
              <th>Date</th>
              <th>Values</th>
              <th>Units</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((row, index) => (
              <tr key={row._id}>
                <td>{row.type}</td>
                <td>{new Date(row.date).toLocaleDateString()}</td>
                <td>
                  <input
                    type="text"
                    placeholder="Enter Value "
                    className={`${
                      isActiveInput(row) && inputActive
                        ? "active-input"
                        : "deactive-input"
                    }`}
                    value={isActiveInput(row) ? newValue[index] : row.value}
                    onChange={(event) => handleInputChange(event, index)}
                    readOnly={!isActiveInput(row) ? true : false}
                  />
                </td>
                <td>{row.units}</td>
                <td>
                  {!isActiveInput(row) ? (
                    <button
                      className="operation-btn"
                      onClick={() => handleEdit(row)}
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      className={`${
                        row.value && activeFilter !== "saved"
                          ? "disable"
                          : "operation-btn"
                      }`}
                      onClick={() => handleUpdate(row, index)}
                    >
                      Submit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination mb-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          {[...Array(totalPages).keys()].map((i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </div>
      </div>
    </>
  );
};

export default SaveTable;
