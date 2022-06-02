function openModal() {
  document.getElementById("modal").classList.add("modal-active");
}

function closeModal() {
  document.getElementById("modal").classList.remove("modal-active");
}

function getLocalStorageItens() {
  return JSON.parse(localStorage.getItem("localStorageAnimalList")) ?? [];
}

function init() {
  refreshTable();
}

function refreshTable() {
  const localStorageResponse = getLocalStorageItens();

  localStorageResponse.forEach((item) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <tr>
        <td>${item.tutor}</td>
        <td>${item.animal}</td>
        <td>${item.raca}</td>
        <td>${item.idade}</td>
        <td>${item.emailTutor}</td>
        <td>${item.telefoneTutor}</td>
        <td>${item.bairroTutor}</td>
        <td>${item.adotado === true ? "&#10004" : "&#128078"}</td>
        <td>
          <span><img src="assets/icons/edit-icon.svg" id="icon-edit" /></span>
          <span><img src="assets/icons/delete-icon.svg" id="icon-delete" /></span>
        </td>
      </tr>`;

    document.getElementById("table-body").appendChild(newRow);
  });
}

// CRUD
function createItem() {
  const tutor = document.getElementById("tutor");
  const animal = document.getElementById("animal");
  const raca = document.getElementById("raca");
  const idade = document.getElementById("idade");
  const emailTutor = document.getElementById("email-tutor");
  const telefoneTutor = document.getElementById("telefone-tutor");
  const bairroTutor = document.getElementById("bairro-tutor");
  const adotado = document.getElementById("adotado");

  const newItem = {
    tutor: tutor.value,
    animal: animal.value,
    raca: raca.value,
    idade: idade.value,
    emailTutor: emailTutor.value,
    telefoneTutor: telefoneTutor.value,
    bairroTutor: bairroTutor.value,
    adotado: adotado.checked,
  };

  const localStorageResponse = getLocalStorageItens();
  localStorageResponse.push(newItem);

  localStorage.setItem(
    "localStorageAnimalList",
    JSON.stringify(localStorageResponse)
  );
}

function deletarItem() {
  alert("deletou");
}

init();

// EVENTOS
document.getElementById("icon-edit").addEventListener("click", () => {
  openModal();
});

document.getElementById("icon-delete").addEventListener("click", () => {
  document
    .getElementById("confirmation-dialog")
    .classList.add("confirmation-dialog-active");
});

document
  .getElementById("btn-refuse-confirmation-dialog")
  .addEventListener("click", () => {
    document
      .getElementById("confirmation-dialog")
      .classList.remove("confirmation-dialog-active");
  });

document
  .getElementById("btn-confirm-confirmation-dialog")
  .addEventListener("click", deletarItem);
