// Bearbeitet von Leon-Manolo Stiller und Max Ollech

/**
 * Hilfsfunktion um die Form daten einer Form zu bekommen
 * @returns
 */
const getFormData = () => {
  const form = document.getElementById("form");
  const data = {
    username: form.elements["username"].value,
    password: form.elements["password"].value,
  };
  return data;
};

/**
 * Funktion die beim submit der Form aufgerufen wird und eine
 * Post Request an den Register endpoint zum einloggen ein Nutzer macht
 */
async function submitForm() {
  event.preventDefault();

  const credentials = getFormData();
  console.log(credentials);

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  };

  const url = "http://localhost:8080/register";

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
    console.log("register failed");
  }
}

// Navigiert zur Ausleig Seite
async function navigateToDashboard() {
  window.location = "/borrow";
}
