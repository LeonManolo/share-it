buildFriendRequestSection();

async function buildFriendRequestSection() {
  const friendRequestSection = document.getElementById("friend-requests");
  const h2 = document.createElement("h2");
  h2.textContent = "Freundschaftsanfragen";

  // Url an die die anfrage gemacht wird
  const url = "http://localhost:8080/open-friend-requests";

  // Request an den Server für die Registrierung
  let response;
  try {
    response = await fetch(url);
    const friendRequests = await response.json();
    if (response.ok) {
      friendRequests.forEach((friend) => {
        friendRequestSection.appendChild(buildFriendTile(friend));
      });
    } else {
      console.log("Could not fetch open friend requests!");
    }
  } catch (e) {
    console.log(`Netzwerk Fehler ${e}`);
  }
}

function buildFriendTile(friend) {
  console.log(friend);
  const div = document.createElement("div");
  //TODO: img src setzen und hinzufügen
  const img = document.createElement("img");
  div.textContent = friend.username;
  return div;
}
