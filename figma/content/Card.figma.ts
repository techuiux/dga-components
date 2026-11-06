// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30195-10358
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Card
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

const type = instance.getEnum('Type', { Default: 'default', Expandable: 'expandable', Selectable: 'selectable' })
const variant = instance.getEnum('Effect', { 'With Sahdow': 'elevated', 'No Shadow': 'plain', Stroke: 'default' })
const disabled = instance.getEnum('State', { Default: false, Hover: false, Focused: false, Disabled: true })
const expanded = type === 'expandable' && instance.getEnum('Expanded', { True: true, False: false })
const selected = type === 'selectable' && instance.getEnum('Selected', { True: true, False: false })

// Title / description are plain text layers (in layer order); actions are connected Buttons.
const own = instance.findLayers((n) => n.type === 'TEXT').map((n) => n.textContent).filter((t) => String(t).trim())
const title = own[0] ?? ''
const description = own[1]
const actions = []
instance.findConnectedInstances((node) => {
  if (node.codeConnectId() === 'button') actions.push(figma.code`
    ${node.executeTemplate().example}`)
  return false
})

const attrs = figma.code`${variant !== 'default' ? figma.code` variant="${variant}"` : ''}${type === 'expandable' ? figma.code` expandable${expanded ? ' defaultExpanded' : ''}` : ''}${type === 'selectable' ? figma.code` selectable${selected ? ' defaultSelected' : ''}` : ''}${disabled ? ' disabled' : ''}`
const names = ['Card', 'CardHeader', 'CardTitle']
if (description !== undefined) names.push('CardDescription')
if (actions.length) names.push('CardFooter')
if (type === 'expandable') names.push('CardExpandableContent')

export default {
  example: figma.code`<Card${attrs}>
  <CardHeader>
    <CardTitle>${child(title)}</CardTitle>${description !== undefined ? figma.code`
    <CardDescription>${child(description)}</CardDescription>` : ''}
  </CardHeader>${type === 'expandable' ? figma.code`
  <CardExpandableContent>{/* More content */}</CardExpandableContent>` : ''}${actions.length ? figma.code`
  <CardFooter>${actions}
  </CardFooter>` : ''}
</Card>`,
  imports: ['import { ' + names.join(', ') + ' } from "@techuiux/dga-ui"'],
  id: 'card',
  metadata: { nestable: true },
}
