---
name: no-useeffect-react
description: Enforce an effect-last style for React 19+ codebases. Use when Codex needs to refactor or review components that reach for useEffect, useMemo, or useCallback for data fetching, derived state, prop-to-state syncing, timers, filtering, form resets, DOM tweaks, or other logic that should live in render, loaders/actions, event handlers, refs, CSS, or useSyncExternalStore instead. Allow effects only for true synchronization with external systems.
---

# No useEffect React

## Overview

Treat `useEffect` as an escape hatch, not a default tool. Prefer render-time derivation, React Router data APIs, event handlers, refs, CSS, and explicit external-store subscriptions.

Assume React Compiler can handle routine optimization work. Do not add `useMemo` or `useCallback` by default unless there is a measured reason or a library API requires stable identity.

## Core Rule

Do not write `useEffect` unless the component must synchronize with something outside React.

Valid external targets include:

- Browser APIs that require setup and teardown
- DOM subscriptions or imperative widgets
- Network activity that cannot move to a loader, action, or event
- External stores and push-based sources
- Timers that represent real process coordination, not derived UI state

Invalid reasons include:

- Fetching data after mount when route data can be loaded earlier
- Copying props into state
- Keeping one piece of state in sync with another
- Filtering, sorting, mapping, counting, or formatting data
- Responding to a click, submit, or modal open after the fact
- Resetting local state because some prop changed
- Writing "when X changes, set Y"

## Decision Tree

Before using `useEffect`, apply this order:

1. Ask whether the value can be derived during render.
2. Ask whether the work should happen in the event handler that caused it.
3. Ask whether the data belongs in a route `loader`, `action`, or `useFetcher`.
4. Ask whether the problem is an external subscription and should use `useSyncExternalStore`.
5. Ask whether the result is styling, animation, focus, or layout that CSS or declarative props can handle.
6. Ask whether a `ref` is enough for imperative access without state churn.
7. Use `useEffect` only if all prior options fail and the code is synchronizing with a real external system.

If an effect survives, document the external system in a short comment above it.

## Replacement Patterns

### Derive in Render

Replace effect-driven derived state with plain expressions.

Use:

```tsx
const filteredProducts = products.filter(matchesFilter);
const activeCount = selectedIds.length;
const isOpen = routeId === item.id;
```

Avoid:

```tsx
useEffect(() => {
  setFilteredProducts(products.filter(matchesFilter));
}, [products, matchesFilter]);
```

### Use Events for User Actions

Run imperative logic in the action source, not in an effect that watches state.

Use:

```tsx
function handleSubmit() {
  setSubmitting(true);
  submit(formData);
}
```

Avoid:

```tsx
useEffect(() => {
  if (shouldSubmit) submit(formData);
}, [shouldSubmit, formData]);
```

### Use React Router Data APIs

For this codebase, prefer:

- Route `loader` for read data
- Route `action` for mutations
- `useFetcher` for background form submissions and mutation state
- `useLoaderData` for route-owned data

Do not fetch in `useEffect` just because the component mounted.

### Use Keys Instead of Reset Effects

If local state should reset when an identity changes, remount with a `key`.

Use:

```tsx
<ProductForm key={product.id} product={product} />
```

Avoid:

```tsx
useEffect(() => {
  setQuantity(1);
  setNotes("");
}, [product.id]);
```

### Use `useSyncExternalStore` for Subscriptions

If the component reflects an external source, subscribe explicitly.

Examples:

- Media query state
- Window size store
- Global store adapters
- Broadcast or socket-backed snapshots

Do not build ad hoc subscribe/unsubscribe effects when `useSyncExternalStore` fits.

### Use Refs for Imperative Handles

Use refs when the value does not affect rendering.

Good ref use cases:

- Store timer IDs
- Cache DOM nodes
- Track previous values for comparison
- Hold imperative instances

Do not move a non-visual mutable value into state just to trigger an effect.

### Prefer CSS and Declarative Props for Visual Sync

Handle visual state through markup and styles first.

Prefer:

- Conditional class names
- Native element attributes
- CSS transitions and animations
- `autoFocus` when appropriate
- Scroll and snap behavior via CSS where possible

Avoid effects that only add or remove classes, toggle inline styles, or mirror booleans to the DOM.

## Effect Exceptions

Use an effect only for one of these cases:

### Third-Party Imperative APIs

Initialize and dispose non-React widgets, maps, carousels, or animation libraries that require imperative lifecycle management.

### Real Subscriptions

Connect and disconnect event sources, sockets, media queries, observers, or browser listeners that cannot be expressed through a dedicated hook or store abstraction.

### DOM Measurement or Positioning

Measure layout or coordinate imperative positioning when declarative layout is insufficient. Prefer `useLayoutEffect` only when visual correctness depends on pre-paint measurement.

### Timers with External Coordination

Manage intervals, debounced integrations, or delayed side effects tied to external systems. Do not use timers to derive UI state that can be computed directly.

## Review Rules

When reviewing or refactoring code:

1. Flag every `useEffect` and state whether it synchronizes with an external system.
2. Remove every effect used for derivation, fetching-on-mount, prop syncing, or event aftermath.
3. Remove `useMemo` and `useCallback` unless there is a concrete need.
4. Keep state minimal and local.
5. Prefer one-way data flow from loader data and props into render output.
6. If an effect remains, ensure cleanup is correct and dependencies are complete.
7. Add a brief comment above any remaining effect explaining why the escape hatch is justified.

## Repo-Specific Guidance

This repository uses React 19 and React Router 7. Favor these patterns:

- Move page-level data requirements into route loaders.
- Keep mutations in route actions or `useFetcher`.
- Derive filtered lists, counts, labels, and selection state during render.
- Reset modal or form state from explicit open/close handlers or by remounting keyed subtrees.
- Replace "submit when state changes" patterns with direct submit handlers.
- Avoid adding `useMemo` around filters, maps, and object literals unless profiling proves it matters.

Common migrations in this repo:

- `useEffect` that mirrors `fetcher.data` into local state: derive from `fetcher` or handle in the submit/open/close flow.
- `useEffect` that reacts to route changes for scrolling or UI reset: prefer router primitives, keyed remounts, built-in browser behavior, or a narrowly scoped escape hatch if it truly touches the browser.
- `useEffect` that computes gallery, grid, or testimonial state from props: compute in render.

## Output Requirements

When applying this skill:

1. State why each removed effect was unnecessary.
2. Name the replacement pattern used.
3. Keep surviving effects rare and explicitly justified.
4. Do not introduce `useMemo` or `useCallback` as a substitute for clear code.
