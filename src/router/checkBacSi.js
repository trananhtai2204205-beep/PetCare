import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
export default function (to, from, next) {
  var token = localStorage.getItem("token_bac_si");
  axios
    .get("http://127.0.0.1:8000/api/bac-si/check-token", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      if (res.data.status) {
        localStorage.setItem("ho_ten_bac_si", res.data.ho_ten);
        localStorage.setItem("bac_si_chuc_danh", res.data.chuc_danh);
        next();
      } else {
        next("/bac-si/login");
        toaster.error(res.data.message);
      }
    });
}
