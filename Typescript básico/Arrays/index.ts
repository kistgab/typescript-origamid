enum tipoCurso {
  "avancado",
  "iniciante",
}

interface Curso {
  aulas: number;
  gratuito: boolean;
  horas: number;
  idAulas: number[];
  nivel: tipoCurso;
  tags: string[];
  nome: string;
}

async function fetchCursos() {
  const response = await fetch("https://api.origamid.dev/json/cursos.json");
  const data = await response.json();
  mostrarCursos(data);
}

fetchCursos();

function mostrarCursos(cursos: Array<Curso>) {
  console.log(cursos);
  const cursoComponent = cursos.map(
    (curso: Curso) =>
      `
      <h1 style="color:${
        curso.nivel === tipoCurso.iniciante ? "blue" : "red"
      }">${curso.nome} </h1>
      <p>${curso.horas}</p>
      <p>O Curso é gratuíto? ${curso.gratuito ? "Sim" : "Não"}</p>
      <p>Nível: ${curso.nivel}</p>
      <p>Qtd de aulas: ${curso.aulas}</p>
      <h2>Aulas:</h2>
      <ul>
        ${curso.idAulas.map((idAula) => `<li>${idAula}</li>`)}
      </ul>
      <h2>Tags</h2>
      <ul>
        ${curso.tags.map((tag) => `<li>${tag}</li>`)}
      </ul>
    `
  );

  console.log(cursoComponent);
  cursoComponent.forEach((curso) => (document.body.innerHTML += curso));
}
