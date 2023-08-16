window.onload = () => {
  // Selección de elementos del DOM
  const arrowRight = document.querySelector(".arrow-right");
  const arrowLeft = document.querySelector(".arrow-left");
  const sendButton = document.querySelector(".form__send-button");
  const projects = document.querySelectorAll(".carousel__img");
  // Event Listeners para diferentes acciones
  arrowRight.addEventListener("click", clickRight); // Avanzar en el carrusel
  arrowLeft.addEventListener("click", clickLeft); // Retroceder en el carrusel
  sendButton.addEventListener("click", showNotification); // Mostrar notificación
  projects.forEach(project => {
    project.addEventListener("click", openModal); // Abrir modal de proyecto
  });
};

// Constantes para valores numéricos clave
const PROJECT_WIDTH = 270; // Ancho de cada proyecto en el carrusel
const MODAL_DISPLAY_DURATION = 3000; // Duración de visualización de notificación
const projectContainer = document.querySelector(".project-container");
const projects = document.querySelectorAll(".project");
let lastProjectIndex = 2;
let firstProjectIndex = 0;

// Función para avanzar en el carrusel
function clickRight() {
  // debugger;
  const currentLeft = parseInt(getComputedStyle(projectContainer).left, 10);
  if (currentLeft < -PROJECT_WIDTH) {
    return;
  }
  let newValue = currentLeft - PROJECT_WIDTH;
  projectContainer.style.left = `${newValue}px`;
  if(lastProjectIndex < projects.length){
    ++lastProjectIndex;
    projects[lastProjectIndex].setAttribute("aria-hidden", "false");
    projects[firstProjectIndex].setAttribute("aria-hidden", "true");
    ++firstProjectIndex;
  }

}

// Función para retroceder en el carrusel
function clickLeft() {
  // debugger;
  const currentLeft = parseInt(getComputedStyle(projectContainer).left, 10);
  if (currentLeft === 0) {
    return;
  }
  let newValue = currentLeft + PROJECT_WIDTH;
  projectContainer.style.left = `${newValue}px`;
  if(firstProjectIndex >= 0){
    --firstProjectIndex;
    projects[firstProjectIndex].setAttribute("aria-hidden", "false");
    projects[lastProjectIndex].setAttribute("aria-hidden", "true");
    --lastProjectIndex;
  }
}

// Función para mostrar notificación y ocultarla después de un tiempo
function showNotification() {
  const notification = document.querySelector(".notification");
  notification.style.display = "flex";
  setTimeout(function () {
    notification.style.display = "none";
  }, MODAL_DISPLAY_DURATION);
}

// Función para abrir el modal de proyecto
function openModal() {
  const modalContainer = document.querySelector(".modal-container");
  modalContainer.style.display = "flex";
  document.body.addEventListener("click", closeModal);
}

// Función para cerrar el modal si se hace clic fuera de él
function closeModal(e) {
  const targetClass = e.target.className;
  const modalContainer = document.querySelector(".modal-container");
  if (targetClass.includes("carousel__img") || targetClass === "modal") {
    return;
  } else {
    modalContainer.style.display = "none";
  }
}