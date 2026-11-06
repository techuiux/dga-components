// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-148183
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=HeaderSubMenuItem
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
const label = instance.getString(rtl ? 'Lead Text AR' : 'Lead Text EN')
const desc = instance.getBoolean('Helper Text') ? instance.getString(rtl ? 'Helper Text AR' : 'Helper Text EN') : undefined
// The icon slot has no swap property: read the mapped icon inside. "On-color" follows the HeaderSubMenu background.
const icon = instance.getBoolean('Icon') ? iconIn(instance) : undefined

export default {
  example: figma.code`<HeaderSubMenuItem href="#"${icon ? figma.code` icon={${icon}}` : ''}${desc !== undefined ? figma.code` description="${attr(desc)}"` : ''}>${child(label)}</HeaderSubMenuItem>`,
  imports: ['import { HeaderSubMenuItem } from "@techuiux/dga-ui"'],
  id: 'header-sub-menu-item',
  metadata: { nestable: true },
}
