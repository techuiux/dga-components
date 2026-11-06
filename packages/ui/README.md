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
