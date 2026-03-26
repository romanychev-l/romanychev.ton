// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

interface SocialLink {
  href: string;
  label: string;
}

interface Site {
  website: string;
  author: string;
  profile: string;
  desc: string;
  title: string;
  ogImage: string;
  lightAndDarkMode: boolean;
  postPerIndex: number;
  postPerPage: number;
  scheduledPostMargin: number;
  showArchives: boolean;
  showBackButton: boolean;
  editPost: {
    enabled: boolean;
    text: string;
    url: string;
  };
  dynamicOgImage: boolean;
  lang: string;
  timezone: string;
}

// Site configuration
export const SITE: Site = {
  website: "https://romanychev.ton/",
  author: "Леонид Романычев",
  profile: "https://romanychev.ton/about",
  desc: "Личный блог о технологиях, AI, блокчейне, приватности и разработке. Посты из Telegram-канала @daily_scrum.",
  title: "Leonid Romanychev",
  ogImage: "avatar.jpg",
  lightAndDarkMode: true,
  postPerIndex: 10,
  postPerPage: 10,
  scheduledPostMargin: 15 * 60 * 1000,
  showArchives: false,
  showBackButton: false,
  editPost: {
    enabled: false,
    text: "",
    url: "",
  },
  dynamicOgImage: true,
  lang: "en",
  timezone: "Europe/Moscow",
};

export const SITE_TITLE = SITE.title;
export const SITE_DESCRIPTION = SITE.desc;

// Navigation links
export const NAV_LINKS: SocialLink[] = [
  {
    href: "/",
    label: "Записи",
  },
  {
    href: "/about",
    label: "Обо мне",
  },
];

// Social media links
export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://github.com/romanychev-l",
    label: "GitHub",
  },
  {
    href: "https://t.me/daily_scrum",
    label: "Telegram",
  },
  {
    href: "https://vk.com/romanychev",
    label: "VK",
  },
  {
    href: "/rss.xml",
    label: "RSS",
  },
];

// Icon map for social media
export const ICON_MAP: Record<string, string> = {
  GitHub: "github",
  Telegram: "telegram",
  VK: "vk",
  RSS: "rss",
  Email: "mail",
};
