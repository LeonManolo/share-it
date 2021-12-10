

async function submitForm() {
    event.preventDefault();
    console.log("submitForm")
    const form = document.getElementById("form");
    let item = new FormData(form);

    // Konfigurationen für die request
    let config = {
      method: "POST",
      body: item,
    };
  
    // Url an die die Anfrage gemacht wird
    let url = "http://localhost:8080/profile-edit";
    // Request an den Server für die Registrierung
    let response;
    try {
      response = await fetch(url, config);
    } catch (e) {
      console.log(`Netzwerk Fehler ${e}`);
    }
    clearProfile();
    loadProfile();
}

async function loadProfile() {

  const url = "http://localhost:8080/my-profile";

  let response;
  try {
    response = await fetch(url);
    const myProfile = await response.json();
    console.log(myProfile);
    console.log(myProfile.username)
    buildProfile(myProfile);
    
  } catch (e) {
    console.log(`Netzwerk Fehler ${e}`);
  }
}

async function buildProfile(profile){
  const section = document.getElementById("profileSection");

  var div = document.createElement("div");
  div.className = "profileTile"

  var img = document.createElement("img");
  img.className = "profileImg"
  img.src = `${profile.profileImageUrl}`;
  img.alt = "Kein Bild gefunden";
  div.appendChild(img);

  var h2 = document.createElement("h2");
  h2.className = "profileH2"
  var h2Text = document.createTextNode(`Nutzername: ${profile.username}`);
  h2.appendChild(h2Text);
  div.appendChild(h2);

  section.appendChild(div);
}
async function clearProfile(){
  const section = document.getElementById("profileSection");
  while (section.firstChild) {
    section.removeChild(section.lastChild);
  }
}
loadProfile();