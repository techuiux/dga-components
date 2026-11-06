// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=17276-24471
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Chip
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
  return s && s.type === 'INSTANCE' && s.hasCodeConnect() ? s.executeTemplate().example : undefined
}

const rtl = instance.getEnum('RTL', { True: true, False: false })
const label = rtl ? instance.getString('Text AR') : instance.getString('Text EN')
const variant = instance.getEnum('Style', { Primary: 'primary', Neutral: 'neutral' })
const size = instance.getEnum('Size', { Small: 'sm', Medium: 'md', Large: 'lg' })
const rounded = instance.getEnum('Rounded', { True: true, False: false })
const onColor = instance.getEnum('On-color', { True: true, False: false })
const state = instance.getEnum('State', { Default: 'default', Hovered: 'default', Pressed: 'default', Focused: 'default', Selected: 'selected', Disabled: 'disabled' })
const lead = instance.getBoolean('Show Lead Icon') ? swapIcon(instance, '🔁 Swap Lead Icon') : undefined
const trail = instance.getBoolean('Show Trail Icon') ? swapIcon(instance, '🔁 Swap Trail Icon') : undefined

const attrs = figma.code`${variant !== 'neutral' ? figma.code` variant="${variant}"` : ''}${size !== 'md' ? figma.code` size="${size}"` : ''}${rounded ? ' rounded' : ''}${onColor ? ' onColor' : ''}${state === 'selected' ? ' defaultSelected' : ''}${state === 'disabled' ? ' disabled' : ''}${lead ? figma.code` leadingIcon={${lead}}` : ''}${trail ? figma.code` trailingIcon={${trail}}` : ''}`

export default {
  example: figma.code`<Chip${attrs}>${child(label)}</Chip>`,
  imports: ['import { Chip } from "@techuiux/dga-ui"'],
  id: 'chip',
  metadata: { nestable: true },
}
