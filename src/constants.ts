import { SITE } from "./consts";

export const SOCIALS = [
  {
    name: "Github",
    href: "https://github.com/romanychev-l",
    linkTitle: ` ${SITE.title} on Github`,
    icon: "github",
    active: true,
  },
  {
    name: "Telegram",
    href: "https://t.me/daily_scrum",
    linkTitle: `${SITE.title} в Telegram`,
    icon: "telegram",
    active: true,
  },
  {
    name: "VK",
    href: "https://vk.com/romanychev",
    linkTitle: `${SITE.title} в VK`,
    icon: "vk",
    active: true,
  },
] as const;

export const SHARE_LINKS = [
  {
    name: "Telegram",
    href: "https://t.me/share/url?url=",
    linkTitle: `Поделиться в Telegram`,
    icon: "telegram",
  },
  {
    name: "VK",
    href: "https://vk.com/share.php?url=",
    linkTitle: `Поделиться в VK`,
    icon: "vk",
  },
  {
    name: "X",
    href: "https://x.com/intent/post?url=",
    linkTitle: `Share on X`,
    icon: "twitter",
  },
  {
    name: "Mail",
    href: "mailto:?subject=See%20this%20post&body=",
    linkTitle: `Поделиться по email`,
    icon: "mail",
  },
] as const;
