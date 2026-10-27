import { renderBlog } from "./components/blog/blog.js";
import { renderChat } from "./components/chat/chat.js";
import { renderHome } from "./components/home/home.js";
import { renderNav, setActiveNav } from "./components/nav/nav.js";

const app = document.querySelector("#app");
const nav = renderNav();
const page = document.createElement("div");
page.className = "page";
app.append(nav, page);

// Чат создаётся один раз, чтобы история не терялась при переходе в блог.
const chat = renderChat();

function route() {
  const [section, slug] = location.hash.replace(/^#\/?/, "").split("/");

  if (section === "blog") {
    setActiveNav(nav, "blog");
    page.replaceChildren(renderBlog(slug));
    window.scrollTo(0, 0);
    return;
  }

  if (section === "chat") {
    setActiveNav(nav, "chat");
    page.replaceChildren(chat);
    return;
  }

  setActiveNav(nav, "home");
  page.replaceChildren(renderHome());
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", route);
route();
