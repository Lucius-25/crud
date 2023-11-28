import { recordUiTemplate } from "./selector";

export const createRecord = (record) => {
  const recordUi = recordUiTemplate.cloneNode(true);
  recordUi.querySelector(".record-title").innerText = record.title;
  recordUi.querySelector(".record-short").innerText = record.short_name;
  recordUi.querySelector(".record-fee").innerText = record.fee;
  return recordUi();
};
