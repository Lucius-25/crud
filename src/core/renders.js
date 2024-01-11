import { url } from "./function";
import { renderRecord } from "./record";

const renders = () => {
  fetch(url("/courses"))
    .then((res) => res.json())
    .then((json) => renderRecord(json));
};

export default renders;
