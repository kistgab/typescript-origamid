type CourseLevel = "iniciante" | "intermediario" | "avancado";

interface Course {
  nome: string;
  horas: number;
  aulas: number;
  gratuito: boolean;
  tags: string[];
  idAulas: number[];
  nivel: CourseLevel;
}

const API_URL: string = "https://api.origamid.dev/json/cursos.json";

async function getOrigamidCourses(): Promise<Course[]> {
  const courses: Course[] = await (await fetch(API_URL)).json();
  courses.forEach(isCourse);
  return courses;
}

function isCourse(course: unknown): course is Course {
  if (
    course &&
    typeof course === "object" &&
    "nome" in course &&
    "horas" in course &&
    "tags" in course
  ) {
    return true;
  }
  return false;
}

async function handleCourses() {
  const allCourses: Course[] = await getOrigamidCourses();
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
