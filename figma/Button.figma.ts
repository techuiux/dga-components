// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=407-510376
// source=packages/ui/src/button/Button.tsx
// component=Button
import figma from 'figma'
const instance = figma.selectedInstance

// RTL only picks which label layer is live; direction comes from the page's `dir`.
const rtl = instance.getEnum('RTL', { True: true, False: false })
const label = rtl ? instance.getString('Text AR') : instance.getString('Text EN')

// Every Figma property below maps 1:1 to a Button prop.
const variant = instance.getEnum('Style', {
  Primary: 'primary',
  Neutral: 'neutral',
  'Secondary-Solid': 'secondary-solid',
  'Secondary-Outline': 'secondary-outline',
  Subtle: 'subtle',
  Transparent: 'transparent',
})
const destructive = instance.getEnum('Destructive', { yes: true, no: false })
const size = instance.getEnum('Size', { Small: 'sm', Medium: 'md', Large: 'lg' })
const onColor = instance.getEnum('On-color', { True: true, False: false })
const iconOnly = instance.getEnum('Icon only', { True: true, False: false })
// Hovered / Pressed / Focused are live CSS states, not props.
const selected = instance.getEnum('State', {
  Default: false,
  Hovered: false,
  Pressed: false,
  Selected: true,
  Focused: false,
  Disabled: false,
})
const disabled = instance.getEnum('State', {
  Default: false,
  Hovered: false,
  Pressed: false,
  Selected: false,
  Focused: false,
  Disabled: true,
})

const hasLead = instance.getBoolean('Lead Icon')
const hasTrail = instance.getBoolean('Trail icon')
const leadSwap = instance.getInstanceSwap('🔁 Swap Lead Icon')
const trailSwap = instance.getInstanceSwap('🔁 Swap Trail Icon')
let leadIcon
let trailIcon
if (leadSwap && leadSwap.type === 'INSTANCE') leadIcon = leadSwap.executeTemplate().example
if (trailSwap && trailSwap.type === 'INSTANCE') trailIcon = trailSwap.executeTemplate().example

// Defaults (primary, md) are omitted to keep snippets short.
const variantAttr = variant !== 'primary' ? figma.code`
  variant="${variant}"` : ''
const sizeAttr = size !== 'md' ? figma.code`
  size="${size}"` : ''
const flags = figma.code`${destructive ? figma.code`
  destructive` : ''}${onColor ? figma.code`
  onColor` : ''}${selected ? figma.code`
  selected` : ''}${disabled ? figma.code`
  disabled` : ''}`

export default {
  example: iconOnly
    ? figma.code`<Button${variantAttr}${sizeAttr}${flags}
  iconOnly
  aria-label="${label}"${leadIcon ? figma.code`
  startIcon={${leadIcon}}` : ''}
/>`
    : figma.code`<Button${variantAttr}${sizeAttr}${flags}${hasLead && leadIcon ? figma.code`
  startIcon={${leadIcon}}` : ''}${hasTrail && trailIcon ? figma.code`
  endIcon={${trailIcon}}` : ''}
>
  ${label}
</Button>`,
  imports: ['import { Button } from "@techuiux/dga-ui"'],
  id: 'button',
  metadata: { nestable: true },
}
