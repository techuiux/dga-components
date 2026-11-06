// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=8421-71014
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=ContentSwitcher
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

const rtl = instance.getEnum('RTL', { True: true, False: false })
const size = instance.getEnum('Size', { Small: 'sm', Medium: 'md', Large: 'lg' })
const onColor = instance.getEnum('OnColor', { True: true, False: false })

// Segments are private "_Content Switcher Item"s, in layer order.
let nodes = instance.findLayers((node) => node.type === 'INSTANCE' && pv(node, 'Item Type') !== undefined)
// If hidden segments are returned too, drop the ones the "2nd item" / "3rd Item" toggles hide.
if (nodes.length === 3) {
  const show = [true, instance.getBoolean('2nd item'), instance.getBoolean('3rd Item')]
  nodes = nodes.filter((_, i) => show[i])
}
const segs = nodes.map((node, i) => ({
  value: 'item-' + (i + 1),
  text: pv(node, pv(node, 'RTL') === 'True' ? 'Text AR' : 'Text En') ?? '',
  selected: pv(node, 'State') === 'Selected',
}))
const selected = segs.find((s) => s.selected) || segs[0]

const items = segs.map(
  (s) => figma.code`
  <ContentSwitcherItem value="${attr(s.value)}">${child(s.text)}</ContentSwitcherItem>`,
)

export default {
  example: figma.code`<ContentSwitcher${size !== 'md' ? figma.code` size="${attr(size)}"` : ''}${onColor ? ' onColor' : ''}${selected ? figma.code` defaultValue="${attr(selected.value)}"` : ''} aria-label="${rtl ? 'طريقة العرض' : 'View'}">${items}
</ContentSwitcher>`,
  imports: ['import { ContentSwitcher, ContentSwitcherItem } from "@techuiux/dga-ui"'],
  id: 'content-switcher',
  metadata: { nestable: true },
}
