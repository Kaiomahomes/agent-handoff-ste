---
name: agent-handoff-ste
description: "Rewrite Chinese handoffs, delivery notes, and procedures into one-term, one-idea, active sentences. Inspired by ASD-STE100 writing rules. Does not certify STE compliance. 用于交接、交付说明和操作步骤。"
---

# 交接写作清单

版本 0.1.0。

给交接、交付说明和操作步骤用的中文写作清单。

本清单受 ASD-STE100 的写作规则启发。它是独立文本。它不代表 STEMG，也不提供 STE 认证。

标准文本见 [ASD-STE100](https://www.asd-ste100.org/)。

## Load the rules / 读哪份文件

规范正文是 `CHECKLIST.md`。机器可读副本是 `checklist.json`。两份冲突时，以 `CHECKLIST.md` 为准，并先修正 `checklist.json`。

本仓库内，这两个文件在技能文件的上两级目录。把技能拷走时，把这两个文件放到 `SKILL.md` 的同一目录，再开始改写。文件不在上下文里时，先读取，再落笔。

## When to use / 何时用

- 给人看的交接。
- 交付说明。
- 操作步骤。
- 草稿里有同义换词、被动句，或读不出谁对什么做了什么。

## When to stop / 何时停

- 闲聊。
- 创意文案。
- 已经锁定口吻的产品文案。

## Steps / 步骤

1. 只使用 `checklist.json` 里 `terms` 的叫法。
2. 名称可能冲突时，先写用语表。每一行是「对象 → 唯一名称」。
3. 按 `procedure` 改写。
4. 按 `rules` 的顺序逐条检查。时间很少时，至少检查 `shortReview`：`handoff.outcome`、`handoff.next`、`handoff.split-status`、`term.one-name`、`sentence.name-actor`、`note.not-step`。
5. 不要声称文本符合 ASD-STE100，也不要声称已通过 STE 认证。

## Before you deliver / 交稿前

用一句话指出本次交出了什么。用一句话指出接手人的下一件事。读不出施事就继续改。
