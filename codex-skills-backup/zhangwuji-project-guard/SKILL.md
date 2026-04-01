---
name: zhangwuji-project-guard
description: Use when working on this user's ongoing personal PWA, HTML utilities, or small app projects and task continuity matters. Apply for iterative project work, partial fixes, release follow-ups, handoff preparation, or maintenance tasks where Codex should default to Chinese records, strict scope control, pre/post verification, automatic multi-agent decisions, and continuity updates in repo docs and change logs.
---

# Zhangwuji Project Guard

## Purpose

Keep this user's long-running project work consistent across sessions and devices. Use this skill to preserve Chinese records, strict scope control, verification discipline, and handoff continuity while coordinating with domain skills such as `pwa-utility-builder`.

## Start Each Task

- Read the current repo context before editing:
  - `docs/协作规则.md`
  - `docs/当前状态.md`
  - `docs/最新交接.md`
  - the latest relevant files in `change-logs/`
- If the task also matches a domain skill, use both. This skill governs collaboration and continuity; the domain skill governs implementation.
- If the user raised a question, challenge, correction, or explanation request, answer it directly first before using tools or making edits. Do not jump straight into execution.
- State a scope contract before edits:
  1. exact requested changes
  2. adjacent surfaces that stay untouched
  3. the smallest expected file set

## Language And Records

- Default to Chinese for:
  - change logs
  - handoff notes
  - release notes
  - verification summaries
  - project-status docs
- Keep code identifiers, paths, commands, API fields, and commit messages in the form that best matches the tool or repo.
- If an existing user-facing project record is in English and it is being touched, convert it to Chinese in the same pass.

## Scope Discipline

- Do not change unrequested behavior, copy, layout, assets, or data logic.
- Do not substitute a different asset or version when the user asked to restore the original.
- If an extra file or side effect becomes necessary, call it out before broadening the change when feasible; otherwise document it explicitly in the final report and change log.
- After editing, re-open the diff and remove incidental edits.
- When one reported issue is likely part of a same-class pattern, audit the whole class first and fix it in one bounded pass instead of waiting for repeated user reports.
- Do not claim the issue is fully fixed until same-class spillover has been checked on the directly related surfaces.

## Verification Discipline

- Verify the user's claimed issue before changing code when possible.
- After changes, verify the requested points first.
- Run a narrow spillover check only on shared components, styles, assets, or data paths.
- If verification fails, continue fixing before handoff.
- If any point remains unverified, say exactly what was not verified and why.

## Multi-Agent Decision Rule

- Default to one agent.
- Automatically use multiple agents when the request contains at least two independent workstreams that can proceed in parallel for a meaningful stretch.
- Typical triggers:
  - product or code change plus environment or setup repair
  - feature work plus docs, skill, or workflow maintenance
  - unrelated UI slices with disjoint files
  - implementation plus independent verification or asset preparation
- Do not split work that is mostly linear, tightly coupled, or blocked on one core decision.
- Usually use 2 agents. Use 3 only when there are 3 clearly separate ownership areas and the main thread still has meaningful coordination work.
- Give each agent a disjoint write scope or a clearly bounded read-only investigation task.
- After delegation, keep the main thread on critical-path work and avoid waiting unless blocked.

## Continuous Project Files

- Keep these repo files current:
  - `change-logs/`: one Chinese log per meaningful change
  - `docs/当前状态.md`: current snapshot
  - `docs/最新交接.md`: next-step handoff
- Update `docs/协作规则.md` when the user's standing preferences change.
- Update `docs/环境与发布.md` when local setup, branch strategy, publish flow, or SSH or Git transport changes.
- When the task changes release state, also sync version markers and release notes in the repo.

## Skill-Fit Feedback

- If a currently loaded skill is not useful for the task, or keeps going unused over time, report that explicitly instead of pretending it helped.
- If this skill becomes too broad, propose splitting stable rules into references or narrower skills.

## Handoff

- End with:
  - what changed
  - what was verified
  - what stayed untouched
  - any residual risk or pending follow-up
  - which continuity files were updated
