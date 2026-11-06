// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-148312
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=HeaderMenuItem
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
const selected = instance.getEnum('Selected', { True: true, False: false })
const disabled = instance.getEnum('State', { Default: false, Hovered: false, Pressed: false, Focused: false, Disabled: true })
const label = instance.getString(rtl ? 'Text AR' : 'Text EN')
const icon = instance.getBoolean('Icon') ? swapIcon(instance, '🔁 Swap Icon') : undefined
// "Sub-menu" shows the chevron: the item opens a HeaderSubMenu.
const expandable = instance.getBoolean('Sub-menu')

export default {
  example: figma.code`<HeaderMenuItem${icon ? figma.code` icon={${icon}}` : ''}${selected ? ' selected' : ''}${expandable ? figma.code` expandable aria-expanded={false}` : ''}${disabled ? ' disabled' : ''}>${child(label)}</HeaderMenuItem>`,
  imports: ['import { HeaderMenuItem } from "@techuiux/dga-ui"'],
  id: 'header-menu-item',
  metadata: { nestable: true },
}
