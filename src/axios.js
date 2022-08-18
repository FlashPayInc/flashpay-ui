import axios from "axios";

axios.defaults.baseURL = "https://flashpay-backend-develop.herokuapp.com/api/";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

axios.defaults.headers.common["Authorization"] = !!localStorage.getItem("token")
  ? `Bearer ${localStorage.getItem("token")}`
  : "";
