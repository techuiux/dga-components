// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-149694
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=LogoPlaceholder
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
// First / longest text layer inside a node (crosses nested instances).
const texts = (node) => node.findLayers((n) => n.type === 'TEXT', { traverseInstances: true }).map((n) => n.textContent)
const longest = (node) => texts(node).reduce((a, b) => (String(b).length > String(a).length ? b : a), '')

const size = instance.getEnum('Size', { Small: 'sm', Medium: 'md', Large: 'lg' })
const layout = instance.getEnum('Logo Position', { Side: 'side', Top: 'top' })
const label = longest(instance)

export default {
  example: figma.code`<LogoPlaceholder label="${attr(label)}"${size !== 'md' ? figma.code` size="${size}"` : ''}${layout !== 'side' ? ' layout="top"' : ''} />`,
  imports: ['import { LogoPlaceholder } from "@techuiux/dga-ui"'],
  id: 'logo-placeholder',
  metadata: { nestable: true },
}
