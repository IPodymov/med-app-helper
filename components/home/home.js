import { posts } from "../../data/posts.js";

const benefits = [
  [
    "⏱️",
    "Ответ за секунды",
    "Не нужно искать по форумам и сравнивать противоречивые статьи. Опишите симптомы своими словами и получите понятный ответ.",
  ],
  [
    "🚨",
    "Когда пора к врачу",
    "Помощник подскажет тревожные признаки, при которых нельзя ждать и нужно звонить 103 или 112.",
  ],
  [
    "🔒",
    "Данные остаются у вас",
    "Модель работает локально на вашем компьютере. Описание самочувствия никуда не отправляется и не хранится на чужих серверах.",
  ],
  [
    "📚",
    "Полезные статьи",
    "В блоге собраны понятные материалы о распространённых заболеваниях, профилактике и первой помощи.",
  ],
];

const steps = [
  ["Опишите самочувствие", "Что болит, какие симптомы и как давно. Можно выбрать готовый пример."],
  ["Получите рекомендации", "Что можно сделать сейчас и какие признаки должны насторожить."],
  ["Ответьте на вопросы", "Помощник задаст уточняющие вопросы, чтобы лучше понять ситуацию."],
];

export function renderHome() {
  const home = document.createElement("section");
  home.className = "home";
  home.innerHTML = `
    <div class="home-hero">
      <div class="home-hero-text">
        <span class="home-badge">🩺 Медицинский ИИ-помощник</span>
        <h1 class="home-title">Разберитесь в своём самочувствии до визита к врачу</h1>
        <p class="home-lead">
          МедИИ отвечает на вопросы о симптомах простым языком, подсказывает, что можно сделать
          прямо сейчас, и предупреждает, когда нужна срочная медицинская помощь.
        </p>
        <div class="home-actions">
          <a class="home-button" href="#/chat">Задать вопрос</a>
          <a class="home-button home-button-secondary" href="#/blog">Читать блог</a>
        </div>
      </div>
      <div class="home-preview" aria-hidden="true">
        <div class="home-preview-user">Температура 38.5 и кашель второй день</div>
        <div class="home-preview-ai">
          Пейте больше тёплой жидкости и отдыхайте. Срочно звоните 103, если станет трудно
          дышать или появится боль в груди. Есть ли у вас насморк или ломота в теле?
        </div>
      </div>
    </div>

    <div class="home-section">
      <h2 class="home-section-title">Зачем нужен МедИИ</h2>
      <p class="home-section-lead">
        Когда что-то болит, хочется быстро понять, насколько это серьёзно. Поиск в интернете
        часто пугает или запутывает, а записаться к врачу получается не сразу. МедИИ помогает
        сориентироваться: спокойно, понятно и без лишней паники.
      </p>
      <div class="home-benefits"></div>
    </div>

    <div class="home-section">
      <h2 class="home-section-title">Как это работает</h2>
      <ol class="home-steps"></ol>
    </div>

    <div class="home-section">
      <div class="home-section-head">
        <h2 class="home-section-title">Свежее в блоге</h2>
        <a class="home-link" href="#/blog">Все статьи →</a>
      </div>
      <div class="home-posts"></div>
    </div>

    <div class="home-warning">
      <h2 class="home-warning-title">⚠️ Важно</h2>
      <p>
        МедИИ — справочный помощник, а не врач. Он не ставит диагноз, не назначает лечение
        и может ошибаться. При сильной боли, затруднённом дыхании, потере сознания, признаках
        инсульта или другой угрозе жизни сразу звоните <strong>103</strong> или <strong>112</strong>.
      </p>
    </div>

    <div class="home-cta">
      <h2 class="home-cta-title">Что-то беспокоит?</h2>
      <p class="home-cta-text">Опишите симптомы — помощник ответит за несколько секунд.</p>
      <a class="home-button home-button-light" href="#/chat">Открыть чат</a>
    </div>
  `;

  const benefitList = home.querySelector(".home-benefits");
  benefits.forEach(([icon, title, text]) => {
    const card = createElement("div", "home-card");
    card.append(
      createElement("div", "home-card-icon", icon),
      createElement("h3", "home-card-title", title),
      createElement("p", "home-card-text", text),
    );
    benefitList.appendChild(card);
  });

  const stepList = home.querySelector(".home-steps");
  steps.forEach(([title, text]) => {
    const step = createElement("li", "home-step");
    step.append(
      createElement("h3", "home-card-title", title),
      createElement("p", "home-card-text", text),
    );
    stepList.appendChild(step);
  });

  const postList = home.querySelector(".home-posts");
  [...posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3)
    .forEach((post) => {
      const card = createElement("a", "home-card home-post");
      card.href = `#/blog/${post.slug}`;
      card.append(
        createElement("span", "home-post-tag", post.tag),
        createElement("h3", "home-card-title", post.title),
        createElement("p", "home-card-text", post.summary),
      );
      postList.appendChild(card);
    });

  return home;
}

function createElement(tag, className, text = "") {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = text;
  return element;
}
