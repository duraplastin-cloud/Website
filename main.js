(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Theme toggle (persisted)
  const themeKey = "duraplast-theme";
  const applyTheme = (theme) => {
    if (theme === "light") document.documentElement.setAttribute("data-theme", "light");
    else document.documentElement.removeAttribute("data-theme");
    const btn = $("#themeToggle");
    if (btn) btn.setAttribute("aria-label", theme === "light" ? "Switch to dark theme" : "Switch to light theme");
  };

  const storedTheme = (() => {
    try { return localStorage.getItem(themeKey); } catch { return null; }
  })();
  if (storedTheme) applyTheme(storedTheme);

  $("#themeToggle")?.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const next = isLight ? "dark" : "light";
    applyTheme(next === "light" ? "light" : "dark");
    try { localStorage.setItem(themeKey, next); } catch {}
  });

  // Mobile nav
  const mobileBtn = $("#mobileToggle");
  const mobilePanel = $("#mobilePanel");
  if (mobileBtn && mobilePanel) {
    const setOpen = (open) => {
      mobileBtn.setAttribute("aria-expanded", open ? "true" : "false");
      mobilePanel.toggleAttribute("hidden", !open);
    };
    setOpen(false);
    mobileBtn.addEventListener("click", () => setOpen(mobilePanel.hasAttribute("hidden")));
    $$("#mobilePanel a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  }

  // Smooth scroll for same-page anchors
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", href);
    });
  });

  // Contact / enquiry form -> mailto
  const form = $("#enquiryForm");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const required = ["name", "email", "category", "message"];
    const missing = required.filter((k) => !String(data[k] ?? "").trim());
    const status = $("#formStatus");

    if (missing.length) {
      if (status) {
        status.textContent = "Please fill the required fields: " + missing.join(", ");
        status.style.borderColor = "rgba(251,113,133,.45)";
        status.style.background = "rgba(251,113,133,.12)";
      }
      return;
    }

    const subject = `Duraplast enquiry — ${String(data.category).trim()}`;
    const lines = [
      "New enquiry received:",
      "",
      `Name: ${data.name ?? ""}`,
      `Company: ${data.company ?? ""}`,
      `Email: ${data.email ?? ""}`,
      `Phone: ${data.phone ?? ""}`,
      `Category: ${data.category ?? ""}`,
      `Quantity / Volume: ${data.quantity ?? ""}`,
      "",
      "Message:",
      String(data.message ?? "").trim(),
      "",
      "— sent from Duraplast website (local form)"
    ];

    const to = (form.dataset.to || "work@duraplast.co.in").trim();
    const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = mailto;

    if (status) {
      status.textContent = "Opening your email app… If it doesn’t open, please email us with the same details.";
      status.style.borderColor = "rgba(56,189,248,.35)";
      status.style.background = "rgba(56,189,248,.10)";
    }
  });
})();

