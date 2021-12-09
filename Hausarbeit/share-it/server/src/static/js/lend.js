let selectedButton;

// Funktion wird aufgerufen anstatt dem Standard von einer HTML Form
async function submitForm() {
  event.preventDefault();

  const form = document.getElementById("form");
  let item = new FormData(form);
  item.append("owner", "Platzhalter");
  item.append("maxBorrowDuration", 10);

  // Konfigurationen für die request
  let config = {
    method: "POST",
    body: item,
  };

  // Url an die die Anfrage gemacht wird
  let url = "http://localhost:8080/items";
  if (typeof selectedButton !== "undefined") {
    url += `/${selectedButton}`;
    config.method = "PUT";
  }
  // Request an den Server für die Registrierung
  let response;
  try {
    response = await fetch(url, config);
  } catch (e) {
    console.log(`Netzwerk Fehler ${e}`);
  }
  showItems();
}
/**
 * Entfernt Items, fetched diese neu und versteckt das Formular
 */
async function showItems() {
  newItem = document.getElementById("newItem");
  newItem.style.display = "none";

  showButton = document.getElementById("showFormButton");
  showButton.style.display = "block";

  items = document.getElementById("itemsSection");
  while (items.firstChild) {
    items.removeChild(items.lastChild);
  }
  items.style.display = "block";
  await loadItems();
}
/**
 * Abbrechen des Formulars und erneutes Anzeigen der Items
 */
async function cancelSubmit() {
  event.preventDefault();
  await showItems();
}

/**
 * Zeigt das Formular und versteckt die Items
 */
async function showForm() {
  newItem = document.getElementById("newItem");
  newItem.style.display = "block";

  showButton = document.getElementById("showFormButton");
  showButton.style.display = "none";

  items = document.getElementById("itemsSection");
  items.style.display = "none";
}

/**
 * Funktion zum Bearbeiten eines Artikels
 * @param {number} id 
 */
async function editItem(id) {
  selectedButton = id;
  showForm();
}

/**
 * Funktion zum Löschen eines Artikels
 * @param {number} id 
 */
async function deleteItem(id) {
  const config = { method: "DELETE" };
  let response = await fetch(`http://localhost:8080/items/${id}`, config);
  showItems();
}

/**
 * Funktion zum Laden der vom User erstellten Items
 */
async function loadItems() {
  // Konfigurationen für die request
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Url an die die Anfrage gemacht wird
  const url = "http://localhost:8080/items";

  // Fetchen der Artikel und Erstellen der HTML-Elemente
  let response;
  try {
    response = await fetch("http://localhost:8080/itemsLend");
    const items = await response.json();
    console.log(items);

    const section = document.getElementById("itemsSection");
    items.forEach(element => {
        buildItemTile(element);
    });
  } catch (e) {
    console.log(`Netzwerk Fehler ${e}`);
  }
}
/**
 * Erstellen der HTML-Elemente für einen Artikel
 * @param {*} element 
 */
function buildItemTile(element) {
  const section = document.getElementById("itemsSection");

  var div = document.createElement("div");
  div.className = "itemTile"
  var img = document.createElement("img");
  img.className = "itemImg"
  img.src = `${element.imageUrl}`;
  img.alt = "OOps";
  div.appendChild(img);

  var h2 = document.createElement("h2");
  h2.className = "itemH2"
  var h2Text = document.createTextNode(`${element.title}`);
  h2.appendChild(h2Text);
  div.appendChild(h2);

  var description = document.createElement("p");
  description.className = "itemDescription"
  var descriptionText = document.createTextNode(`${element.description}`);
  description.appendChild(descriptionText);
  div.appendChild(description);

  var editButton = document.createElement("button");
  editButton.className = "itemButton"
  editButton.innerHTML = "Bearbeiten";
  editButton.onclick = function () {
    editItem(element.id);
  };
  div.appendChild(editButton);

  var deleteButton = document.createElement('button');
  deleteButton.className ="itemButton"
  deleteButton.innerHTML = "Löschen";
  deleteButton.onclick = function(){deleteItem(element.id)};
  div.appendChild(deleteButton);

  var tag = document.createElement('hr');
  div.appendChild(tag);
  section.appendChild(div);
}
//Laden der Items wenn die Seite geladen wird
loadItems();
