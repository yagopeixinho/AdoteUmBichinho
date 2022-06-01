function openModal() {
  document.getElementById("modal").classList.add("modal-active");
}

function closeModal() {
  document.getElementById("modal").classList.remove("modal-active");
}

function getLocalStorageItens() {
  return JSON.parse(localStorage.getItem("localStorageAnimalList")) ?? [];
}

function create() {
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
