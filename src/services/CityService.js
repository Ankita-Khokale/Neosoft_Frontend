import axios from "axios";
const API_URL = "https://localhost:7165/api/City";

const getCities = () => axios.get(API_URL);
const getCitiesByStateId = (stateId) => axios.get(`${API_URL}/byState/${stateId}`);
export { getCitiesByStateId, getCities };