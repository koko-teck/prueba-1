// Set this to the address that should receive contact-form inquiries.
const CONTACT_EMAIL = "";

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.querySelector(".sr-only").textContent = isOpen ? "Abrir menú" : "Cerrar menú";
  primaryNav.classList.toggle("is-open", !isOpen);
});

primaryNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.querySelector(".sr-only").textContent = "Abrir menú";
    primaryNav.classList.remove("is-open");
  }
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.classList.remove("is-error");

  if (!contactForm.reportValidity(kokofabrica@gmailcom)) return;

  if (!CONTACT_EMAIL) {
    formStatus.textContent = "El formulario todavía no está conectado. Configurá un correo de contacto en script.js para poder enviar tu consulta.";
    formStatus.classList.add("is-error");
    return;
  }

  const data = new FormData(contactForm);
  const subject = `Consulta web: ${data.get("service")}`;
  const body = [
    `Nombre: ${data.get("name")}`,
    `Correo: ${data.get("email")}`,
    `Trámite: ${data.get("service")}`,
    "",
    "Consulta:",
    data.get("message"),
  ].join("\n");

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  formStatus.textContent = "Se abrió tu aplicación de correo con la consulta preparada. Revisala y enviala para que podamos recibirla.";
});
