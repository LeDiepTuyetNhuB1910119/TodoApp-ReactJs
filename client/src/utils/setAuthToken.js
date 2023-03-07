import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    // Đặt header mặc định nếu có token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Xóa header nếu k có token, để chặn các req về sau
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
