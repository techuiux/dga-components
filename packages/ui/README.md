# @techuiux/dga-ui

One import for the **DGA Platforms Code** design system in React, linked to the
Figma library (`Components Library (18th September) - Platforms Code`) through
Code Connect.

It's a **hybrid**:

- **Local components** where Figma needs something upstream lacks, built 1:1 from
  the Figma tokens: `Button`, `Tabs`, `Label`, `Spinner`, `CloseButton` (plus `CloseIcon`, `ChevronDownIcon`).
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

Icons: the Figma snippets use Hugeicons (`@hugeicons/react` + `@hugeicons/core-free-icons`), installed with this
package. Import them directly, as the snippets do:

```tsx
import { HugeiconsIcon } from '@hugeicons/react';
import { Home05Icon } from '@hugeicons/core-free-icons';

<Button startIcon={<HugeiconsIcon icon={Home05Icon} />}>Home</Button>
```

Don't redraw icons as inline SVG or placeholders: every Figma icon maps to a Hugeicons export.

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
| Link | `Link` | upstream |
| Breadcrumb | `Breadcrumb` + `BreadcrumbList` / `Item` / `Link` / `Page` / `Separator` / `EllipsisTrigger` | upstream |
| Pagination | `Pagination` + `PaginationContent` / `Item` / `Link` / `Previous` / `Next` / `Overflow` | upstream |
| Menu, Menu list item | `DropdownMenu` + `DropdownMenuItem` (`startIcon`, `trailing`) | upstream |
| Content Switcher | `ContentSwitcher`, `ContentSwitcherItem` | upstream |
| Progress Indicator (one step) | `Step` + `StepIndicator` / `StepContent` / `StepTitle` / `StepDescription`, inside `<ProgressIndicator orientation>` | upstream |
| Accordion, Accordion list | `Accordion` + `AccordionItem` / `Trigger` / `Content` | upstream |
| Avatar, Avatar Group | `Avatar` + `AvatarImage` / `AvatarFallback`, `AvatarGroup` | upstream |
| Card | `Card` + `CardHeader` / `Title` / `Description` / `Footer` / `ExpandableContent` | upstream |
| Chip | `Chip` | upstream |
| Tag, Status Tag | `Tag`, `StatusTag` | upstream |
| Divider | `Divider` | upstream |
| List, List item | `List`, `ListItem` | upstream |
| Structured List | `StructuredList` + parts (rows and cells read from the layers) | upstream |
| Table | `Table` + parts (header, rows, cell types, sort state read from the layers) | upstream |
| Quote | `Quote` | upstream |
| Metric | `Metric`, `MetricChart` | upstream |
| Rating | `Rating` (value counted from the stars) | upstream |
| Digital Stamp | `DigitalStamp` | upstream |
| Code Snippet | `CodeSnippet` | upstream |
| Carousel | `Carousel` + `CarouselViewport` / `Slide` / `Dots` / `Previous` / `Next` | upstream |
| Pie / Line / Bar Chart | `PieChart`, `LineChart`, `BarChart` (sample data) | upstream |
| Floating Button | `FloatingButton` | upstream |
| Date Picker | `DatePicker` / `DateRangePicker` (from `@dev-dga/react/date-picker`, re-exported here) | upstream |
| File Upload / Single, File Upload / Multiple | `FileUpload` (`variant="button"` / `"dropzone"`) | upstream |
| Filtration | `Filtration` + `FiltrationTrigger` / `Panel` / `Section` / `CheckboxFilter` | upstream |
| Slider | `Slider` (single or range) | upstream |
| Radial Stepper, Circular Stepper | `CircularProgress` with `segments` | upstream |
| Button-menu | `Button` + `ChevronDownIcon` in a `DropdownMenuTrigger` | local |
| Button-Close | `CloseButton` | local |
| Slideout Menu, Slideout Menu Header | `SlideoutMenu` + `SlideoutMenuContent` / `Header` / `Body` / `Group` / `Item` / `Footer` | upstream |
| Nav Header, Header Menu Item, Header Action, Header Menu, Logo Placeholder | `Header` + `HeaderBrand` / `HeaderNav` / `HeaderActions`, `HeaderMenuItem`, `HeaderAction`, `HeaderMenuButton`, `LogoPlaceholder` | upstream |
| Nav Header Sub-Menu, Header Sub-menu Item | `HeaderSubMenu` + `HeaderSubMenuGroup`, `HeaderSubMenuItem` | upstream |
| Second Nav Header, sub-header-Item | `SecondNavHeader` + `SecondNavHeaderItems`, `SecondNavHeaderItem` | upstream |
| Nav Drawer, Nav Drawer Item, Nav Drawer Header | `SidebarProvider` + `Sidebar` / `SidebarHeader` / `SidebarMenu` / `SidebarMenuButton` / `SidebarMenuSub*` / `SidebarSeparator` | upstream |
| Footer | `Footer` + `FooterNav` / `Group` / `Links` / `Link` | upstream |
| TOC, TOC Item | `<nav aria-label>` list of `Link`s (no TOC component upstream) | upstream `Link` |

### Known gaps (Figma property with no code equivalent yet)

| Figma | Property |
|---|---|
| Switch | `Icon` (check mark in thumb) |
| Switch Label | `Trail switch` (switch after label) |
| Dropdown Input | `Icon` (leading icon), `Clear` |
| Horizontal Tab | `More Tab` overflow menu |
| Slideout Menu | `Border`, `Scroll Bar` (drawing aids). Row trail `Button` / `Switch` are dropped: the row is already a `<button>` |
| Menu, Slideout Menu | Figma draws only the open panel; snippets add a placeholder trigger button |
| Avatar Group | `Stacked=False` (upstream always overlaps) |
| Charts | Figma charts are illustrations; snippets use sample `series` / `data` |
| Code Snippet | Extra tabs: add more entries to `languages` |
| Radial / Circular Stepper | 40px and 48px sizes render at the 64px `sm` size; `On-Color` has no code variant |
| Filtration | `Placement` and `Result` are layout in Figma; snippet shows sample options |
| Date Picker, File Upload | Snippets reference your own `files` / `addFiles` / `removeFile` state and sample labels |
| Pagination | Overflow snippet uses `onSelect={setPage}`; wire it to your page state |
| Nav Header, Footer | `Breakpoint` is responsive in code; Footer link groups are sample content |
| Nav Drawer | `Background Color` has no `Sidebar` prop (theme with CSS); `On Color` follows the drawer |
| Nav Header Sub-Menu | `Background`, `Link style`, `Full width` are panel presets; snippet references your `open` / `setOpen` state |
| Item Icon | Not mapped: it is the icon slot inside header and drawer items |

## Publishing templates

`.github/workflows/figma-code-connect.yml` runs `figma connect publish` on every merge to `main`
that touches `figma/`. Add a Figma access token as the repo secret `FIGMA_ACCESS_TOKEN`
(scopes: Code Connect write, File content read). After that, editing a template and merging is
all it takes; no manual disconnects in Figma.

### Icons

The 4,389 icons in *Icons - Platforms Code* map to [Hugeicons](https://hugeicons.com)
(`arrow-down-01` → `<HugeiconsIcon icon={ArrowDown01Icon} />`). There's one template per
icon, too many to keep in git, so `scripts/figma-icons.mjs` generates them into
`figma/icons/generated/` (gitignored) and the workflow runs it before publishing.

- Stroke + Rounded imports from `@hugeicons/core-free-icons` when the icon is there;
  the other 8 Style × Type combinations import from `@hugeicons-pro/core-<style>-<type>`,
  which needs a Hugeicons Pro licence.
- The script prints icons it couldn't find in the free package (name guessed for Pro).
- The MISC ICONS page (brand logos, flags, payment marks) is not mapped: no Hugeicons equivalent.
- Every component that nests an icon (Button lead/trail icon, accordion chevron, menu rows)
  picks it up automatically once published.

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

`src/tokens.css` holds **all 779 variables** from the Figma library
*Foundations - Platforms Code*, every mode included. Each variable's **Web code
syntax** in Figma is set to the same name, so Dev Mode shows
`var(--dga-text-primary)` and that variable exists here.

| Figma | CSS |
|---|---|
| Semantic variable | `--dga-` + its own name: `Text/text-primary` → `--dga-text-primary`, `Global/spacing-sm` → `--dga-spacing-sm` |
| Primitive | keeps its group: `Colors/Neutral/400` → `--dga-color-neutral-400`, `Spacing/1․5 (6px)` → `--dga-space-1-5` |
| Primitive that clashes with a semantic name | `base-` prefix: `--dga-base-font-weight-bold` |
| Name clash with different values | `Global/border-disabled` → `--dga-global-border-disabled`, `Global/control-disabled` → `--dga-global-control-disabled` |
| Typos in Figma names | fixed in CSS only: `-Ig` → `-lg`, `upcomming`, `boarder`, `lable`/`Iable`, `diabled`, `Lavendar`, `Hight`, `Wieght` |

Modes:

- **Themes**: Light on `:root`; Dark with `<html data-theme="dark">`. Set it on
  `<html>`: semantic tokens alias other semantic tokens, and CSS resolves those
  where they are declared.
- **Spacing / Radius / Typography**: Desktop by default. Tablet (≤960px) and
  Mobile (≤600px) apply only with `<html data-dga-responsive>`. They're opt-in
  because Figma's Mobile type ramp takes `typo-size-text-xs` to 8px, too small
  for controls such as Button `sm`.
- Font weights are stored in Figma as style names (`Semibold`, `Bold italic`);
  CSS gets the numeric weight, and italics need `font-style: italic`.

To regenerate, re-run the export from Figma with the same naming rule and set
code syntax again (both are in the PR description). Upstream keeps its own
`--ddga-*` tokens.
