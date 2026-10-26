# Contributing

欢迎用 issue 或 pull request 改进这张清单。规则保持短、可检查、用中文。

## What to contribute / 可以改什么

- 一条新的检查，或一条现有规则的更清楚说法。
- 一组能暴露规则歧义的虚构改写。
- 校验脚本对漏改的捕获。

## Rule changes / 改规则

1. 在 `checklist.json` 的 `rules` 里加入或修改规则。
2. 在 `CHECKLIST.md` 写成两行。第一行以 `- ` 开头，接着是 id 和 text。下一行缩进两格，以「检查：」开头，后接 check。
3. `id` 用 `section.slug`。只用小写字母、数字和连字符。
4. `kind` 为 `require` 的规则不要用「不要」开头。`kind` 为 `forbid` 的规则用「不要」开头。
5. 0.x 里已经发布的 id 不改名。不要把删掉的 id 分给新规则。
6. 只澄清措辞、不改变含义时，把 `version` 的修订号加一。
7. 删掉规则或改变规则含义时，把次版本加一，并把修订号归零。
8. `version` 同时写进 `checklist.json`、`README.md`、`CHECKLIST.md` 和 `skills/agent-handoff-ste/SKILL.md`。

骨架在 `README.md` 和 `CHECKLIST.md` 里各有一份。改一处就要改另一处。

## Writing / 怎么写一条规则

- 一行只写一个要求。用主动句。
- 使用 `CHECKLIST.md` 里「本清单的叫法」。不要为同一个概念再造一个词。
- `check` 写成作者或复核人能直接做的动作。
- 新规则若容易读错，就在 `examples/before-after.md` 里给一组改写。

## Examples / 例子

- 例子保持两组或三组。
- 每组有一行 `适用规则：`，里面的 id 必须已经存在。
- 反例可以违反规则。改写要满足它列出的 id。
- 用虚构的服务、命令和角色。不要写真实系统、账号或未公开的名字。

## Do not submit / 不要提交

- 不要粘贴 ASD-STE100 的原文、词典条目，或从该标准逐条翻译的文字。该标准由 STEMG 控制发行，官网是 <https://www.asd-ste100.org/>。
- 不要写密钥、内部系统名，或未公开的智能体名字。
- 不要声称本清单是官方改编，也不要声称使用它等于 STE 认证。

## Check / 提交前检查

```bash
node scripts/check-checklist.mjs
```

GitHub Actions 会运行同一条命令。

## License / 许可证

贡献以 MIT 授权。见 [LICENSE](LICENSE)。
