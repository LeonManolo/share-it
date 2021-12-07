
let selectedButton ;

// Holt sich die Daten aus HTML Form
const getFormData = () => {
  const form = document.getElementById("form");
  const data = {
    title: form.elements["title"].value,
    description: form.elements["description"].value,
    owner: "Dein Vater",
    maxBorrowDuration: 10,
    
  };
  return data;
};

// Funktion wird aufgrufen anstatt dem standard von einer HTML Form
async function submitForm() {
  event.preventDefault();

  const item = getFormData();

  // Konfigurationen für die request
  let config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  };

  // Url an die die anfrage gemacht wird
  let url = "http://localhost:8080/items";
  if (typeof selectedButton !== "undefined") {
    url += `/${selectedButton}`
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

async function showItems(){
  newItem = document.getElementById('newItem');
  newItem.style.display = "none";

  showButton = document.getElementById('showForm');
  showButton.style.display = "block"

  items = document.getElementById('itemsSection');
  items.style.display = "block";
}

async function cancelSubmit(){
  event.preventDefault();
  showItems();
}

/**
 * 
 */
async function showForm(){
  newItem = document.getElementById('newItem');
  newItem.style.display = "block";

  showButton = document.getElementById('showForm');
  showButton.style.display = "none"

  items = document.getElementById('itemsSection');
  items.style.display = "none";

}
//Funktion zum bearbeiten eines Artikels
async function editItem(id){
  console.log("Edit, hier muss noch was gemacht werden"+ id);
  selectedButton = id;
  showForm();
}
// Funktion zum Loeschen eines Artikels
async function deleteItem(id){
  console.log("Delete, hier muss noch was gemacht werden"+ id);
  const config = {method: "DELETE"};
  let response = await fetch(`http://localhost:8080/items/${id}`, config);

}

//Funktion zum Laden der vom User reingestellten Items
async function loadItems() {

  // Konfigurationen für die request
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Url an die die anfrage gemacht wird
  const url = "http://localhost:8080/items";

  // Request an den Server für die Registrierung
  let response;
  try {
    response = await fetch("http://localhost:8080/itemsLend");
    const items = await response.json();
    console.log(items);

    const section = document.getElementById("itemsSection");
    items.forEach(element => {
      Object.entries(element).forEach(([key, value]) => {
        console.log(`${key} ${value}`);
      });
      var div = document.createElement('div');
      var img = document.createElement('img');
      img.src = `${element.imageUrl}`;
      img.alt = "OOps";
      div.appendChild(img);

      var h2 = document.createElement('h2');
      var h2Text = document.createTextNode(`${element.title}`)
      h2.appendChild(h2Text);
      div.appendChild(h2);

      var description = document.createElement('p');
      var descriptionText = document.createTextNode(`${element.description}`);
      description.appendChild(descriptionText);
      div.appendChild(description)

      var editButton = document.createElement('button')
      editButton.innerHTML = "Bearbeiten";
      editButton.onclick = function(){editItem(element.id)};
      div.appendChild(editButton);

      var deleteButton = document.createElement('button')
      deleteButton.innerHTML = "Loeschen";
      deleteButton.onclick = function(){deleteItem(element.id)};
      div.appendChild(deleteButton);

      section.appendChild(div);
    });

  } catch (e) {
    console.log(`Netzwerk Fehler ${e}`);
  }
}
loadItems();




