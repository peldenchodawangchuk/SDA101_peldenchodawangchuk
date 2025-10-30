const title = document.getElementById("main-title");
const paragraphs = document.getElementsByClassName("content");
const container = document.getElementById("container");

console.log(container.parentElement);      // parent of container
console.log(container.children);           // all children
console.log(container.firstElementChild);  // first child element

title.textContent = "Welcome to the DOM Practice!";
paragraphs[0].style.color = "green";

document.getElementById("changeTextBtn").addEventListener("click", () => {
  title.textContent = "Text Changed via Button Click!";
});

document.getElementById("addElementBtn").addEventListener("click", () => {
  const newPara = document.createElement("p");
  newPara.textContent = "New paragraph added!";
  newPara.classList.add("highlight");
  container.appendChild(newPara);
});

document.getElementById("removeElementBtn").addEventListener("click", () => {
  const lastChild = container.lastElementChild;
  if (lastChild && lastChild.tagName === "P") {
    container.removeChild(lastChild);
  }
});
