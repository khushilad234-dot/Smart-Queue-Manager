// ===== GLOBALS =====
let bellSound;
const AVG_TIME_PER_TOKEN = 2; // minutes

// ===== INIT SOUND =====
function initSound() {
  bellSound = new Audio("bell.mp3");
}

// ===== GET TOKEN (USER) =====
function getToken() {
  let lastToken = parseInt(localStorage.getItem("lastToken") || "0");
  lastToken++;

  localStorage.setItem("lastToken", lastToken);

  document.getElementById("myToken").innerText =
    "🎟️ Your Token Number: " + lastToken;

  localStorage.setItem("myToken", lastToken);

  updateUserView();
}

// ===== ADMIN NEXT TOKEN =====
function nextToken() {
  let current = parseInt(localStorage.getItem("currentToken") || "0");
  current++;

  localStorage.setItem("currentToken", current);

  document.getElementById("currentToken").innerText = current;

  if (bellSound) bellSound.play();
}

// ===== USER LIVE UPDATE =====
function updateUserView() {
  const myToken = localStorage.getItem("myToken");
  const current = parseInt(localStorage.getItem("currentToken") || "0");

  if (!myToken) return;

  if (current >= myToken) {
    document.getElementById("status").innerText =
      "🔔 It's your turn!";
    if (bellSound) bellSound.play();
    document.getElementById("eta").innerText = "";
  } else {
    const waiting = myToken - current;
    document.getElementById("status").innerText =
      "⏳ Currently serving token: " + current;

    document.getElementById("eta").innerText =
      "⏱️ Estimated wait: " + (waiting * AVG_TIME_PER_TOKEN) + " minutes";
  }
}

// ===== ADMIN LOAD =====
if (document.getElementById("currentToken")) {
  document.getElementById("currentToken").innerText =
    localStorage.getItem("currentToken") || 0;
}

// ===== AUTO REFRESH EVERY 2 SEC =====
setInterval(updateUserView, 2000);