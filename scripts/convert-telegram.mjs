import fs from "fs";
import path from "path";

const CHANNEL = "daily_scrum";
const MIN_LENGTH = 100;
const BLOG_DIR = path.resolve("src/content/blog");

// Tag detection rules
const TAG_RULES = [
  { pattern: /\b(AI|ИИ|LLM|нейросет|нейронк|GPT|Claude|Gemini|модел[ьи]|Cursor|OpenAI|Anthropic|DeepSeek|Qwen|Kimi|агент)/i, tag: "AI" },
  { pattern: /\b(GrapheneOS|безопасност|приватност|конфиденциальност|анонимност|шифрован|VPN|прокси|proxy)/i, tag: "безопасность" },
  { pattern: /\b(блокчейн|крипт|TON|Bitcoin|Ethereum|токен|DeFi|Web3|NFT|криптовалют)/i, tag: "блокчейн" },
  { pattern: /\b(Habitry|привычк|марафон|habitry)/i, tag: "Habitry" },
  { pattern: /\b(книг[уаие]|прочитал|прочёл|читаю книгу|System Design)/i, tag: "книги" },
  { pattern: /\b(Telegram|телеграм|мессенджер|прокси|Max\b)/i, tag: "Telegram" },
  { pattern: /\b(разработк|код[аие]|программир|open.?source|GitHub|фреймворк|npm|React|Astro)/i, tag: "разработка" },
  { pattern: /\b(сознани[ея]|философ|квалиа|Фейнман|мышлени)/i, tag: "философия" },
  { pattern: /\b(государств|закон|блокировк|регуляц|запрет|цензур)/i, tag: "политика" },
  { pattern: /\b(Pixel|Android|iOS|телефон|смартфон|iPhone)/i, tag: "устройства" },
];

function extractTitle(text) {
  // Try to extract bold title from beginning: **Title**
  const boldMatch = text.match(/^\*\*(.+?)\*\*/);
  if (boldMatch) {
    let title = boldMatch[1].replace(/\n/g, " ").trim();
    // Remove trailing whitespace and newlines
    title = title.replace(/\s+/g, " ");
    if (title.length > 80) title = title.slice(0, 77) + "...";
    return title;
  }

  // Try first line if it looks like a title (short, no links)
  const firstLine = text.split("\n")[0].replace(/\*\*/g, "").replace(/[#_~`]/g, "").trim();
  if (firstLine.length > 5 && firstLine.length < 100 && !firstLine.startsWith("http")) {
    return firstLine;
  }

  // Fallback: first 60 characters
  const clean = text.replace(/\*\*/g, "").replace(/[#_~`]/g, "").replace(/\n/g, " ").trim();
  if (clean.length > 60) return clean.slice(0, 57) + "...";
  return clean;
}

function extractDescription(text) {
  const clean = text
    .replace(/\*\*/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // [text](url) -> text
    .replace(/[#_~`]/g, "")
    .replace(/\n/g, " ")
    .trim();
  if (clean.length > 150) return clean.slice(0, 147) + "...";
  return clean;
}

function detectTags(text) {
  const tags = [];
  for (const rule of TAG_RULES) {
    if (rule.pattern.test(text)) {
      tags.push(rule.tag);
    }
  }
  return [...new Set(tags)];
}

function isLinkOnly(text) {
  const clean = text.trim();
  // Message is just a URL or URL with very short text
  const lines = clean.split("\n").filter(l => l.trim());
  if (lines.length <= 2) {
    const urlPattern = /^https?:\/\/\S+$/;
    const nonUrlLines = lines.filter(l => !urlPattern.test(l.trim()));
    if (nonUrlLines.length === 0) return true;
    // Very short text + URL
    const totalNonUrlText = nonUrlLines.join(" ").length;
    if (totalNonUrlText < 30) return true;
  }
  return false;
}

function escapeYaml(str) {
  // Escape quotes and ensure valid YAML string
  return str.replace(/"/g, '\\"');
}

function processMessages() {
  const raw = fs.readFileSync("channel_messages.json", "utf-8");
  const messages = JSON.parse(raw);

  let created = 0;
  let skipped = 0;

  for (const msg of messages) {
    const text = msg.text || "";

    // Filter: too short
    if (text.length < MIN_LENGTH) {
      skipped++;
      continue;
    }

    // Filter: link-only messages
    if (isLinkOnly(text)) {
      skipped++;
      continue;
    }

    const date = msg.date;
    const year = date.slice(0, 4);
    const messageId = msg.message_id;
    const title = extractTitle(text);
    const description = extractDescription(text);
    const tags = detectTags(text);

    const tagsYaml = tags.length > 0
      ? `[${tags.map(t => `"${escapeYaml(t)}"`).join(", ")}]`
      : "[]";

    const frontmatter = `---
title: "${escapeYaml(title)}"
pubDatetime: ${date}
description: "${escapeYaml(description)}"
tags: ${tagsYaml}
---`;

    const content = `${frontmatter}\n\n${text}\n`;

    // Create year directory
    const yearDir = path.join(BLOG_DIR, year);
    fs.mkdirSync(yearDir, { recursive: true });

    // Write file
    const filePath = path.join(yearDir, `tg-${messageId}.md`);
    fs.writeFileSync(filePath, content, "utf-8");
    created++;
  }

  console.log(`Done! Created ${created} posts, skipped ${skipped} messages.`);
  console.log(`Posts are in ${BLOG_DIR}`);
}

processMessages();
