# @techuiux/dga-ui

One import for the **DGA Platforms Code** design system in React, linked to the
Figma library (`Components Library (18th September) - Platforms Code`) through
Code Connect.

It's a **hybrid**:

- **Local components** where Figma needs something upstream lacks, built 1:1 from
  the Figma tokens: `Button`, `Tabs`, `Label`, `Spinner`.
- **Everything else re-exported from [`@dev-dga/react`](https://www.npmjs.com/package/@dev-dga/react)**
  unchanged. Upstream uses the same palette and radius as the Figma file, so mixed
  screens stay visually consistent.

Local exports shadow upstream ones with the same name, so swapping a component from
upstream to local later never changes your imports or the Figma mappings.

## Setup

```tsx
import { DgaUiProvider, Button, TextInput } from '@techuiux/dga-ui';
import '@techuiux/dga-ui/styles.css';

export function App() {
  return (
    <DgaUiProvider dir="rtl">   {/* required by upstream components */}
      <TextInput label="الاسم" />
      <Button>حفظ</Button>
    </DgaUiProvider>
  );
}
```

Fonts: load IBM Plex Sans Arabic yourself (e.g. `@fontsource/ibm-plex-sans-arabic`).

## Coverage

| Figma component set | Code | Source |
|---|---|---|
| Button | `Button` | local |
| Horizontal / Vertical Tab, Tab List | `Tabs`, `TabsList`, `TabsTrigger` | local |
| Label | `Label` | local |
| Text Input | `TextInput` | upstream |
| Textarea | `Textarea` | upstream |
| Checkbox, Checkbox Label | `Checkbox` | upstream |
| Radio, Radio Label | `RadioGroup` + `Radio` | upstream |
| Switch, Switch Label | `Switch` | upstream |
| Dropdown Input, Dropdown List Item | `Dropdown`, `DropdownItem`, `DropdownGroup` | upstream |
| Number Input | `NumberInput` | upstream |
| Search Box | `SearchBox` | upstream |
| Inline Alert | `InlineAlert`, `InlineAlertAction` | upstream |
| Notification | `Notification` | upstream |
| Notification Toast | `toast()` + `<NotificationToast />` at the app root | upstream |
| Tooltip | `Tooltip`, `TooltipTrigger`, `TooltipContent` | upstream |
| Help Icon | `HelpIcon` | upstream |
| Modal | `Modal` + `ModalContent` / `Header` / `Title` / `Body` / `Footer` | upstream |
| Loading | `Spinner` (Figma's 7 sizes, 20 to 44px) | local wrapper |
| Progress Bar | `Progress` | upstream |
| Circular Progress Bar | `CircularProgress` | upstream |
| Skeleton Circle / Square / Rectangle / Line, Skeleton Component | `Skeleton` | upstream |

### Known gaps (Figma property with no code equivalent yet)

| Figma | Property |
|---|---|
| Switch | `Icon` (check mark in thumb) |
| Switch Label | `Trail switch` (switch after label) |
| Dropdown Input | `Icon` (leading icon), `Clear` |
| Horizontal Tab | `More Tab` overflow menu |

## Spinner

Figma's Loading has seven sizes; upstream has four. The local wrapper keeps
upstream's styling and animation and sizes it exactly:

| Figma Size | `size` | px |
|---|---|---|
| xx Small · x Small · Small | `xxs` · `xs` · `sm` | 20 · 24 · 28 |
| Medium | `md` (default) | 32 |
| Large · x Large · xx Large | `lg` · `xl` · `xxl` | 36 · 40 · 44 |

## Button

| Figma property | Prop | Values |
|---|---|---|
| Style | `variant` | `primary` · `neutral` · `secondary-solid` · `secondary-outline` · `subtle` · `transparent` |
| Destructive | `destructive` | boolean (not allowed with `neutral`, same as Figma) |
| Size | `size` | `sm` (24px) · `md` (32px) · `lg` (40px) |
| On-color | `onColor` | boolean |
| Icon only | `iconOnly` | boolean, requires `aria-label` |
| State=Selected | `selected` | boolean, rendered as `aria-pressed` |
| State=Disabled | `disabled` | boolean |
| Lead Icon / Trail icon | `startIcon` / `endIcon` | ReactNode |

## Tabs

| Figma component · property | Prop |
|---|---|
| Horizontal / Vertical Tab List | `<Tabs orientation>` |
| Tab List · Size | `<Tabs size>` (`sm` · `md` · `lg`) |
| Tab List · Flush | `<TabsList flush>` |
| Tab List · Divider | `<TabsList divider>` (default `true`) |
| Tab · Selected | `<Tabs value / defaultValue>` |
| Tab · State=Disabled | `<TabsTrigger disabled>` |
| Tab · Icon + 🔁 Swap Icon | `<TabsTrigger icon>` |

## Label

| Figma property | Prop |
|---|---|
| Size | `size` (`md` · `lg`) |
| Type | `weight` (`regular` · `semibold`) |
| Required | `required` |
| Disabled | `disabled` |

## Tokens

`src/tokens.css` holds the Figma variables used by local components, named after
their Figma paths (`Button/button-background-primary-default` →
`--dga-button-background-primary-default`). Upstream keeps its own `--ddga-*`
tokens; values match.
