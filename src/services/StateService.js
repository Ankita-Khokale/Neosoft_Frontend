import axios from "axios";
const API_URL = "https://localhost:7165/api/State";


const getStates = () => axios.get(API_URL);
const getStatesByCountryId = (countryId) => axios.get(`${API_URL}/byCountry/${countryId}`);
export { getStatesByCountryId, getStates };