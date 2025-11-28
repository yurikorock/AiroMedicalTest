import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://api.openbrewerydb.org/v1";

export const fetchBreweries = createAsyncThunk(
  "breweries/fetchBreweries",
  async () => {
    const response = await axios.get("/breweries");
    return response.data;
  }
);
