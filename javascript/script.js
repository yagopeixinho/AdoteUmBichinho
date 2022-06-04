// ============ FUNÇÕES GERAIS ============
function openModal() {
  document.getElementById("modal").classList.add("modal-active");
}

function closeModal() {
  document.getElementById("modal").classList.remove("modal-active");
  clearModalFields();
}

function getLocalStorageItens() {
  return JSON.parse(localStorage.getItem("localStorageAnimalList")) ?? [];
}

function updateLocalStorageItens(updatedItem) {
  localStorage.setItem("localStorageAnimalList", JSON.stringify(updatedItem));
  removeRows();
  refreshTable();
}

function removeRows() {
  const rows = document.querySelectorAll("#table-body>tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
}

function clearModalFields() {
  document.getElementById("tutor").value = "";
  document.getElementById("animal").value = "";
  document.getElementById("raca").value = "";
  document.getElementById("idade").value = "";
  document.getElementById("email-tutor").value = "";
  document.getElementById("telefone-tutor").value = "";
  document.getElementById("bairro-tutor").value = "";
  document.getElementById("adotado").checked = false;
}

function verifyFields() {
  return document.getElementById("form-animal-modal").reportValidity();
}

// ============ CRUD (CREATE, READ, UPDATE, DELETE) ============
function createItem() {
  const localStorageResponse = getLocalStorageItens();

  const newItem = {
    tutor: document.getElementById("tutor").value,
    animal: document.getElementById("animal").value,
    raca: document.getElementById("raca").value,
    idade: document.getElementById("idade").value,
    emailTutor: document.getElementById("email-tutor").value,
    telefoneTutor: document.getElementById("telefone-tutor").value,
    bairroTutor: document.getElementById("bairro-tutor").value,
    adotado: document.getElementById("adotado").checked,
  };

  if (verifyFields()) {
    localStorageResponse.push(newItem);
    updateLocalStorageItens(localStorageResponse);
  }
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
        <td>${item.adotado === true ? "&#10004" : "Em progresso..."}</td>
        <td>
          <span><img src="assets/icons/edit-icon.svg" id="edit-${index}" class="icons-action-table" /></span>
          <span><img src="assets/icons/delete-icon.svg" id="delete-${index}" class="icons-action-table" /></span>
        </td>
      </tr>`;

    document.getElementById("table-body").appendChild(newRow);
  });
}

function updateItem(id) {
  const localStorageResponse = getLocalStorageItens();

  const updatedItem = {
    tutor: document.getElementById("tutor").value,
    animal: document.getElementById("animal").value,
    raca: document.getElementById("raca").value,
    idade: document.getElementById("idade").value,
    emailTutor: document.getElementById("email-tutor").value,
    telefoneTutor: document.getElementById("telefone-tutor").value,
    bairroTutor: document.getElementById("bairro-tutor").value,
    adotado: document.getElementById("adotado").checked,
  };

  if (verifyFields()) {
    localStorageResponse[id] = updatedItem;
    updateLocalStorageItens(localStorageResponse);
  }
}

function deleteItem(id) {
  debugger;
  const localStorageResponse = getLocalStorageItens();
  delete localStorageResponse.splice(id, 1);

  updateLocalStorageItens(localStorageResponse);
  document
    .getElementById("confirmation-dialog")
    .classList.remove("confirmation-dialog-active");
  closeModal();
}

function init() {
  removeRows();
  refreshTable();
}

init();

// ============ EVENTOS ============
document.getElementById("table-body").addEventListener("click", (e) => {
  [action, id] = e.target.id.split("-");

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
    debugger;
    document
      .getElementById("confirmation-dialog")
      .classList.add("confirmation-dialog-active");

    document
      .getElementById("btn-refuse-confirmation-dialog")
      .addEventListener("click", () => {
        document
          .getElementById("confirmation-dialog")
          .classList.remove("confirmation-dialog-active");
      });
  }
});

document.getElementById("btn-create").addEventListener("click", () => {
  document.getElementById("btn-save-modal").addEventListener("click", () => {
    createItem();
  });
});

document
  .getElementById("btn-confirm-confirmation-dialog")
  .addEventListener("click", () => {
    deleteItem(id);
  });
