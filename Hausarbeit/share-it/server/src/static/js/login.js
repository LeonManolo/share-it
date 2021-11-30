console.log("login.js");

const getFormData = () => {
  const form = document.getElementById("form");
  const data = {
    username: form.elements["username"].value,
    password: form.elements["password"].value,
  };
  return data;
};

async function submitForm() {
  event.preventDefault();

  const credentials = getFormData();

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  };

  const url = "http://localhost:8080/login";

  // Request an den Server für die Registrierung
  fetch(url, config)
    .then((response) => response.json())
    .catch((e) => {
      console.log("Network Error");
      console.log(e);
    })
    .then((json) => {
      console.log(json);
      console.log("logged in");
      navigateToDashboard();
    })
    .catch((e) => {
      console.log("Error while parsing json");
      console.log(e);
    });
}

/**
 * Navigiert zu einer neuen Seite
 */
async function navigateToDashboard(){
  window.location = "/borrow";        
}
