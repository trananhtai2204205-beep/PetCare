import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
export default function (to, from, next) {
  var token = localStorage.getItem("token_le_tan");
  axios
    .get("http://127.0.0.1:8000/api/le-tan/check-token", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      if (res.data.status) {
        localStorage.setItem("ho_ten_le_tan", res.data.ho_ten);
        next();
      } else {
        next("/login");
        toaster.error(res.data.message);
      }
    });
}
