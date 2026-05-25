# 02 — Static library

Bundled game data. Not saved — shipped with the app.

**Depends on:** [01-state](./01-state.md) (ProfessionId, skillId references)  
**Used by:** [06-tasks](./06-tasks.md), [07-selectors](./07-selectors.md)

---

## GameLibrary

```ts
type GameLibrary = {
  professions: Record<ProfessionId, LibraryProfession>;
  skills: Record<string, LibrarySkill>;
  items: Record<string, LibraryItem>;
};
```

Lookup helpers: `getSkill(id)`, `getProfession(id)`, `getItem(id)`.

---

## Profession

```ts
type ProfessionType = "gathering" | "craft";

type LibraryProfession = {
  id: ProfessionId;
  type: ProfessionType;
};
```

Launch set:

| id | type |
|----|------|
| `blacksmithing` | `craft` |
| `cooking` | `craft` |
| `carpentry` | `craft` |

---

## Skill

```ts
type Ingredient = { itemId: string; quantity: number };
type Product = { itemId: string; quantity: number; probability: number };

type LibrarySkill = {
  id: string;
  professionId: ProfessionId;
  ingredients: Ingredient[];
  products: Product[];
  durationSeconds: number;
  experienceGained: number;
};
```

| Field | Notes |
|-------|-------|
| `ingredients` | May be `[]` |
| `products` | `probability` 0–1; 1 = guaranteed |
| `durationSeconds` | One execution |
| `experienceGained` | Skill XP on complete |

---

## Item

```ts
type LibraryItem = {
  id: string;
  name: string;
};
```

Quantities only appear in skill ingredients/products.

---

## Seed content

Placeholder skills — one per profession minimum, enough to demo a task cycle:

| skill id | profession | duration | notes |
|----------|------------|----------|-------|
| TBD | `cooking` | TBD | e.g. first kitchen skill |
| TBD | `blacksmithing` | TBD | |
| TBD | `carpentry` | TBD | |

Concrete ids and recipes filled at implementation.

---

## Open questions

1. Skill unlock order / prerequisites?
2. Level-up threshold table for skills?
