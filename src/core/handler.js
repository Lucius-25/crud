import Swal from "sweetalert2";
import { disabledForm, enableForm, toast, url } from "./function";
import {
  createCourseForm,
  editCourseForm,
  editDrawer,
  recordEdit,
  recordGroup,
} from "./selector";
import { createRecord, removeRecord } from "./record";
import { Drawer } from "flowbite";

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

  disabledForm(createCourseForm);

  const res = await fetch(url("/courses"), options);
  const json = await res.json();
  recordGroup.append(createRecord(json));
  console.log(json);

  //enable form

  enableForm(createCourseForm);

  toast("Courses created successfully");

  createCourseForm.reset();
};

export const recordGroupHandler = (event) => {
  if (event.target.classList.contains("record-del")) {
    console.log("ok");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const currentRow = event.target.closest("tr");
        const currentId = currentRow.getAttribute("data-id");
        removeRecord(currentId);
        currentRow.remove();
      }
    });
  } else if (event.target.classList.contains("record-edit")) {
    const currentRow = event.target.closest("tr");
    const currentId = currentRow.getAttribute("data-id");

    console.log("u edit");

    // set btn disable

    event.target.toggleAttribute("disabled");
    fetch(url("/courses/" + currentId))
      .then((res) => res.json())
      .then((json) => {
        event.target.toggleAttribute("disabled");
        // data set

        recordEdit.querySelector("#editCourseId").value = json.id;
        recordEdit.querySelector("#editCourseTitle").value = json.title;
        recordEdit.querySelector("#editShortName").value = json.short_name;
        recordEdit.querySelector("#editFee").value = json.fee;

        // const drawer = new Drawer(recordEdit, options, instanceOptions);
        editDrawer.show();
      });
  }
};

// const currentRow = event.target.closest("tr");
//     const currentId = currentRow.getAttribute("data-id");
//     removeRecord(currentId);
//     currentId.remove();

export const editCourseFormHandler = (event) => {
  event.preventDefault();
  const formData = new FormData(editCourseForm);
  const headers = new Headers();
  const currentId = formData.get("id");
  headers.append("Content-Type", "application/json");

  const body = JSON.stringify({
    title: formData.get("course_title"),
    short_name: formData.get("short_name"),
    fee: formData.get("fee"),
  });

  const options = {
    method: "PUT",
    headers,
    body,
    redirect: "follow",
  };

  disabledForm(editCourseForm);

  fetch(url("/courses/" + currentId), options)
    .then((res) => res.json())
    .then((json) => {
      enableForm(editCourseForm);
      const currentRow = document.querySelector(`[data-id ='${currentId}']`);
      currentRow.querySelector(".record-title").innerText = json.title;
      currentRow.querySelector(".record-short").innerText = json.short_name;
      currentRow.querySelector(".record-fee").innerText = json.fee;

      toast("Update Successfully");
      editDrawer.hide();
      editCourseForm.reset();
    });
};
