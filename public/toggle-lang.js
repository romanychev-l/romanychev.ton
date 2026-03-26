// Language toggle - runs immediately in <head> to prevent flash
(function () {
  var translations = {
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
      "ui.tagsDesc": "Все теги, используемые в записях.",
      "ui.searchPlaceholder": "Поиск записей...",
      "ui.searchTitle": "Поиск",
      "ui.searchDesc": "Поиск по записям...",
      "ui.noPostsFound": "Записи не найдены",
      "ui.skipToContent": "Перейти к содержимому",
      "ui.viewOnTelegram": "Читать в Telegram",
      "ui.sharePost": "Поделиться:",
      "ui.prev": "Назад",
      "ui.next": "Вперёд",
      "ui.pageNotFound": "Страница не найдена",
      "ui.goHome": "На главную",
      "ui.browseByYear": "Записи по годам и месяцам",
      "ui.aboutTitle": "Обо мне",
      "ui.copyright": "\u00a9 " + new Date().getFullYear() + " Leonid Romanychev",
      "hero.greeting": "Привет, я @romanychev.",
      "hero.description": "Пишу о технологиях, AI, блокчейне, приватности и разработке.",
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
      "ui.tagsDesc": "All tags used in posts.",
      "ui.searchPlaceholder": "Search posts...",
      "ui.searchTitle": "Search",
      "ui.searchDesc": "Search any article...",
      "ui.noPostsFound": "No posts found",
      "ui.skipToContent": "Skip to content",
      "ui.viewOnTelegram": "View on Telegram",
      "ui.sharePost": "Share:",
      "ui.prev": "Prev",
      "ui.next": "Next",
      "ui.pageNotFound": "Page Not Found",
      "ui.goHome": "Go back home",
      "ui.browseByYear": "Browse all posts by year and month",
      "ui.aboutTitle": "About",
      "ui.copyright": "\u00a9 " + new Date().getFullYear() + " Leonid Romanychev",
      "hero.greeting": "Hi, I'm @romanychev.",
      "hero.description": "Writing about tech, AI, blockchain, privacy and development.",
    },
  };

  function getLang() {
    try {
      return localStorage.getItem("lang") || "ru";
    } catch (e) {
      return "ru";
    }
  }

  function setLang(lang) {
    try {
      localStorage.setItem("lang", lang);
    } catch (e) {}
  }

  function applyLang(lang) {
    var dict = translations[lang];
    if (!dict) return;

    document.documentElement.lang = lang;

    // Translate data-i18n-key elements
    document.querySelectorAll("[data-i18n-key]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-key");
      if (dict[key]) {
        if (el.childElementCount === 0) {
          el.textContent = dict[key];
        } else {
          for (var i = 0; i < el.childNodes.length; i++) {
            if (
              el.childNodes[i].nodeType === 3 &&
              el.childNodes[i].textContent.trim()
            ) {
              el.childNodes[i].textContent = dict[key];
              break;
            }
          }
        }
      }
    });

    // Toggle data-i18n-block visibility (for About page etc.)
    document.querySelectorAll("[data-i18n-block]").forEach(function (el) {
      var blockLang = el.getAttribute("data-i18n-block");
      el.style.display = blockLang === lang ? "" : "none";
    });

    // Update lang toggle button
    var toggleBtn = document.getElementById("lang-toggle");
    if (toggleBtn) {
      toggleBtn.textContent = lang === "ru" ? "EN" : "RU";
    }
  }

  // Apply on initial load
  var currentLang = getLang();
  document.documentElement.lang = currentLang;

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
