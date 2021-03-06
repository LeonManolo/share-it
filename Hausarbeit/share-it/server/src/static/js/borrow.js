// Bearbeitet von Niklas Hargarter
/**
 * Detailbereich eines Artikels öffenen, wo dieses ausgeliehen werden kann.
 * @param {*} element
 */
function openDetail(element) {
  hideItems();
  fillDetail(element);
  showDetail();
}
// ausfuellen der Inhalte der detailSection mit den Informationen des angeklickten Artikels
function fillDetail(element) {
  var img = document.getElementById("detailIMG");
  img.src = `${element.imageUrl}`;

  var h2 = document.getElementById("detailH2");
  h2.removeChild(h2.firstChild);
  var h2Text = document.createTextNode(`${element.title}`);
  h2.appendChild(h2Text);

  var lender = document.getElementById("detailLender");
  lender.removeChild(lender.firstChild);
  var lenderText = document.createTextNode(`Verleiher: ${element.owner}`);
  lender.appendChild(lenderText);

  var description = document.getElementById("detailDescription");
  description.removeChild(description.firstChild);
  var descriptionText = document.createTextNode(`${element.description}`);
  description.appendChild(descriptionText);

  var borrowButton = document.getElementById("detailButtonAusleihen");
  borrowButton.onclick = function () {
    borrowItem(element.id);
  };
  var cancelButton = document.getElementById("detailButtonCancel");
  cancelButton.onclick = function () {
    cancelFunc();
  };
}
/**
 * Funktion zum Ausleihen eines Artikels
 * @param {*} id
 */
async function borrowItem(id) {
  const url = `http://localhost:8080/borrow/${id}`;
  const config = { method: "POST" };
  let response = await fetch(url, config);
  clearItems();
  loadItems();
  cancelFunc();
}
/**
 * clearen der itemSection
 */
async function clearItems() {
  var items = document.getElementById("itemsSection");
  while (items.firstChild) {
    items.removeChild(items.lastChild);
  }
}
/**
 * Um aus der Detailansicht wieder zu der Artikelübersicht zurückzukehren.
 */
function cancelFunc() {
  hideDetail();
  showItems();
}

function hideItems() {
  const section = document.getElementById("itemsSection");
  section.style.display = "none";
}

function showItems() {
  const section = document.getElementById("itemsSection");
  section.style.display = "flex";
}
function hideDetail() {
  const section = document.getElementById("detailSection");
  section.style.display = "none";
}

function showDetail() {
  const section = document.getElementById("detailSection");
  section.style.display = "grid";
}

/**
 * Funktion zum Laden der Artikel die der Nutzer ausleihen kann
 */
async function loadItems() {
  // Url an die die Anfrage gemacht wird
  const url = "http://localhost:8080/items";

  // Request an den Server für die Registrierung
  let response;
  try {
    response = await fetch(url);
    const items = await response.json();
    items.forEach((element) => {
      buildItemTile(element);
    });
  } catch (e) {
    console.log(`Netzwerk Fehler ${e}`);
  }
}

/**
 * Erstellen der Tile für einen Artikel
 * @param {*} element
 */
function buildItemTile(element) {
  const section = document.getElementById("itemsSection");
  var div = document.createElement("div");
  div.className = "itemTile";
  div.onclick = function () {
    openDetail(element);
  };

  var img = document.createElement("img");
  img.className = "itemIMG";
  img.src = `${element.imageUrl}`;
  img.alt = "OOps";
  div.appendChild(img);

  var h2 = document.createElement("h2");
  h2.className = "itemH2";
  var h2Text = document.createTextNode(`${element.title}`);
  h2.appendChild(h2Text);
  div.appendChild(h2);

  var owner = document.createElement("p");
  owner.className = "itemDescription";
  var ownerText = document.createTextNode(`Verleiher: ${element.owner}`);
  owner.appendChild(ownerText);
  div.appendChild(owner);

  section.appendChild(div);
}

hideDetail();
loadItems();
