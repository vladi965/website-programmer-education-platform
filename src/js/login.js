export function userLogin() {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Previene el envio del formulario
      redirigir();
    });
  }
}

function redirigir() {
  window.location.href = "/src/pages/home.html";
}
