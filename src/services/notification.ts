import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function notify(type: "error" | "success" | "warning", message: string) {
  if (type === "error") {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  if (type === "success") {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      className: "toastsuccess",
      bodyClassName: "bodytoast",
    });
  }
  if (type === "warning") {
    toast.warning(message, {
      position: toast.POSITION.TOP_RIGHT,
      className: "toastwarning",
      bodyClassName: "bodytoast",
    });
  }
}

export { notify };
