// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-148183
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=HeaderSubMenuItem
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))
// First / longest text layer inside a node (crosses nested instances).
const texts = (node) => node.findLayers((n) => n.type === 'TEXT', { traverseInstances: true }).map((n) => n.textContent)
// Code of the first connected icon-like instance inside this one, if any.
const innerIcon = (node) => {
  const i = node.findLayers((n) => n.type === 'INSTANCE' && n.hasCodeConnect())[0]
  return i ? i.executeTemplate().example : undefined
}

// First text layer = label, second = description. "On-color" comes from the HeaderSubMenu background.
const t = texts(instance).filter((s) => String(s).trim())
const icon = innerIcon(instance)

export default {
  example: figma.code`<HeaderSubMenuItem href="#"${icon ? figma.code` icon={${icon}}` : ''}${t[1] !== undefined ? figma.code` description="${attr(t[1])}"` : ''}>${child(t[0] ?? '')}</HeaderSubMenuItem>`,
  imports: ['import { HeaderSubMenuItem } from "@techuiux/dga-ui"'],
  id: 'header-sub-menu-item',
  metadata: { nestable: true },
}
