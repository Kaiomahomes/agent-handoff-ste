# Before / After

三组例子都是虚构的。它们用来对照本清单。它们不表示 ASD-STE100 合规。

本清单受 ASD-STE100 的写作规则启发。它是独立文本。它不代表 STEMG，也不提供 STE 认证。

标准文本见 [ASD-STE100](https://www.asd-ste100.org/)。规则正文见 [CHECKLIST.md](../CHECKLIST.md)。

## 1. Delivery note / 交付说明

适用规则：`handoff.outcome` `handoff.next` `handoff.split-status` `handoff.where` `sentence.one-idea` `sentence.name-actor` `sentence.active` `sentence.use-verb` `warning.consequence`

### Before / 反例

> 本服务在完成配置注入与上下文编排之后，将被用于驱动下游网关的鉴权观测路径，从而实现端到端交付闭环。相关同学请关注后续。

### After / 改写

> 本次交出：网关鉴权。
>
> 网关用配置中心的规则决定通过或拒绝。
>
> 接手人的下一件事：修改观测面板的指标。
>
> 已完成：
>
> - 网关从配置中心读取鉴权规则。
> - 网关把鉴权结果写入缓存。
> - 缓存保留该结果 5 分钟。
> - 鉴权失败时，网关返回 401。
>
> 未完成：
>
> - 观测面板仍显示旧指标。
>
> 步骤：
>
> 1. 修改观测面板的指标。
> 2. 运行 `release gateway --env staging`。
>
> 警告：不要在修改指标之前运行该命令。旧指标会让接手人误判这次发布。

改写写出了交出的东西。改写把下一件事收成一个动作。改写分开了已完成和未完成。改写留下了可复制的命令。

## 2. Procedure / 操作步骤

适用规则：`handoff.next` `sentence.condition-first` `sentence.active` `sentence.use-verb` `step.imperative` `structure.list` `structure.list-lead` `warning.consequence`

### Before / 反例

> 在确认预发环境变量已被同步且证书轮换没有被阻塞的前提下，可以尝试对发布单执行推进操作以便完成灰度。

### After / 改写

> 接手人的下一件事：确认发布条件。
>
> 先确认下面两项：
>
> - 预发环境变量已同步。
> - 证书轮换没有阻塞。
>
> 若两项都成立，则把发布单推进到灰度。
>
> 警告：在两项成立之前推进发布单，会把灰度打到尚未同步的配置上。

改写把条件放到了动作前面。改写用祈使句写出了接手人要做的事。改写给警告补上了后果。

## 3. Failure handoff / 失败交接

适用规则：`term.one-name` `term.no-swap` `term.no-slang` `term.glossary` `term.glossary-row` `sentence.noun-stack` `sentence.use-verb` `note.not-step` `warning.consequence` `handoff.outcome` `handoff.next` `handoff.split-status` `handoff.blocker`

### Before / 反例

> 启动核对后请发起重试，必要时开启补偿。任务执行单元会对账务流水核对作业批次进行失败重试策略配置处理。注：记得先停写入口，否则可能有问题。模块、组件和单元说的是同一个 worker。

### After / 改写

> 用语表：
>
> - 模块、组件和单元所指的进程 → worker
> - 账务流水上的那次核对 → 核对批次
> - 失败之后的补救动作 → 补偿
> - 被称作停写入口的开关 → 写入入口
>
> 本次交出：核对批次失败后的步骤。
>
> 接手人的下一件事：停止写入入口。
>
> 已完成：
>
> - worker 已启动核对批次。
>
> 未完成：
>
> - worker 还没有为失败的核对批次启动重试。
>
> 阻塞：写入入口仍开着。
>
> 能解除的人：接手人。
>
> 解除前不要做：启动重试。
>
> 步骤：
>
> 1. 停止写入入口。
> 2. 若核对批次失败，则启动该批次的重试。
> 3. 若重试仍失败，则启动补偿。
>
> 警告：在停止写入入口之前启动重试，会把新的流水算进旧的核对批次。

改写把多个名称收成了用语表。改写只用「启动」表示这一类动作。改写把备注里的动作改成了步骤，并写明了阻塞和后果。
