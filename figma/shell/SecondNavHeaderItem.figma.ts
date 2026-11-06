// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=18841-25963
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=SecondNavHeaderItem
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))
// First / longest text layer inside a node (crosses nested instances).
const texts = (node) => node.findLayers((n) => n.type === 'TEXT', { traverseInstances: true }).map((n) => n.textContent)
const longest = (node) => texts(node).reduce((a, b) => (String(b).length > String(a).length ? b : a), '')
// Code of the first connected icon-like instance inside this one, if any.
const innerIcon = (node) => {
  const i = node.findLayers((n) => n.type === 'INSTANCE' && n.hasCodeConnect())[0]
  return i ? i.executeTemplate().example : undefined
}

const icon = innerIcon(instance)
export default {
  example: figma.code`<SecondNavHeaderItem${icon ? figma.code` icon={${icon}}` : ''}>${child(longest(instance))}</SecondNavHeaderItem>`,
  imports: ['import { SecondNavHeaderItem } from "@techuiux/dga-ui"'],
  id: 'second-nav-item',
  metadata: { nestable: true },
}
