"use strict";
var tipoCurso;
(function (tipoCurso) {
    tipoCurso[tipoCurso["avancado"] = 0] = "avancado";
    tipoCurso[tipoCurso["iniciante"] = 1] = "iniciante";
})(tipoCurso || (tipoCurso = {}));
async function fetchCursos() {
    const response = await fetch("https://api.origamid.dev/json/cursos.json");
    const data = await response.json();
    mostrarCursos(data);
}
fetchCursos();
function mostrarCursos(cursos) {
    console.log(cursos);
    const cursoComponent = cursos.map((curso) => `
      <h1 style="color:${curso.nivel === tipoCurso.iniciante ? "blue" : "red"}">${curso.nome} </h1>
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
    `);
    console.log(cursoComponent);
    cursoComponent.forEach((curso) => (document.body.innerHTML += curso));
}
