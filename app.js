const messageEl = document.querySelector("#message");
const toneEl = document.querySelector("#tone");
const goalEl = document.querySelector("#goal");
const results = document.querySelector("#results");
const replyList = document.querySelector("#reply-list");
const toast = document.querySelector("#toast");

document.querySelector("#year").textContent = new Date().getFullYear();

function makeReplies(message, tone, goal) {
  const clean = message.trim();
  const openers = {
    smooth: [
      "Okay, now you've got my attention 😌",
      "I was hoping you'd say something. What happens next?",
      "You make it a little too easy to keep talking to you."
    ],
    funny: [
      "I had a whole reply ready… then you distracted me 😂",
      "On a scale of 1 to ‘reply immediately’, you know where this lands.",
      "Not me smiling at my phone like I planned this 😅"
    ],
    romantic: [
      "I like hearing from you more than I should admit 😊",
      "You have a way of making an ordinary moment feel special.",
      "Honestly, talking to you is becoming my favourite part of the day."
    ],
    bold: [
      "I like your energy. We should keep this conversation going.",
      "I'll be honest — I'd like to get to know you better.",
      "You seem interesting. Want to see where this conversation goes?"
    ],
    casual: [
      "Haha, fair enough 😄 what's been the highlight of your day?",
      "I hear you 😂 tell me more.",
      "Okay okay, I'm listening. What's the story?"
    ]
  };
  let list = [...openers[tone]];
  if (goal === "start") list = [
    "Quick question: what's something that can instantly make your day better?",
    "I need your opinion on something important… best comfort food?",
    "What's something you've been wanting to try lately?"
  ];
  if (goal === "flirt") list = [
    "I'm trying to play it cool, but you're making that difficult 😉",
    "You always this charming, or am I getting special treatment?",
    "Careful, keep talking like that and I'll start looking forward to your messages."
  ];
  if (goal === "date") list = [
    "I'm enjoying talking with you. Would you be up for getting coffee sometime?",
    "We should continue this conversation in person. Are you free this weekend?",
    "How about we pick a day, grab something nice, and get to know each other better?"
  ];
  if (/disappeared|where have you been|where did you go/i.test(clean)) {
    list = tone === "funny"
      ? ["I was on a top-secret mission. I can neither confirm nor deny 😂", "Had to give you time to miss me a little 😄", "Life caught me offline for a minute — I'm back now."]
      : ["I got caught up with a few things, but I'm glad we're talking now 😊", "A little busy lately, but I didn't forget about you.", "I've been around — how have you been doing?"];
  }
  return list;
}

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
}

document.querySelector("#generate").addEventListener("click", () => {
  const message = messageEl.value.trim();
  if (!message && goalEl.value === "reply") {
    messageEl.focus();
    showToast("Paste a message first, or choose another goal.");
    return;
  }
  const replies = makeReplies(message, toneEl.value, goalEl.value);
  replyList.replaceChildren();
  replies.forEach((reply, index) => {
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
        button.textContent = "Copied ✓";
      } catch {
        const area = document.createElement("textarea");
        area.value = reply;
        document.body.appendChild(area);
        area.select();
        document.execCommand("copy");
        area.remove();
        button.textContent = "Copied ✓";
      }
    });
    card.append(text, button);
    replyList.appendChild(card);
  });
  results.hidden = false;
  results.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelector("#premium-btn").addEventListener("click", () => {
  const note = document.querySelector("#waitlist-message");
  note.hidden = false;
  showToast("Premium is planned, but payments are not active yet.");
});

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}
