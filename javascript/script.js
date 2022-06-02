function openModal() {
  document.getElementById("modal").classList.add("modal-active");
}

function closeModal() {
  document.getElementById("modal").classList.remove("modal-active");
}

function getLocalStorageItens() {
  return JSON.parse(localStorage.getItem("localStorageAnimalList")) ?? [];
}
function updateLocalStorageItens(updatedItem) {
  localStorage.setItem("localStorageAnimalList", JSON.stringify(updatedItem));
  removeRows();
  refreshTable();
}

function init() {
  refreshTable();
}

function removeRows() {
  const rows = document.querySelectorAll("#table-body>tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
}

function refreshTable() {
  const localStorageResponse = getLocalStorageItens();
  localStorageResponse.forEach((item, index) => {
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
          <span><img src="assets/icons/edit-icon.svg" id="edit-${index}" class="icons-action-table" /></span>
          <span><img src="assets/icons/delete-icon.svg" id="delete-${index}" class="icons-action-table" /></span>
        </td>
      </tr>`;

    document.getElementById("table-body").appendChild(newRow);
  });
}

// CRUD
function createItem() {
  const localStorageResponse = getLocalStorageItens();

  const tutor = document.getElementById("tutor");
  const animal = document.getElementById("animal");
  const raca = document.getElementById("raca");
  const idade = document.getElementById("idade");
  const emailTutor = document.getElementById("email-tutor");
  const telefoneTutor = document.getElementById("telefone-tutor");
  const bairroTutor = document.getElementById("bairro-tutor");
  const adotado = document.getElementById("adotado");

  const newItem = {
    id: localStorageResponse.length + 1,
    tutor: tutor.value,
    animal: animal.value,
    raca: raca.value,
    idade: idade.value,
    emailTutor: emailTutor.value,
    telefoneTutor: telefoneTutor.value,
    bairroTutor: bairroTutor.value,
    adotado: adotado.checked,
  };

  localStorageResponse.push(newItem);
  updateLocalStorageItens(localStorageResponse);
}

function updateItem(id) {
  const localStorageResponse = getLocalStorageItens();

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

  localStorageResponse[id] = newItem;
  updateLocalStorageItens(localStorageResponse);
}

function deleteItem(id) {
  const localStorageResponse = getLocalStorageItens();
  delete localStorageResponse.splice(id, 1);

  updateLocalStorageItens(localStorageResponse);
  closeModal();
}

init();

// EVENTOS
document.getElementById("table-body").addEventListener("click", (e) => {
  const [action, id] = e.target.id.split("-");

  if (action === "edit") {
    openModal();
    const localStorageResponse = getLocalStorageItens();
    const itemToUpdate = localStorageResponse[id];

    document.getElementById("tutor").value = itemToUpdate.tutor;
    document.getElementById("animal").value = itemToUpdate.animal;
    document.getElementById("raca").value = itemToUpdate.raca;
    document.getElementById("idade").value = itemToUpdate.idade;
    document.getElementById("email-tutor").value = itemToUpdate.emailTutor;
    document.getElementById("telefone-tutor").value =
      itemToUpdate.telefoneTutor;
    document.getElementById("bairro-tutor").value = itemToUpdate.bairroTutor;
    document.getElementById("adotado").checked = itemToUpdate.adotado;

    const botaoEditar = document.getElementById("btn-save-modal");
    botaoEditar.textContent = "Confirmar alterações";
    botaoEditar.addEventListener("click", () => {
      updateItem(id);
    });
  } else if (action === "delete") {
    document
      .getElementById("confirmation-dialog")
      .classList.add("confirmation-dialog-active");

    document
      .getElementById("btn-confirm-confirmation-dialog")
      .addEventListener("click", () => {
        deleteItem(id);
        document
          .getElementById("confirmation-dialog")
          .classList.remove("confirmation-dialog-active");
      });

    document
      .getElementById("btn-refuse-confirmation-dialog")
      .addEventListener("click", () => {
        document
          .getElementById("confirmation-dialog")
          .classList.remove("confirmation-dialog-active");
      });
  }
});
