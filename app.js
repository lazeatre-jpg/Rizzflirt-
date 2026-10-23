
const messageEl = document.querySelector("#message");
const toneEl = document.querySelector("#tone");
const goalEl = document.querySelector("#goal");
const results = document.querySelector("#results");
const replyList = document.querySelector("#reply-list");
const toast = document.querySelector("#toast");
const generateBtn = document.querySelector("#generate");

// Your Cloudflare Worker chat endpoint.
// The /chat path matches the earlier Worker response.
const AI_URL = "https://rizzflirt-ai.lazeatre.workers.dev/chat";

document.querySelector("#year").textContent =
  new Date().getFullYear();

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 3000);
}

function extractReplies(data) {
  // Supports common Worker JSON response formats.
  if (Array.isArray(data.replies)) {
    return data.replies.filter(
      item => typeof item === "string" && item.trim()
    );
  }

  if (typeof data.reply === "string" && data.reply.trim()) {
    return [data.reply.trim()];
  }

  if (typeof data.text === "string" && data.text.trim()) {
    return [data.text.trim()];
  }

  // Supports Google's Gemini response format too.
  const parts = data.candidates?.[0]?.content?.parts;
  if (Array.isArray(parts)) {
    const text = parts
      .map(part => part.text || "")
      .join("\n")
      .trim();

    if (text) {
      return text
        .split(/\n+/)
        .map(line => line.replace(/^\s*(?:[-*]|\d+[.)])\s*/, "").trim())
        .filter(Boolean);
    }
  }

  return [];
}

function addReplyCard(reply) {
  const card = document.createElement("article");
  card.className = "reply";

  const text = document.createElement("p");
  text.textContent = reply;

  const button = document.createElement("button");
  button.className = "copy-btn";
  button.textContent = "Copy reply";

  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(reply);
    } catch {
      const area = document.createElement("textarea");
      area.value = reply;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }

    button.textContent = "Copied ✓";
  });

  card.append(text, button);
  replyList.appendChild(card);
}

generateBtn.addEventListener("click", async () => {
  const message = messageEl.value.trim();
  const tone = toneEl.value;
  const goal = goalEl.value;

  if (!message && goal === "reply") {
    messageEl.focus();
    showToast("Paste a message first, or choose another goal.");
    return;
  }

  generateBtn.disabled = true;
  generateBtn.textContent = "Generating...";
  replyList.replaceChildren();
  results.hidden = true;

  try {
    const response = await fetch(AI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message, tone, goal })
    });

    const raw = await response.text();

    // Detect the HTML response from the earlier test.
    if (raw.trimStart().startsWith("<")) {
      throw new Error(
        "The Worker returned HTML, not AI JSON. We need to fix the Worker."
      );
    }

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      throw new Error("The Worker returned invalid JSON.");
    }

    if (!response.ok) {
      throw new Error(
        data.error || `Worker error: HTTP ${response.status}`
      );
    }

    if (data.error) {
      throw new Error(data.error);
    }

    const replies = extractReplies(data);

    if (!replies.length) {
      throw new Error(
        "No replies found in the Worker response. Its JSON format needs checking."
      );
    }

    replies.forEach(addReplyCard);
    results.hidden = false;
    results.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
    showToast("AI replies generated!");
  } catch (error) {
    console.error("RizzFlirt AI error:", error);
    showToast(error.message || "Could not reach the AI. Try again.");
  } finally {
    generateBtn.disabled = false;
    generateBtn.textContent = "Generate replies";
  }
});

document.querySelector("#premium-btn").addEventListener("click", () => {
  const note = document.querySelector("#waitlist-message");
  note.hidden = false;
  showToast("Premium is planned, but payments are not active yet.");
});

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
    }
const 
