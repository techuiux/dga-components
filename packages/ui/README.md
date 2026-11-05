# @techuiux/dga-ui

React components built 1:1 from the **DGA Platforms Code** Figma library
(`Components Library (18th September) - Platforms Code`). No runtime dependencies
beyond React. Every Figma component property maps to exactly one prop, so
Code Connect snippets need no translation.

```tsx
import { Button, Tabs, TabsList, TabsTrigger, TabsContent } from '@techuiux/dga-ui';
import '@techuiux/dga-ui/styles.css';
```

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
| State=Hovered / Pressed / Focused | — | live CSS states |
| Lead Icon / Trail icon | `startIcon` / `endIcon` | ReactNode |
| Text EN / Text AR | `children` | set `dir="rtl"` on the page for Arabic |

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

Keyboard: arrow keys move and activate (mirrored in RTL), Home/End jump,
disabled tabs are skipped.

Not yet built: the horizontal **More Tab** overflow menu.

## Tokens

`src/tokens.css` holds the Figma variables as CSS custom properties, named after
their Figma paths (`Button/button-background-primary-default` →
`--dga-button-background-primary-default`).
