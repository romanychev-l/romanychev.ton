import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const markdownContent = `# romanychev (@daily_scrum)

Личный блог о технологиях, AI, блокчейне, приватности и разработке.

## Навигация

- [Обо мне](/about.md)
- [Все записи](/posts.md)
- [RSS](/rss.xml)

## Ссылки

- Telegram: [@daily_scrum](https://t.me/daily_scrum)
- GitHub: [@romanychev-l](https://github.com/romanychev-l)
- VK: [romanychev](https://vk.com/romanychev)`;

  return new Response(markdownContent, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
