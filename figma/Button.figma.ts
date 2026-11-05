// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=407-510376
// source=@dev-dga/react (dist/index.d.ts → ButtonProps)
// component=Button
import figma from 'figma'
const instance = figma.selectedInstance

// RTL picks which label layer is live; direction itself comes from DgaProvider, not a prop.
const rtl = instance.getEnum('RTL', { True: true, False: false })
const label = rtl ? instance.getString('Text AR') : instance.getString('Text EN')

// Style × Destructive → single `variant` enum in code.
const style = instance.getEnum('Style', {
  Primary: 'primary',
  Neutral: 'neutral',
  'Secondary-Solid': 'secondary-solid',
  'Secondary-Outline': 'secondary-outline',
  Subtle: 'subtle',
  Transparent: 'transparent',
})
const destructive = instance.getEnum('Destructive', { yes: true, no: false })

let variant
if (!destructive) {
  if (style === 'primary') variant = 'primary'
  else if (style === 'neutral') variant = 'black'
  else if (style === 'secondary-solid') variant = 'secondary'
  else if (style === 'secondary-outline') variant = 'outline'
  else if (style === 'subtle') variant = 'ghost'
  else if (style === 'transparent') variant = 'ghost'
} else {
  if (style === 'primary') variant = 'destructive'
  else if (style === 'neutral') variant = 'destructive' // no destructive-black in code
  else if (style === 'secondary-solid') variant = 'destructive-subtle'
  else if (style === 'secondary-outline') variant = 'destructive-outline'
  else if (style === 'subtle') variant = 'destructive-ghost'
  else if (style === 'transparent') variant = 'destructive-ghost'
}

const iconOnly = instance.getEnum('Icon only', { True: true, False: false })
const size = iconOnly
  ? instance.getEnum('Size', { Large: 'icon', Medium: 'icon-md', Small: 'icon-sm' })
  : instance.getEnum('Size', { Large: 'lg', Medium: 'md', Small: 'sm' })

// Hovered / Pressed / Focused / Selected are interaction states with no prop.
const disabled = instance.getEnum('State', {
  Default: false,
  Hovered: false,
  Pressed: false,
  Selected: false,
  Focused: false,
  Disabled: true,
})
const onColor = instance.getEnum('On-color', { True: true, False: false })

const hasLead = instance.getBoolean('Lead Icon')
const hasTrail = instance.getBoolean('Trail icon')
const leadSwap = instance.getInstanceSwap('🔁 Swap Lead Icon')
const trailSwap = instance.getInstanceSwap('🔁 Swap Trail Icon')
let leadIcon
let trailIcon
if (leadSwap && leadSwap.type === 'INSTANCE') leadIcon = leadSwap.executeTemplate().example
if (trailSwap && trailSwap.type === 'INSTANCE') trailIcon = trailSwap.executeTemplate().example

export default {
  example: iconOnly
    ? figma.code`<Button
  variant="${variant}"
  size="${size}"
  aria-label="${label}"${disabled ? figma.code`
  disabled` : ''}${onColor ? figma.code`
  onColor` : ''}
>
  ${leadIcon}
</Button>`
    : figma.code`<Button
  variant="${variant}"
  size="${size}"${hasLead && leadIcon ? figma.code`
  startIcon={${leadIcon}}` : ''}${hasTrail && trailIcon ? figma.code`
  endIcon={${trailIcon}}` : ''}${disabled ? figma.code`
  disabled` : ''}${onColor ? figma.code`
  onColor` : ''}
>
  ${label}
</Button>`,
  imports: ['import { Button } from "@dev-dga/react"'],
  id: 'button',
  metadata: { nestable: true },
}
