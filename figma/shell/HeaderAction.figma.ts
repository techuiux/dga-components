// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-148445
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=HeaderAction
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))
// First / longest text layer inside a node (crosses nested instances).
const texts = (node) => node.findLayers((n) => n.type === 'TEXT', { traverseInstances: true }).map((n) => n.textContent)
const longest = (node) => texts(node).reduce((a, b) => (String(b).length > String(a).length ? b : a), '')
// Code of the first connected icon-like instance inside this one, if any.
const innerIcon = (node) => {
  const i = node.findLayers((n) => n.type === 'INSTANCE' && n.hasCodeConnect())[0]
  return i ? i.executeTemplate().example : undefined
}

const selected = instance.getEnum('Selected', { True: true, False: false })
const disabled = instance.getEnum('State', { Default: false, Hovered: false, Pressed: false, Focused: false, Disabled: true })
const top = instance.getEnum('Icon position', { Inline: false, Top: true })
const iconOnly = instance.getEnum('Icon only', { True: true, False: false })
const label = longest(instance)
const icon = innerIcon(instance)

const attrs = figma.code`${icon ? figma.code` icon={${icon}}` : ''}${top ? ' iconPosition="top"' : ''}${selected ? ' selected' : ''}${disabled ? ' disabled' : ''}`
export default {
  example: iconOnly
    ? figma.code`<HeaderAction${attrs} iconOnly aria-label="${attr(label || 'Action')}" />`
    : figma.code`<HeaderAction${attrs}>${child(label)}</HeaderAction>`,
  imports: ['import { HeaderAction } from "@techuiux/dga-ui"'],
  id: 'header-action',
  metadata: { nestable: true },
}
