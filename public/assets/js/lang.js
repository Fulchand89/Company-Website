// /assets/js/lang.js
const LANG_KEY = "selectedLang";
let translations = {};
let currentLang = localStorage.getItem(LANG_KEY) || "en";

async function fetchTranslations(lang) {
  try {
    const res = await fetch(`/assets/languages/${lang}.json`, {cache: "no-store"});
    if (!res.ok) throw new Error("Language file not found");
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch translations:", err);
    return {};
  }
}

function applyToElement(el, value) {
  if (!value) return;
  const tag = el.tagName.toLowerCase();
  if (tag === "input" || tag === "textarea") {
    el.placeholder = value;
  } else if (el.hasAttribute("data-html") && el.getAttribute("data-html") === "true") {
    el.innerHTML = value;
  } else {
    el.textContent = value;
  }
}

// main loader
async function loadLanguage(lang) {
  // avoid redundant loads
  if (lang === currentLang && Object.keys(translations).length) return;

  translations = await fetchTranslations(lang);
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);

  // update document attributes
  const isArabic = lang === "ar";
  document.documentElement.lang = lang;
  document.documentElement.dir = isArabic ? "rtl" : "ltr";
  document.body.classList.toggle("lang-ar", isArabic);
  document.body.classList.toggle("lang-en", !isArabic);

  // translate every element with data-translate
  document.querySelectorAll("[data-translate]").forEach(el => {
    const key = el.getAttribute("data-translate");
    const text = translations[key] ?? null;
    applyToElement(el, text);
  });

  // title tag (if using data-translate on title element)
  const titleEl = document.querySelector("title[data-translate]");
  if (titleEl) {
    const k = titleEl.getAttribute("data-translate");
    const t = translations[k] ?? null;
    if (t) document.title = t;
  }

  // update dropdown button text / flag if you have them
  const dropdownBtn = document.querySelector(".dropdown-toggle");
  if (dropdownBtn) dropdownBtn.textContent = lang.toUpperCase();

  const flagImg = document.querySelector(".d-flex.align-items-center img");
  if (flagImg && translations.flag) {
    flagImg.src = translations.flag;
    flagImg.alt = lang.toUpperCase();
  }

  // flip absolute positioned icons (simple heuristic)
  document.querySelectorAll(".position-absolute").forEach(icon => {
    if (icon.classList.contains("toggle-password")) {
      if (isArabic) {
        icon.classList.remove("end-0","pe-3"); icon.classList.add("start-0","ps-3");
      } else {
        icon.classList.remove("start-0","ps-3"); icon.classList.add("end-0","pe-3");
      }
    } else {
      // for other icons swap start/end classes if needed
      if (isArabic) {
        if (icon.classList.contains("start-0")) { icon.classList.remove("start-0","ps-3"); icon.classList.add("end-0","pe-3"); }
      } else {
        if (icon.classList.contains("end-0")) { icon.classList.remove("end-0","pe-3"); icon.classList.add("start-0","ps-3"); }
      }
    }
  });
}

// helper to get translated string in JS for dynamic content
function t(key) {
  return translations[key] ?? key;
}

/* Init on page load */
document.addEventListener("DOMContentLoaded", () => {
  // apply saved lang (or default)
  loadLanguage(currentLang);

  // wire dropdown items (works across pages)
  document.querySelectorAll(".dropdown-item").forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const lang = item.getAttribute("data-lang") || item.textContent.trim().toLowerCase();
      if (!lang) return;
      localStorage.setItem(LANG_KEY, lang);
      loadLanguage(lang);
    });
  });

  // optional: expose language switch buttons with data-switch-lang
  document.querySelectorAll("[data-switch-lang]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const lang = btn.getAttribute("data-switch-lang");
      if (!lang) return;
      localStorage.setItem(LANG_KEY, lang);
      loadLanguage(lang);
    });
  });
});
