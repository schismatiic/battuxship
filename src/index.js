import "./styles.css";
const content = document.getElementById("content");
const template__button = document.createElement("button");
template__button.className = "template__button";
template__button.textContent = "Button";
template__button.addEventListener("click", () => {
  alert("Hello World!");
});
content.appendChild(template__button);
