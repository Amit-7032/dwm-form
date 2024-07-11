/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SaveTable from "./SaveTable";
import { addFormData, fetchFormData, updateFormData } from "../../api/api";
import calender from "../../assets/icons/calendar.svg";
import "../../styles/plantoverview.css";

function Plantoverview() {
  const [newValue, setNewValue] = useState([]);
  const [data, setData] = useState([]);
  const [inputActive, setInputActive] = useState(true); // ------flag for submission status
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeFilter, setActiveFilter] = useState("today");
  const [loading, setLoading] = useState(false); // ------loading state

  // -----api-update-or-get-api---------
  useEffect(() => {
    fetchData();
  }, [activeFilter, currentPage]);

  const handleAddFormdata = async () => {
    try {
      await addFormData();
      setNewValue("");
      fetchData(); // fetch data after saving
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { entries, totalPages } = await fetchFormData(
        activeFilter,
        currentPage
      );
      setData(entries);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (row, index) => {
    if (!newValue[index]) {
      toast.error("Empty value not allowed");
      return;
    }
    if (isNaN(Number(newValue[index]))) {
      toast.error("Please enter a valid numeric value");
      return;
    }
    try {
      const updatedValue = await updateFormData(
        row._id,
        newValue[index],
        "Added"
      );
      const updatedData = data.map((item) =>
        item._id === row._id ? { ...item, value: updatedValue } : item
      );
      setData(updatedData);
      setNewValue("");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const newValues = [...newValue];
    newValues[index] = value;
    setNewValue(newValues);
  };

  const handleFilterClick = (filter) => {
    setCurrentPage(1);
    setActiveFilter(filter);
    setInputActive(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="plant-overview-container">
      <div className="table-header d-flex align-items-center justify-content-between mb-3">
        <h4 className="table-header-title m-0">DWM Form</h4>
        <div className="table-filter d-flex">
          <div className="comman-box table-filter-title px-4 mr-3">
            <span
              className={`cursor-pointer ${
                activeFilter === "today" ? "underline" : ""
              }`}
              onClick={() => handleFilterClick("today")}
            >
              Today’s
            </span>
            <div className="divdie-line-horizontal"></div>
            <span
              className={`cursor-pointer ${
                activeFilter === "pending" ? "underline" : ""
              }`}
              onClick={() => handleFilterClick("pending")}
            >
              Pending
            </span>
            <div className="divdie-line-horizontal"></div>
            <span
              className={`cursor-pointer ${
                activeFilter === "saved" ? "underline" : ""
              }`}
              onClick={() => handleFilterClick("saved")}
            >
              Saved
            </span>
          </div>
          <div className="calender comman-box px-3 d-flex align-items-center justify-content-center">
            <img src={calender} alt="" className="cursor-pointer" />
          </div>
          {activeFilter === "today" && (
            <button
              className="palnts-btn ml-3 mx-auto"
              onClick={handleAddFormdata}
            >
              Add Data
            </button>
          )}
        </div>
      </div>

      <div className="plant-overview-table comman-box p-2">
        {loading ? (
          <p className="text-center fw-bold fs-3">Loading...</p>
        ) : data.length === 0 ? (
          <p className="text-center fw-bold fs-3">No data available.</p>
        ) : activeFilter !== "saved" ? (
          <>
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
                      {activeFilter === "today" || activeFilter === "saved" ? (
                        <input
                          type="text"
                          placeholder="Enter Value"
                          className={`${
                            inputActive &&
                            (row.value === null || row.value === undefined)
                              ? "active-input"
                              : "deactive-input"
                          }`}
                          value={
                            row.value === null ? newValue[index] : row.value
                          }
                          onChange={(event) => handleInputChange(event, index)}
                          readOnly={
                            inputActive &&
                            (row.value === null || row.value === undefined)
                              ? false
                              : true
                          }
                        />
                      ) : (
                        0
                      )}
                    </td>
                    <td>{row.units}</td>
                    <td>
                      {activeFilter === "today" && (
                        <button
                          className={`${
                            row.value && activeFilter !== "saved"
                              ? "disable"
                              : "operation-btn"
                          }`}
                          onClick={() => handleUpdate(row, index)}
                          disabled={row.value && activeFilter !== "saved"}
                        >
                          Submit
                        </button>
                      )}

                      {row.value == null && activeFilter === "pending" && (
                        <button
                          // onClick={() => handleEdit(row, index)}
                          className={`${
                            row.value === null ? "disable" : "operation-btn"
                          }`}
                          disabled={row.value === null}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

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
          </>
        ) : (
          <SaveTable
            data={data}
            setData={setData}
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

export default Plantoverview;
