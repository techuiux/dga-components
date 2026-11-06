// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=2763-420129
// source=packages/ui/src/close-button/CloseButton.tsx
// component=CloseButton
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
  return s && s.type === 'INSTANCE' ? s.executeTemplate().example : undefined
}

const size = instance.getEnum('Size', { 'x Small': 'xs', Small: 'sm', Medium: 'md', Large: 'lg' })
const onColor = instance.getEnum('On-color', { True: true, False: false })

export default {
  example: figma.code`<CloseButton${size !== 'md' ? figma.code` size="${size}"` : ''}${onColor ? ' onColor' : ''} />`,
  imports: ['import { CloseButton } from "@techuiux/dga-ui"'],
  id: 'close-button',
  metadata: { nestable: true },
}
