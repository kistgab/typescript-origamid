const myAnchor = document.getElementById("origamid");

if (myAnchor instanceof HTMLAnchorElement) {
  myAnchor.href = myAnchor.href.replace("http", "https");
}
