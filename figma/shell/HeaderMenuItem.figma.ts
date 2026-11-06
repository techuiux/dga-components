// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-148312
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=HeaderMenuItem
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))
// First / longest text layer inside a node (crosses nested instances).
const texts = (node) => node.findLayers((n) => n.type === 'TEXT', { traverseInstances: true }).map((n) => n.textContent)
const longest = (node) => texts(node).reduce((a, b) => (String(b).length > String(a).length ? b : a), '')

const selected = instance.getEnum('Selected', { True: true, False: false })
const disabled = instance.getEnum('State', { Default: false, Hovered: false, Pressed: false, Focused: false, Disabled: true })
const label = longest(instance)

export default {
  example: figma.code`<HeaderMenuItem${selected ? ' selected' : ''}${disabled ? ' disabled' : ''}>${child(label)}</HeaderMenuItem>`,
  imports: ['import { HeaderMenuItem } from "@techuiux/dga-ui"'],
  id: 'header-menu-item',
  metadata: { nestable: true },
}
