// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-160274
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=SidebarMenuButton
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))
// Read a property from a nested (possibly unconnected) instance; undefined when absent.
const pv = (node, name) => {
  const v = node.getPropertyValue(name)
  return v !== null && typeof v === 'object' ? undefined : v
}
// Icon code from an instance-swap property, when the icon is mapped (Icons library -> Hugeicons).
const swapIcon = (node, name) => {
  const s = node.getInstanceSwap(name)
  return s && s.type === 'INSTANCE' && s.hasCodeConnect() ? s.executeTemplate().example : undefined
}
// First mapped icon nested in a node (for icon slots without a swap property).
const iconIn = (node) => {
  const i = node.findLayers((n) => n.type === 'INSTANCE' && n.hasCodeConnect() && n.codeConnectId() === 'icon')[0]
  return i ? i.executeTemplate().example : undefined
}

const rtl = instance.getEnum('RTL', { True: true, False: false })
const type = instance.getEnum('Type', { Link: 'link', 'Parent (Sub-menu)': 'parent', Divider: 'divider' })
const level = instance.getEnum('Level', { 'Level 1': 1, 'Level 2': 2 })
const active = instance.getEnum('State', { Default: false, Hovered: false, Pressed: false, Focused: false, Selected: true, Disabled: false })
const disabled = instance.getEnum('State', { Default: false, Hovered: false, Pressed: false, Focused: false, Selected: false, Disabled: true })
const expanded = instance.getEnum('Expanded', { True: true, False: false })
// "On Color" follows the drawer background.
const label = type === 'divider' ? '' : instance.getString(rtl ? 'Text AR' : 'Text EN')
const icon = type !== 'divider' && instance.getBoolean('Icon') ? swapIcon(instance, '🔁 Swap Icon') : undefined
// Badge = the Tag on the row (a count or status), shown as SidebarMenuBadge.
let badge
if (type !== 'divider' && level === 1 && instance.getBoolean('Badge')) {
  const tag = instance.findInstance('Tag')
  if (tag.type === 'INSTANCE') badge = tag.findLayers((n) => n.type === 'TEXT', { traverseInstances: true }).map((n) => n.textContent)[0]
}
const content = figma.code`${icon ? figma.code`
    ${icon}` : ''}
    <span>${child(label)}</span>
  `
// Level 1 renders a <button>; level 2 (SidebarMenuSubButton) renders an <a>.
const attrs = figma.code`${active ? ' isActive' : ''}${disabled ? ' disabled' : ''}${type === 'parent' ? figma.code` aria-expanded={${expanded ? 'true' : 'false'}}` : ''}`
const subAttrs = figma.code` href="#"${active ? ' isActive aria-current="page"' : ''}${disabled ? ' aria-disabled="true"' : ''}`
const names = type === 'divider' ? ['SidebarMenuItem', 'SidebarSeparator'] : level === 2 ? ['SidebarMenuSubItem', 'SidebarMenuSubButton'] : ['SidebarMenuItem', 'SidebarMenuButton']
if (badge !== undefined) names.push('SidebarMenuBadge')

export default {
  example:
    type === 'divider'
      ? figma.code`<SidebarMenuItem>
  <SidebarSeparator />
</SidebarMenuItem>`
      : level === 2
        ? figma.code`<SidebarMenuSubItem>
  <SidebarMenuSubButton${subAttrs}>${content}</SidebarMenuSubButton>
</SidebarMenuSubItem>`
        : figma.code`<SidebarMenuItem>
  <SidebarMenuButton${attrs}>${content}</SidebarMenuButton>${badge !== undefined ? figma.code`
  <SidebarMenuBadge>${child(badge)}</SidebarMenuBadge>` : ''}
</SidebarMenuItem>`,
  imports: ['import { ' + names.join(', ') + ' } from "@techuiux/dga-ui"'],
  id: 'nav-drawer-item',
  metadata: { nestable: true, props: { level: String(type === 'divider' ? 0 : level) } },
}
