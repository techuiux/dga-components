// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30195-21865
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=DropdownMenuItem
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

const rtl = instance.getEnum('RTL', { True: true, False: false })
const label = rtl ? instance.getString('Label AR') : instance.getString('Label EN')
// Hovered / Pressed / Focused / Selected are Radix highlight states, not props.
const disabled = instance.getEnum('State', {
  Default: false,
  Hovered: false,
  Pressed: false,
  Focused: false,
  Selected: false,
  Disabled: true,
})
const selected = instance.getEnum('State', {
  Default: false,
  Hovered: false,
  Pressed: false,
  Focused: false,
  Selected: true,
  Disabled: false,
})

let startIcon
if (instance.getBoolean('Lead Icon')) {
  const swap = instance.getInstanceSwap('🔁 Swap Lead icon')
  if (swap && swap.type === 'INSTANCE' && swap.hasCodeConnect()) startIcon = swap.executeTemplate().example
}

// Figma "Trail element" maps to the `trailing` slot.
const trail = instance.getEnum('Trail element', {
  None: 'none',
  Text: 'text',
  Icon: 'icon',
  Button: 'button',
  Tag: 'tag',
  Switch: 'switch',
})
const imports = ['import { DropdownMenuItem } from "@techuiux/dga-ui"']
let trailing = ''
if (trail === 'text' && instance.getBoolean('Show Trail Text')) {
  trailing = figma.code` trailing="${attr(instance.getString('Trail Text'))}"`
} else if (trail === 'icon') {
  const swap = instance.getInstanceSwap('🔁 Swap Trail Icon')
  if (swap && swap.type === 'INSTANCE' && swap.hasCodeConnect()) trailing = figma.code` trailing={${swap.executeTemplate().example}}`
} else if (trail === 'button' || trail === 'switch') {
  const node = instance.findInstance(trail === 'button' ? 'Button' : 'Switch')
  if (node.type === 'INSTANCE' && node.hasCodeConnect()) {
    trailing = figma.code` trailing={${node.executeTemplate().example}}`
  }
} else if (trail === 'tag') {
  const node = instance.findInstance('Tag')
  if (node.type === 'INSTANCE' && node.hasCodeConnect()) {
    trailing = figma.code` trailing={${node.executeTemplate().example}}`
  } else if (node.type === 'INSTANCE') {
    // Tag isn't connected yet: build it from the nested instance's own label.
    const tagText = pv(node, pv(node, 'RTL') === 'True' ? 'Label AR' : 'Label EN')
    trailing = figma.code` trailing={<Tag>${child(tagText ?? 'Tag')}</Tag>}`
    imports.push('import { Tag } from "@techuiux/dga-ui"')
  }
}

const attrs = figma.code`${disabled ? ' disabled' : ''}${startIcon ? figma.code` startIcon={${startIcon}}` : ''}${trailing}`

export default {
  example: figma.code`<DropdownMenuItem${attrs}>${child(label)}</DropdownMenuItem>`,
  imports,
  id: 'menu-item',
  metadata: {
    nestable: true,
    props: { label: String(label), disabled: disabled ? 'true' : 'false', selected: selected ? 'true' : 'false' },
  },
}
