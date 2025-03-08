import axios from "axios";
const API_URL = "https://localhost:7165/api/Country";

const getCountries = () => axios.get(API_URL);
export { getCountries };