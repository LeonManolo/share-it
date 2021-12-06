
// Holt sich die Daten aus HTML Form
const getFormData = () => {
  const form = document.getElementById("form");
  const data = {
    title: form.elements["title"].value,
    description: form.elements["description"].value,
    owner: "Max Mustermann",
    maxBorrowDuration: 10,
    
  };
  return data;
};

// Funktion wird aufgrufen anstatt dem standard von einer HTML Form
async function submitForm() {
  event.preventDefault();

  const item = getFormData();

  // Konfigurationen für die request
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  };

  // Url an die die anfrage gemacht wird
  const url = "http://localhost:8080/items";

  // Request an den Server für die Registrierung
  let response;
  try {
    response = await fetch(url, config);
  } catch (e) {
    console.log(`Netzwerk Fehler ${e}`);
  }
}

