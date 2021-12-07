let selectedItem;

function openDetail(element){
  console.log(item);
  selectedItem = element;
  hideItems();
  var img = document.getElementById('detailImg');
  img.src = `${element.imageUrl}`;

  var h2 = document.getElementById('detailH2');
  h2.removeChild(h2.firstChild);
  var h2Text = document.createTextNode(`${element.title}`);
  h2.appendChild(h2Text);

  var lender = document.getElementById('detailLender');
  lender.removeChild(lender.firstChild);
  var lenderText = document.createTextNode(`${element.owner}`);
  lender.appendChild(lenderText);

  var description = document.getElementById('detailLender');
  description.removeChild(Lender.firstChild);
  var descriptionText = document.createTextNode(`${element.owner}`);
  description.appendChild(LenderText);



}

function hideItems(){
  const section = document.getElementById("itemsSection");
  section.style.display = "none";
}

function showItems(){
  const section = document.getElementById('itemsSection');
  section.style.display = "block";
}
function hideDetail(){
  const section = document.getElementById("detailSection");
  section.style.display = "none";
}

function showDetail(){
  const section = document.getElementById("detailSection");
  section.style.display = "block";
}


async function loadItems(){

  // Url an die die anfrage gemacht wird
  const url = "http://localhost:8080/items";

  // Request an den Server für die Registrierung
  let response;
  try {
    response = await fetch(url);
    const items = await response.json();
    console.log(items);

    const section = document.getElementById("itemsSection");
    items.forEach(element => {
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

      section.appendChild(div);
    });

  } catch (e) {
    console.log(`Netzwerk Fehler ${e}`);
  }
}

loadItems();
