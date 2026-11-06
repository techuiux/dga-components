// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=2962-37761
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Link
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))
// First / longest text layer inside a node (crosses nested instances).
const texts = (node) => node.findLayers((n) => n.type === 'TEXT', { traverseInstances: true }).map((n) => n.textContent)
const longest = (node) => texts(node).reduce((a, b) => (String(b).length > String(a).length ? b : a), '')

// No TOC component upstream: an item is a Link to the section's id.
const selected = instance.getEnum('Selected', { True: true, False: false })
const disabled = instance.getEnum('State', { Default: false, Hovered: false, Pressed: false, Focused: false, Disabled: true })
const level = instance.getEnum('Level', { 'Level 1 (H2)': '1', 'Level 2 (H3)': '2', 'Level 3 (H4)': '3' })

export default {
  example: figma.code`<Link href="#section"${selected ? ' aria-current="location"' : ' tone="neutral"'}${disabled ? ' disabled' : ''}>${child(longest(instance))}</Link>`,
  imports: ['import { Link } from "@techuiux/dga-ui"'],
  id: 'toc-item',
  metadata: { nestable: true, props: { level } },
}
