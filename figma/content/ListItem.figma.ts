// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=7850-3463
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=ListItem
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
// Icon from an instance-swap property (undefined when the swap is empty).
const swapIcon = (node, name) => {
  const s = node.getInstanceSwap(name)
  return s && s.type === 'INSTANCE' ? s.executeTemplate().example : undefined
}
// First / longest text layer inside a node (crosses nested instances).
const texts = (node) => node.findLayers((n) => n.type === 'TEXT', { traverseInstances: true }).map((n) => n.textContent)
const longest = (node) => texts(node).reduce((a, b) => (String(b).length > String(a).length ? b : a), '')

const level = instance.getEnum('Level', { One: 1, Two: 2 })
const withIcon = instance.getEnum('Type', { Ordered: false, Unordered: false, 'With Icon': true })
// The label is the longest text layer (ordered items also have a "1." marker layer).
const label = longest(instance)
let icon
if (withIcon) {
  const i = instance.findLayers((n) => n.type === 'INSTANCE')[0]
  if (i && i.hasCodeConnect()) icon = i.executeTemplate().example
}

export default {
  example: figma.code`<ListItem${level === 2 ? ' level={2}' : ''}${withIcon ? figma.code` icon={${icon || '<span aria-hidden="true">•</span>'}}` : ''}>${child(label)}</ListItem>`,
  imports: ['import { ListItem } from "@techuiux/dga-ui"'],
  id: 'list-item',
  metadata: { nestable: true },
}
