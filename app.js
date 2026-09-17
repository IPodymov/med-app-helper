import { renderChat } from "./components/chat/chat.js";
import { renderHome } from "./components/home/home.js";

const app = document.querySelector("#app");

function showChat() {
  app.replaceChildren(renderChat());
}

app.appendChild(renderHome(showChat));
