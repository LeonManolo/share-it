
/**
 * Funktion zum zurueckgeben eines Items
 * @param {*} id 
 */
async function returnItem(id) {
  const url = `http://localhost:8080/return/${id}`;
  const config = { method: "POST" };
  let response = await fetch(url, config);
  await clearItems();
  await loadItems();
}
/**
 * loeschen der Elemente der ItemSection
 */
async function clearItems() {
  items = document.getElementById("itemsSection")
  while (items.firstChild) {
    items.removeChild(items.lastChild);
  }
}
/**
 * Maxborrowduration berechnungshelfer
 * @param {number} days 
 * @returns {Date}
 */
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

/**
 * Funktion zum Laden der ausgeliehenen Items des Nutzers
 */
async function loadItems() {

  // Url an die die Anfrage gemacht wird
  const url = "http://localhost:8080/borrowed-items";

  // Request an den Server für die Registrierung
  let response;
  try {
    response = await fetch(url);
    const items = await response.json();
    items.forEach(element => {
      buildItemTile(element);
    });

  } catch (e) {
    console.log(`Netzwerk Fehler ${e}`);
  }
}

/**
 * Funktion zum erstellen der HTML-Elemente eines Items
 * @param {*} element 
 */
function buildItemTile(element) {
  var today = new Date();
  var dateBorrowed = new Date(element.borrowedAt)
  var difference = Math.abs(today - dateBorrowed);
  var returnBy = dateBorrowed.addDays(element.maxBorrowDuration);
  var remainingDays = element.maxBorrowDuration - (difference / (1000 * 3600 * 24));

  const section = document.getElementById("itemsSection");
  var div = document.createElement('div');
  div.className = "itemTile"
  if (today > returnBy) {
    div.style.backgroundColor = "red";
  }
  //erstellen des img-tags
  var img = document.createElement('img');
  img.className = "itemIMG"
  img.src = `${element.imageUrl}`;
  img.alt = "OOps";
  div.appendChild(img);

  //erstellen des h2-tags
  var h2 = document.createElement('h2');
  h2.className = "itemH2"
  var h2Text = document.createTextNode(`${element.title}`)
  h2.appendChild(h2Text);
  div.appendChild(h2);

  //erstellen des p-tags
  var owner = document.createElement('p');
  owner.className = "itemOwner"
  var ownerText = document.createTextNode(`ausgeliehen von: ${element.owner}`);
  owner.appendChild(ownerText);
  div.appendChild(owner)

  var rentalTime = document.createElement('p');
  rentalTime.className = "time"
  var rentaltimeText = document.createTextNode(`ausgeliehen am: ${element.borrowedAt}`)
  rentalTime.appendChild(rentaltimeText);
  div.appendChild(rentalTime);

  var remainingTime = document.createElement('p');
  remainingTime.className = "time";
  var remainingTimeText = document.createTextNode(`Uebrige Tage: ${remainingDays}`)
  remainingTime.appendChild(remainingTimeText);
  div.appendChild(remainingTime);

  var button = document.createElement('button');
  button.className = "itemButton"
  button.onclick = function () { returnItem(element.id) };
  button.innerHTML = "Artikel zurueckgeben"
  div.appendChild(button);

  section.appendChild(div);
}

loadItems();
