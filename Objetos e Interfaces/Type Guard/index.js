"use strict";
const API_URL = "https://api.origamid.dev/json/cursos.json";
async function getOrigamidCourses() {
    const courses = await (await fetch(API_URL)).json();
    courses.forEach(isCourse);
    return courses;
}
function isCourse(course) {
    if (course &&
        typeof course === "object" &&
        "nome" in course &&
        "horas" in course &&
        "tags" in course) {
        return true;
    }
    return false;
}
async function handleCourses() {
    const allCourses = await getOrigamidCourses();
    if (!Array.isArray(allCourses)) {
        return;
    }
    allCourses.filter(isCourse).forEach((item) => {
        document.body.innerHTML += `
        <div>
          <h2>${item.nome}</h2>
          <p>${item.horas}</p>
          <p>${item.tags.join(", ")}</p>
        </div>
      `;
    });
}
handleCourses();
