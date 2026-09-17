const OLLAMA_API =
  import.meta.env.VITE_OLLAMA_API || "http://localhost:11434/api/generate";
const MODEL = import.meta.env.VITE_OLLAMA_MODEL || "qwen3:1.7b";

const SYSTEM_PROMPT = `Ты — МедИИ, медицинский помощник. Отвечай по-русски кратко, 60-90 слов.
Дай: 1) что сделать сейчас; 2) опасные симптомы и когда звонить 103 или 112; 3) два уточняющих вопроса.
Не ставь диагноз, не указывай дозировки, напомни, что ты ИИ, а не врач.
Не используй Markdown, звёздочки, решётки и подчёркивания.`;

export async function requestMedicalResponse(text, chatHistory, onChunk) {
  let prompt = `${SYSTEM_PROMPT}\n\nИстория диалога:\n`;
  chatHistory.slice(-4).forEach((message) => {
    prompt += `${message.role === "user" ? "Пользователь" : "Ассистент"}: ${message.content}\n`;
  });
  prompt += `\nПользователь: ${text}\n\nАссистент:`;

  const response = await fetch(OLLAMA_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      prompt,
      stream: true,
      think: false,
      keep_alive: "10m",
      options: {
        num_ctx: 2048,
        num_predict: 140,
        temperature: 0.2,
        top_p: 0.7,
        repeat_penalty: 1.05,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(
      `HTTP ${response.status}. Проверьте, что Ollama запущена: ollama run qwen3:1.7b`,
    );
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let result = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop();

    lines.forEach((line) => {
      if (!line.trim()) return;

      const data = JSON.parse(line);
      result += data.response || "";
      onChunk?.(result);
    });
  }

  if (buffer.trim()) {
    const data = JSON.parse(buffer);
    result += data.response || "";
    onChunk?.(result);
  }

  return result;
}
