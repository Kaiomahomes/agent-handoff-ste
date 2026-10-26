#!/usr/bin/env node
// Keep CHECKLIST.md, checklist.json, and the README skeleton in sync.

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (name) => readFileSync(join(root, name), "utf8");

const errors = [];
const fail = (message) => errors.push(message);

const json = JSON.parse(read("checklist.json"));
const readme = read("README.md");
const checklist = read("CHECKLIST.md");
const examples = read("examples/before-after.md");
const skill = read("skills/agent-handoff-ste/SKILL.md");
const lines = checklist.split("\n");

const disclaimer =
  "本清单受 ASD-STE100 的写作规则启发。它是独立文本。它不代表 STEMG，也不提供 STE 认证。";

if (json.name !== "agent-handoff-ste") fail("name must be agent-handoff-ste");
if (json.schemaVersion !== 1) fail("schemaVersion must be 1");
if (!/^\d+\.\d+\.\d+$/.test(json.version)) fail("version must be semver");
if (json.disclaimer !== disclaimer) fail("json disclaimer mismatch");
if (json.inspiredBy?.url !== "https://www.asd-ste100.org/") {
  fail("inspiredBy.url mismatch");
}
if (json.inspiredBy?.relation !== "inspired-by-writing-rule-intent") {
  fail("inspiredBy.relation mismatch");
}
if (!json.summary) fail("summary is empty");

for (const [name, text] of [
  ["README.md", readme],
  ["CHECKLIST.md", checklist],
  ["examples/before-after.md", examples],
  ["skills/agent-handoff-ste/SKILL.md", skill],
]) {
  if (!text.includes(disclaimer)) fail(`${name} is missing the disclaimer`);
  if (!text.includes("https://www.asd-ste100.org/")) {
    fail(`${name} is missing the ASD-STE100 link`);
  }
}

for (const name of ["README.md", "CHECKLIST.md", "skills/agent-handoff-ste/SKILL.md"]) {
  const text = read(name);
  if (!text.includes(json.version)) fail(`${name} is missing version ${json.version}`);
  if (!text.includes(json.summary)) fail(`${name} is missing the summary sentence`);
}

const banned = ["过目包", "密对标", "竖屏对标"];
for (const [name, text] of [
  ["README.md", readme],
  ["CHECKLIST.md", checklist],
  ["examples/before-after.md", examples],
  ["skills/agent-handoff-ste/SKILL.md", skill],
  ["CONTRIBUTING.md", read("CONTRIBUTING.md")],
  ["checklist.json", read("checklist.json")],
]) {
  for (const token of banned) {
    if (text.includes(token)) fail(`${name} contains private wording: ${token}`);
  }
  if (/\bkai\b/i.test(text)) fail(`${name} contains a private kai name`);
}

function sectionBody(markdown, title) {
  const heading = `## ${title}`;
  const start = markdown.indexOf(heading);
  if (start < 0) return null;
  const after = markdown.slice(start + heading.length);
  const next = after.search(/\n## /);
  return (next < 0 ? after : after.slice(0, next)).trim();
}

const skeletonReadme = sectionBody(readme, "Skeleton / 骨架");
const skeletonChecklist = sectionBody(checklist, "Skeleton / 骨架");
if (skeletonReadme == null || skeletonChecklist == null) {
  fail("missing Skeleton / 骨架 section");
} else if (skeletonReadme !== skeletonChecklist) {
  fail("Skeleton / 骨架 differs between README.md and CHECKLIST.md");
}

const shortReview = sectionBody(checklist, "Short review / 短复核");
if (shortReview == null) fail("missing Short review section");

const ids = json.rules.map((rule) => rule.id);
const idSet = new Set(ids);
if (idSet.size !== ids.length) fail("duplicate rule id");

const sectionOrder = json.sections.map((section) => section.id);
let lastSection = 0;
for (const section of json.sections) {
  if (!checklist.includes(`## ${section.title}`)) {
    fail(`CHECKLIST.md is missing heading ${section.title}`);
  }
}

let lastLine = -1;
for (const rule of json.rules) {
  if (!/^[a-z]+\.[a-z0-9-]+$/.test(rule.id)) fail(`bad id ${rule.id}`);
  if (!sectionOrder.includes(rule.section)) fail(`unknown section ${rule.id}`);
  const sectionIndex = sectionOrder.indexOf(rule.section);
  if (sectionIndex < lastSection) fail(`section out of order at ${rule.id}`);
  lastSection = sectionIndex;

  if (rule.kind !== "require" && rule.kind !== "forbid") {
    fail(`bad kind ${rule.id}`);
  }
  if (rule.kind === "forbid" && !rule.text.startsWith("不要")) {
    fail(`${rule.id} is forbid but does not start with 不要`);
  }
  if (rule.kind === "require" && rule.text.startsWith("不要")) {
    fail(`${rule.id} is require but starts with 不要`);
  }
  if (!rule.text || rule.text.includes("\n")) fail(`bad text ${rule.id}`);
  if (!rule.check || rule.check.includes("\n")) fail(`bad check ${rule.id}`);

  const ruleLine = `- \`${rule.id}\` ${rule.text}`;
  const at = lines.indexOf(ruleLine);
  if (at < 0) fail(`missing rule line ${rule.id}`);
  else if (lines[at + 1] !== `  检查：${rule.check}`) {
    fail(`check line mismatch for ${rule.id}`);
  } else if (at <= lastLine) {
    fail(`rule order mismatch at ${rule.id}`);
  } else {
    lastLine = at;
  }
}

for (const term of json.terms) {
  const line = `- ${term.term}：${term.meaning}`;
  if (!checklist.includes(line)) fail(`missing term ${term.term}`);
}

for (const value of Object.values(json.labels)) {
  if (!checklist.includes(value)) fail(`CHECKLIST.md is missing label ${value}`);
  if (!readme.includes(value)) fail(`README.md is missing label ${value}`);
}

for (const step of json.procedure) {
  if (!checklist.includes(step)) fail(`CHECKLIST.md is missing procedure step: ${step}`);
}

if (!Array.isArray(json.shortReview) || json.shortReview.length < 4) {
  fail("shortReview is too short");
}
for (const id of json.shortReview) {
  if (!idSet.has(id)) fail(`shortReview id missing from rules: ${id}`);
  if (shortReview && !shortReview.includes(`\`${id}\``)) {
    fail(`short review section is missing ${id}`);
  }
  const rule = json.rules.find((item) => item.id === id);
  if (!readme.includes(`- \`${id}\` ${rule.text}`)) {
    fail(`README.md is missing short-review line for ${id}`);
  }
  if (!skill.includes(id)) fail(`skill is missing short-review id ${id}`);
}

let exampleCount = 0;
for (const line of examples.split("\n")) {
  if (!line.startsWith("适用规则：")) continue;
  exampleCount += 1;
  const found = [...line.matchAll(/`([^`]+)`/g)].map((match) => match[1]);
  if (found.length < 2) fail(`example rule line needs at least two ids: ${line}`);
  for (const id of found) {
    if (!idSet.has(id)) fail(`example cites unknown id ${id}`);
  }
}
if (exampleCount < 2 || exampleCount > 3) {
  fail(`expected 2 or 3 examples, found ${exampleCount}`);
}
const beforeCount = examples.split("### Before / 反例").length - 1;
const afterCount = examples.split("### After / 改写").length - 1;
if (beforeCount !== exampleCount || afterCount !== exampleCount) {
  fail("each example needs one Before and one After heading");
}

if (errors.length > 0) {
  for (const error of errors) console.error(`error: ${error}`);
  process.exit(1);
}

console.log(
  `ok: ${json.rules.length} rules, ${exampleCount} examples, version ${json.version}`,
);
