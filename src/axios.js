import axios from "axios";

axios.defaults.baseURL = "https://flashpay-backend-develop.herokuapp.com/api/";
// axios.defaults.baseURL = "http://develop.api.flashpay.finance/api/";

axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.headers.common["Authorization"] = !!localStorage.getItem(
  "access_token"
)
  ? `Bearer ${localStorage.getItem("access_token")}`
  : "";

// axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
