// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-161144
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=SidebarHeader
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))
// First / longest text layer inside a node (crosses nested instances).
const texts = (node) => node.findLayers((n) => n.type === 'TEXT', { traverseInstances: true }).map((n) => n.textContent)
const longest = (node) => texts(node).reduce((a, b) => (String(b).length > String(a).length ? b : a), '')

// "Background" follows the drawer.
export default {
  example: figma.code`<SidebarHeader>${child(longest(instance))}</SidebarHeader>`,
  imports: ['import { SidebarHeader } from "@techuiux/dga-ui"'],
  id: 'nav-drawer-header',
  metadata: { nestable: true },
}
