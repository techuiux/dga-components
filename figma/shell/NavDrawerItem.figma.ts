// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-160274
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=SidebarMenuButton
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))
// First / longest text layer inside a node (crosses nested instances).
const texts = (node) => node.findLayers((n) => n.type === 'TEXT', { traverseInstances: true }).map((n) => n.textContent)
const longest = (node) => texts(node).reduce((a, b) => (String(b).length > String(a).length ? b : a), '')

const type = instance.getEnum('Type', { Link: 'link', 'Parent (Sub-menu)': 'parent', Divider: 'divider' })
const level = instance.getEnum('Level', { 'Level 1': 1, 'Level 2': 2 })
const active = instance.getEnum('State', { Default: false, Hovered: false, Pressed: false, Focused: false, Selected: true, Disabled: false })
const disabled = instance.getEnum('State', { Default: false, Hovered: false, Pressed: false, Focused: false, Selected: false, Disabled: true })
const expanded = instance.getEnum('Expanded', { True: true, False: false })
// "On Color" follows the drawer background.
const label = longest(instance)
// Level 1 renders a <button>; level 2 (SidebarMenuSubButton) renders an <a>.
const attrs = figma.code`${active ? ' isActive' : ''}${disabled ? ' disabled' : ''}${type === 'parent' ? figma.code` aria-expanded={${expanded ? 'true' : 'false'}}` : ''}`
const subAttrs = figma.code` href="#"${active ? ' isActive aria-current="page"' : ''}${disabled ? ' aria-disabled="true"' : ''}`

export default {
  example:
    type === 'divider'
      ? figma.code`<SidebarMenuItem>
  <SidebarSeparator />
</SidebarMenuItem>`
      : level === 2
        ? figma.code`<SidebarMenuSubItem>
  <SidebarMenuSubButton${subAttrs}>${child(label)}</SidebarMenuSubButton>
</SidebarMenuSubItem>`
        : figma.code`<SidebarMenuItem>
  <SidebarMenuButton${attrs}>${child(label)}</SidebarMenuButton>
</SidebarMenuItem>`,
  imports: [
    type === 'divider'
      ? 'import { SidebarMenuItem, SidebarSeparator } from "@techuiux/dga-ui"'
      : level === 2
        ? 'import { SidebarMenuSubItem, SidebarMenuSubButton } from "@techuiux/dga-ui"'
        : 'import { SidebarMenuItem, SidebarMenuButton } from "@techuiux/dga-ui"',
  ],
  id: 'nav-drawer-item',
  metadata: { nestable: true, props: { level: String(type === 'divider' ? 0 : level) } },
}
