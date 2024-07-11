import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = "http://localhost:5000/api/";

export const fetchFormData = async (activeFilter, currentPage) => {
  let endpoint;
  if (activeFilter === "today") {
    endpoint = `dwm_forms/today?page=${currentPage}`;
  } else if (activeFilter === "pending") {
    endpoint = `dwm_forms/pending?page=${currentPage}`;
  } else if (activeFilter === "saved") {
    endpoint = `dwm_forms/saved?page=${currentPage}`;
  }

  try {
    const response = await axios.get(`${baseUrl}${endpoint}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

export const addFormData = async () => {
  const postData = {
    type: "Water Consumption",
    units: "KL",
    value: null,
    date: new Date(),
    // dataType: "number",
    // validations: 99,
  };

  try {
    const response = await axios.post(`${baseUrl}dwm_form`, postData);
    toast.success(response.data.message);
  } catch (error) {
    toast.error("Something went wrong");
    // throw new Error(`Error saving data: ${error.message}`);
  }
};

export const updateFormData = async (id, newValue, type) => {
  try {
    const response = await axios.put(`${baseUrl}dwm_form/${id}`, {
      value: parseFloat(newValue),
    });

    toast.success(`Data ${type} Successfully`);
    return response.data.updatedEntry.value;
  } catch (error) {
    toast.error("Something went wrong");
    // throw new Error(`Error updating data: ${error.message}`);
  }
};
