// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=411-4377
// source=packages/ui/src/button/Button.tsx
// component=DropdownMenuTrigger
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
const variant = instance.getEnum('Style', { Primary: 'primary', Neutral: 'neutral', 'Secondary-Solid': 'secondary-solid', 'Secondary-Outline': 'secondary-outline', Subtle: 'subtle', Transparent: 'transparent' })
const size = instance.getEnum('Size', { Small: 'sm', Medium: 'md', Large: 'lg' })
const iconOnly = instance.getEnum('Icon only', { True: true, False: false })
const state = instance.getEnum('State', { Default: '', Hovered: '', Pressed: '', Focused: '', Selected: 'selected', Disabled: 'disabled' })
const lead = instance.getBoolean('Lead icon') || iconOnly ? swapIcon(instance, '🔁 Swap Lead icon') : undefined

const attrs = figma.code`${variant !== 'primary' ? figma.code` variant="${variant}"` : ''}${size !== 'md' ? figma.code` size="${size}"` : ''}${state ? ' ' + state : ''}${lead ? figma.code` startIcon={${lead}}` : ''}`
const button = iconOnly
  ? figma.code`<Button${attrs} iconOnly aria-label="${attr(label)}" />`
  : figma.code`<Button${attrs} endIcon={<ChevronDownIcon />}>${child(label)}</Button>`

export default {
  example: figma.code`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    ${button}
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Item</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
  imports: ['import { Button, ChevronDownIcon, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@techuiux/dga-ui"'],
  id: 'button-menu',
  metadata: { nestable: true },
}
