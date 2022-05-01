import axios from "axios";

const baseURL = "https://vpic.nhtsa.dot.gov/api";

export default axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});
