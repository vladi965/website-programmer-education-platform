// Función para enviar datos de registro
document
  .getElementById("registerForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

    const response = await fetch("http://localhost:5500/src/pages/registrar", {
      method: "POST",
    });
  });
