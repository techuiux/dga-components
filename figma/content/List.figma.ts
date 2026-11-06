// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=7850-3506
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=List
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
  return s && s.type === 'INSTANCE' && s.hasCodeConnect() ? s.executeTemplate().example : undefined
}
// First / longest text layer inside a node (crosses nested instances).
const texts = (node) => node.findLayers((n) => n.type === 'TEXT', { traverseInstances: true }).map((n) => n.textContent)
const longest = (node) => texts(node).reduce((a, b) => (String(b).length > String(a).length ? b : a), '')

const variant = instance.getEnum('Type', { 'Ordered List': 'ordered', Unordered: 'unordered', 'With Icon': 'with-icon' })
const tone = instance.getEnum('Style', { Primary: 'primary', Neutral: 'neutral', 'On-color': 'on-color' })
const items = []
instance.findConnectedInstances((node) => {
  if (node.codeConnectId() === 'list-item') items.push(figma.code`
  ${node.executeTemplate().example}`)
  return false
})

export default {
  example: figma.code`<List variant="${variant}"${tone !== 'primary' ? figma.code` tone="${tone}"` : ''}>${items}
</List>`,
  imports: ['import { List } from "@techuiux/dga-ui"'],
  id: 'list',
  metadata: { nestable: true },
}
