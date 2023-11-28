import { createCourseFormHandler } from "./handler";
import { createCourseForm } from "./selector";

const listeners = () => {
    createCourseForm.addEventListener("submit", createCourseFormHandler)
}

export default listeners;