// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=18841-25963
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=SecondNavHeaderItem
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

const rtl = instance.getEnum('RTL', { Yes: true, No: false })
const label = instance.getString(rtl ? 'Text AR' : 'Text EN')
const icon = swapIcon(instance, 'Swap icon ')

export default {
  example: figma.code`<SecondNavHeaderItem${icon ? figma.code` icon={${icon}}` : ''}>${child(label)}</SecondNavHeaderItem>`,
  imports: ['import { SecondNavHeaderItem } from "@techuiux/dga-ui"'],
  id: 'second-nav-item',
  metadata: { nestable: true },
}
