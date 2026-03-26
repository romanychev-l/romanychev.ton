// Language toggle - runs immediately in <head> to prevent flash
(function () {
  const translations = {
    ru: {
      "nav.posts": "Записи",
      "nav.about": "Обо мне",
      "nav.search": "Поиск",
      "nav.archives": "Архив",
      "ui.featured": "Избранное",
      "ui.recentPosts": "Последние записи",
      "ui.allPosts": "Все записи",
      "ui.backToTop": "Наверх",
      "ui.previousPost": "Предыдущая запись",
      "ui.nextPost": "Следующая запись",
      "ui.tags": "Теги",
      "ui.searchPlaceholder": "Поиск записей...",
      "ui.noPostsFound": "Записи не найдены",
      "ui.skipToContent": "Перейти к содержимому",
      "ui.viewOnTelegram": "Читать в Telegram",
      "ui.sharePost": "Поделиться:",
      "ui.prev": "Назад",
      "ui.next": "Вперёд",
      "hero.greeting": "Привет, я @romanychev.",
      "hero.description":
        "Пишу о технологиях, AI, блокчейне, приватности и разработке.",
    },
    en: {
      "nav.posts": "Posts",
      "nav.about": "About",
      "nav.search": "Search",
      "nav.archives": "Archives",
      "ui.featured": "Featured",
      "ui.recentPosts": "Recent Posts",
      "ui.allPosts": "All Posts",
      "ui.backToTop": "Back to Top",
      "ui.previousPost": "Previous Post",
      "ui.nextPost": "Next Post",
      "ui.tags": "Tags",
      "ui.searchPlaceholder": "Search posts...",
      "ui.noPostsFound": "No posts found",
      "ui.skipToContent": "Skip to content",
      "ui.viewOnTelegram": "View on Telegram",
      "ui.sharePost": "Share:",
      "ui.prev": "Prev",
      "ui.next": "Next",
      "hero.greeting": "Hi, I'm @romanychev.",
      "hero.description":
        "Writing about tech, AI, blockchain, privacy and development.",
    },
  };

  function getLang() {
    try {
      return localStorage.getItem("lang") || "ru";
    } catch {
      return "ru";
    }
  }

  function setLang(lang) {
    try {
      localStorage.setItem("lang", lang);
    } catch {}
  }

  function applyLang(lang) {
    const dict = translations[lang];
    if (!dict) return;

    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n-key]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-key");
      if (dict[key]) {
        // For elements with child HTML (like links), only set text of first text node
        if (el.childElementCount === 0) {
          el.textContent = dict[key];
        } else {
          // Find first text node and update it
          for (var i = 0; i < el.childNodes.length; i++) {
            if (el.childNodes[i].nodeType === 3 && el.childNodes[i].textContent.trim()) {
              el.childNodes[i].textContent = dict[key];
              break;
            }
          }
        }
      }
    });

    // Update lang toggle button text
    var toggleBtn = document.getElementById("lang-toggle");
    if (toggleBtn) {
      toggleBtn.textContent = lang === "ru" ? "EN" : "RU";
    }
  }

  // Apply on initial load
  var currentLang = getLang();

  // Set html lang immediately (before DOM ready)
  document.documentElement.lang = currentLang;

  // Apply translations after DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      applyLang(currentLang);
    });
  } else {
    applyLang(currentLang);
  }

  // Also apply after Astro view transitions
  document.addEventListener("astro:page-load", function () {
    applyLang(getLang());
  });

  // Expose globally for toggle button
  window.__toggleLang = function () {
    var lang = getLang() === "ru" ? "en" : "ru";
    setLang(lang);
    applyLang(lang);
  };

  window.__getLang = getLang;
  window.__setLang = setLang;
})();
