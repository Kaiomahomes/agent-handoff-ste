# agent-handoff-ste

Chinese writing checklist for AI agent handoffs and delivery notes. Version 0.1.0.

给交接、交付说明和操作步骤用的中文写作清单。起草的一方可以是智能体，也可以是人。

本清单受 ASD-STE100 的写作规则启发。它是独立文本。它不代表 STEMG，也不提供 STE 认证。

## What it is / 这是什么

`agent-handoff-ste` 把交接写成接手人能执行的中文。每条规则只有一个要求，并在 [`checklist.json`](checklist.json) 里有稳定 id。

它借用简化技术英语的写作意图：一个对象一个名称，一句话一个意思，先写条件再写动作，句子里能看见施事。正文是中文。它不附带英文受控词典。

标准文本见 [ASD-STE100](https://www.asd-ste100.org/)。本仓库不提供该标准，也不能当作认证依据。

## Why / 为什么需要

交接经常让接手人猜。同一个对象换了几个名称。条件藏在句尾。备注里藏着要做的事。开头没有写出交出了什么。

这张清单把这些猜测收成检查项。智能体按 id 改写。人按 id 复核。

STEMG 在[下载页](https://www.asd-ste100.org/STE_downloads.html)说明：人工智能可以协助技术作者，但不能代替专业判断和人工复核。本清单采取同一分工。交出之前，人要确认清晰和准确。

## Quick start / 先做这六项

完整规则在 [`CHECKLIST.md`](CHECKLIST.md)。时间很少时先检查这六条。

- `handoff.outcome` 交接和交付说明的开头写出本次交出了什么。
- `handoff.next` 开头写出接手人的下一件事。
- `handoff.split-status` 交接和交付说明分开列出已完成的事和未完成的事。
- `term.one-name` 同一对象全程只用一个名称。
- `sentence.name-actor` 骨架小标题和步骤以外的句子写出施事。
- `note.not-step` 备注只写信息。

第六条的检查动作是：把备注里要求人做的事移到步骤。

然后按这个顺序改：

1. 先写用语表，再改句子。
2. 按条件、动作、结果或限制的顺序重排步骤。
3. 对照 [`CHECKLIST.md`](CHECKLIST.md) 逐条检查。
4. 读一遍。仍读不出谁对什么做了什么，就补上施事并拆开该句。

## Skeleton / 骨架

交接和交付说明照这个顺序写。名称没有冲突时，省掉用语表。没有阻塞时，省掉最后三项。没有备注或警告时，省掉对应的行。单纯的操作步骤保留「接手人的下一件事」和「步骤」。

用语表：

- 对象 → 唯一名称

本次交出：……。

接手人的下一件事：……。

已完成：

- ……。

未完成：

- ……。

步骤：

1. ……。

备注：……。

警告：……。

阻塞：……。

能解除的人：……。

解除前不要做：……。

## Use it in an agent skill / 放进智能体技能

技能入口是 [`skills/agent-handoff-ste/SKILL.md`](skills/agent-handoff-ste/SKILL.md)。智能体改写前先读 [`CHECKLIST.md`](CHECKLIST.md)。

本仓库里，清单在技能文件的上两级目录。把技能拷到别处时，连同下面两个文件一起拷，并和 `SKILL.md` 放在同一目录：

- `CHECKLIST.md`
- `checklist.json`

智能体不要声称文本符合 ASD-STE100，也不要声称已通过 STE 认证。

## Use it in a human review / 人怎么复核

复核人按 id 记录结论，不把个人文风偏好算进去。

1. 打开 [`CHECKLIST.md`](CHECKLIST.md)。
2. 先复核上面六条。
3. 再按文件顺序看其余规则。违反时记下 id 和原句。
4. 结论写「清单上的项已满足」，或列出未满足的 id。
5. 这个结论只覆盖本清单。它不表示 ASD-STE100 合规。

## Machine-readable rules / 给工具读的规则

[`checklist.json`](checklist.json) 与 [`CHECKLIST.md`](CHECKLIST.md) 是同一套规则。

| 字段 | 含义 |
| --- | --- |
| `version` | 清单版本 |
| `terms` | 本清单自己的叫法 |
| `labels` | 骨架里的固定小标题 |
| `shortReview` | 时间很少时至少检查的 id |
| `procedure` | 改写顺序 |
| `rules[].id` | 稳定 id |
| `rules[].kind` | `require` 或 `forbid` |
| `rules[].text` | 规则正文 |
| `rules[].check` | 检查动作 |

工具按 `rules` 的数组顺序执行。`require` 表示交接要满足 `text`。`forbid` 表示交接要避免 `text`。

id 在 0.x 期间保持不变。不要把删掉的 id 分给新规则。

## Examples / 例子

[`examples/before-after.md`](examples/before-after.md) 有三组虚构交接。反例故意违反规则。改写用来对照它列出的 id。

## Files / 文件

| 文件 | 作用 |
| --- | --- |
| [`CHECKLIST.md`](CHECKLIST.md) | 给人读的规则 |
| [`checklist.json`](checklist.json) | 同一套规则，带 id |
| [`examples/before-after.md`](examples/before-after.md) | 三组改写 |
| [`skills/agent-handoff-ste/SKILL.md`](skills/agent-handoff-ste/SKILL.md) | 智能体技能入口 |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | 怎样加一条规则 |
| [`LICENSE`](LICENSE) | MIT |

## Contributing / 参与修改

改规则前先读 [`CONTRIBUTING.md`](CONTRIBUTING.md)。提交前运行：

```bash
node scripts/check-checklist.mjs
```

## License / 许可证

本仓库以 [MIT](LICENSE) 授权。Copyright (c) 2026 Kaiomahomes。
