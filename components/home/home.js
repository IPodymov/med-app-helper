export function renderHome(onStart) {
  const home = document.createElement("section");
  home.className = "home-screen";
  home.innerHTML = `
    <div class="home-card">
      <div class="home-logo">🩺</div>
      <h1 class="home-title">МедИИ</h1>
      <h2 class="home-subtitle">Ваш помощник по травмам и заболеваниям</h2>
      <p class="home-description">Опишите, что произошло или что вас беспокоит.</p>
      <button class="home-start-button" type="button">Начать</button>
    </div>
  `;

  home.querySelector(".home-start-button").addEventListener("click", onStart);
  return home;
}
