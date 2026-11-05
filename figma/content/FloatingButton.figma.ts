// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=19488-124656
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=FloatingButton
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

const rtl = instance.getEnum('RTL', { True: true, False: false })
const label = rtl ? instance.getString('Text AR') : instance.getString('Text EN')
const variant = instance.getEnum('Style', { 'Primary-Brand': 'primary', 'Primary- Neutral': 'black', 'Secondary-Solid': 'secondary' })
const size = instance.getEnum('Size', { Small: 'sm', Large: 'lg' })
const onColor = instance.getEnum('On color', { Yes: true, No: false })
const iconOnly = instance.getEnum('Icon only', { True: true, False: false })
const disabled = instance.getEnum('State', { Default: false, Hovered: false, Pressed: false, Selected: false, Foucsed: false, Disabled: true })
const icon = swapIcon(instance, '🔁 Lead Icon')

const attrs = figma.code`${variant !== 'primary' ? figma.code` variant="${variant}"` : ''}${size !== 'lg' ? figma.code` size="${size}"` : ''}${onColor ? ' onColor' : ''}${disabled ? ' disabled' : ''} icon={${icon || '<span />'}}`

export default {
  example: iconOnly
    ? figma.code`<FloatingButton${attrs} aria-label="${attr(label)}" />`
    : figma.code`<FloatingButton${attrs}>${child(label)}</FloatingButton>`,
  imports: ['import { FloatingButton } from "@techuiux/dga-ui"'],
  id: 'floating-button',
  metadata: { nestable: true },
}
