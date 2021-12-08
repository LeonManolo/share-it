
buildFriendRequestSection();
buildFriendSection();
buildUserSection();

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
        friendRequestSection.appendChild(buildFriendRequestTile(friend));
      });
    } else {
      console.log("Could not fetch open friend requests!");
    }
  } catch (e) {
    console.log(`Netzwerk Fehler ${e}`);
  }
}

async function buildFriendSection(){
  const friendSection = document.getElementById("friends");
  const h2 = document.createElement("h2");
  h2.textContent = "Freunde";

  // Url an die die anfrage gemacht wird
  const url = "http://localhost:8080/get-friends";

  let response;
  try {
    response = await fetch(url);
    const friendRequests = await response.json();
    if (response.ok) {
      friendRequests.forEach((friend) => {
        friendSection.appendChild(buildFriendTile(friend));
      });
    } else {
      console.log("Could not fetch open friend requests!");
    }
  } catch (e) {
    console.log(`Netzwerk Fehler ${e}`);
  }
}

async function buildUserSection(){
  const UserSection = document.getElementById("addFriend");
  const h2 = document.createElement("h2");
  h2.textContent = "andere Nutzer";

  // Url an die die anfrage gemacht wird
  // Platzhalter url
  const url = "http://localhost:8080/usernames?phrase=e";

  let response;
  try {
    response = await fetch(url);
    const users = await response.json();
    if (response.ok) {
      users.forEach((user) => {
        UserSection.appendChild(buildUserTile(user));
      });
    } else {
      console.log("Could not fetch open friend requests!");
    }
  } catch (e) {
    console.log(`Netzwerk Fehler ${e}`);
  }
}
function buildUserTile(user){
  const div = document.createElement("div");
  div.className = "userTile"

  var name = document.createElement('p');
  var nameText = document.createTextNode(`${user.username}`);
  name.appendChild(nameText);
  div.appendChild(name);

  var requestButton = document.createElement('button');
  requestButton.innerHtml = "Akzeptieren";
  requestButton.onclick = function(){sendFriendRequest(user.username)};
  div.appendChild(requestButton);

  return div;
}
function buildFriendTile(friend) {
  console.log(friend);
  const div = document.createElement("div");
  div.className = "friendTile"

  const img = document.createElement("img");
  img.src = `${friend.imageUrl}`;
  img.alt = "Image Error";
  div.appendChild(img)

  var name = document.createElement('p');
  var nameText = document.createTextNode(`${friend.username}`);
  name.appendChild(nameText);
  div.appendChild(name);

  return div;
}

function buildFriendRequestTile(user){
  console.log(user);
  const div = document.createElement("div");
  div.className = "friendRequest"

  const img = document.createElement("img");
  img.src = `${user.imageUrl}`;
  img.alt = "Image Error";
  div.appendChild(img)

  var name = document.createElement('p');
  var nameText = document.createTextNode(`${user.username}`);
  name.appendChild(nameText);
  div.appendChild(name);

  var acceptButton = document.createElement('button');
  acceptButton.innerHtml = "Akzeptieren";
  acceptButton.onclick = function(){acceptFriendRequest(user.friendshipId)};
  div.appendChild(acceptButton);

  var declineButton = document.createElement('button');
  declineButton.innerHtml = "Ablehnen";
  declineButton.onclick = function(){declineFriendRequest(user.friendshipId)};
  div.appendChild(declineButton);

  return div;
}
async function sendFriendRequest(username){
  console.log(username);
  const url = `http://localhost:8080/add-friend?toUser=${username}`;
  const config = {method: "POST"};
  let response = await fetch(url,config);
}

async function acceptFriendRequest(id){
  console.log(id);
  const url = `http://localhost:8080/accept-friend/${id}`;
  const config = {method: "POST"};
  let response = await fetch(url,config);
  console.log(response.status);
}

async function declineFriendRequest(id){
  console.log(id);
  const url = `http://localhost:8080/decline-friend/${id}`;
  const config = {method: "POST"};
  let response = await fetch(url,config);
  console.log(response.status);
}


