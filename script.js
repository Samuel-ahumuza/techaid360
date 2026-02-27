// script.js
const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");

function setStatus(message, type = "info") {
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.style.color =
    type === "error" ? "var(--danger)" : "rgba(234, 240, 255, 0.75)";
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const topic = String(formData.get("topic") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !topic || !message) {
      setStatus("Please fill in all fields before sending.", "error");
      return;
    }

    // Demo-only behavior (no backend):
    form.reset();
    setStatus("Thanks! Your message has been prepared. We’ll reply to your email soon.");
  });
}