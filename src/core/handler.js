import Swal from "sweetalert2";
import { disabledForm, enableForm, toast, url } from "./function";
import { createCourseForm, recordGroup } from "./selector";
import { createRecord } from "./record";

export const createCourseFormHandler = async (event) => {
  event.preventDefault();
  const formData = new FormData(createCourseForm);
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const body = JSON.stringify({
    title: formData.get("course_title"),
    short_name: formData.get("short_name"),
    fee: formData.get("fee"),
  });

  const options = {
    method: "POST",
    headers,
    body,
    redirect: "follow",
  };

  //disable form

  disabledForm(createCourseForm)

  const res = await fetch(url("/courses"), options);
  const json = await res.json();
  recordGroup.append(createRecord(json))
  console.log(json);

  //enable form

  enableForm(createCourseForm)

  toast("Courses created successfully")

  createCourseForm.reset();
};
