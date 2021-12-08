buildFriendRequestSection();

async function buildFriendRequestSection() {
  const friendRequestSection = document.getElementById("friend-requests");
  const h2 = document.createElement("h2");
  h2.textContent = "Freundschaftsanfragen";

  // Url an die die anfrage gemacht wird
  const url = "http://localhost:8080/open-friend-requests";

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
  div.className = "friendTile"
  //TODO: img src setzen und hinzufügen
  const img = document.createElement("img");
  img.src = `${element.imageUrl}`;
  img.alt = "Falsche URL";
  div.textContent = friend.username;
  return div;
}

function buildFriendRequestTile(user){
  const div = document.createElement("div");
  div.className = "friendRequest"
  //TODO: img src setzen und hinzufügen
  const img = document.createElement("img");
}
