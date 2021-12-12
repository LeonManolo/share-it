// Bearbeitet von Leon-Manolo Stiller und Max Ollech

// Holt sich die Daten aus HTML Form
const getFormData = () => {
  const form = document.getElementById("form");
  const data = {
    username: form.elements["username"].value,
    password: form.elements["password"].value,
  };
  return data;
};

// Funktion wird aufgrufen anstatt dem Standard von einer HTML Form
async function submitForm() {
  event.preventDefault();

  const credentials = getFormData();

  // Konfigurationen für die request
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  };

  // Url an die die Anfrage gemacht wird
  const url = "http://localhost:8080/login";

  // Request an den Server für die Registrierung
  let response;
  try {
    response = await fetch(url, config);
  } catch (e) {
    console.log(`Netzwerk Fehler ${e}`);
  }
  const json = await response.json();
  if (response.ok) {
    navigateToDashboard();
  } else {
    // TODO: Fehler auf dem Screen ausgeben
    buildLoginNotSuccessfulMessage();
    console.log("User not found or password/username is wrong");
  }
}

/**
 * Navigiert zu einer neuen Seite
 */
async function navigateToDashboard() {
  window.location = "/borrow";
}

function buildLoginNotSuccessfulMessage() {
  const form = document.getElementById("form");
  //...
}
