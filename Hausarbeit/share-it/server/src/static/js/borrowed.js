
/**
 * Funktion zum zurueckgeben eines Items
 * @param {*} id 
 */
async function returnItem(id){
    console.log(id);
    const url = `http://localhost:8080/return/${id}`;
    const config = {method: "POST"};
  let response = await fetch(url, config);
}


/**
 * Funktion zum Laden der ausgeliehenen Items des Nutzers
 */
async function loadItems(){

    // Url an die die Anfrage gemacht wird
    const url = "http://localhost:8080/borrowed";
  
    // Request an den Server für die Registrierung
    let response;
    try {
      response = await fetch(url);
      const items = await response.json();
      console.log(items);
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
function buildItemTile(element){
    const section = document.getElementById("itemsSection");
    var div = document.createElement('div');
    div.onclick = function(){showDetail(element)};
    
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

    var button = document.createElement('button');
    button.onclick = function(){returnItem(element.id)};
    section.appendChild(div);
}
  
loadItems();
  