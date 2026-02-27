const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");

function setStatus(message, type = "info") {
  if (!statusEl) return;

  statusEl.textContent = message;

  // Uses your CSS variables when available
  if (type === "error") statusEl.style.color = "var(--danger)";
  else if (type === "success") statusEl.style.color = "var(--brand)";
  else statusEl.style.color = "var(--muted)";
}

function isValidEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

if (form) {
  form.addEventListener("submit", async (e) => {
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

    if (!isValidEmail(email)) {
      setStatus("Please enter a valid email address.", "error");
      return;
    }

    const action = form.getAttribute("action");
    if (!action) {
      setStatus("Form action URL is missing. Please add the Formspree link.", "error");
      return;
    }

    try {
      setStatus("Sending…", "info");

      const response = await fetch(action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        form.reset();
        setStatus("Message sent successfully. We’ll reply to your email soon.", "success");
      } else {
        setStatus("Failed to send. Please try again or contact us by email.", "error");
      }
    } catch (err) {
      setStatus("Network error. Please check your internet and try again.", "error");
    }
  });
}
