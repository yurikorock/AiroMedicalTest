import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://api.openbrewerydb.org/v1";

export const fetchBreweries = createAsyncThunk(
  "breweries/fetchBreweries",
  async (page) => {
    const response = await axios.get("/breweries", {params: {
        per_page: 15,
        page,
    }});
    return response.data;
  }
);
