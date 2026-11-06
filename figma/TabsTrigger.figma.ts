// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-125017
// source=packages/ui/src/tabs/Tabs.tsx
// component=TabsTrigger
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))

const rtl = instance.getEnum('RTL', { True: true, False: false })
const label = rtl ? instance.getString('Text AR') : instance.getString('Text EN')
const value = label.toLowerCase().trim().replace(/\s+/g, '-')

// Selected is owned by <Tabs value>, Size by <Tabs size>; neither is a trigger prop.
const disabled = instance.getEnum('State', {
  Default: false,
  Hovered: false,
  Pressed: false,
  Focused: false,
  Disabled: true,
  Closed: false,
  Open: false,
})
const selected = instance.getEnum('Selected', { True: true, False: false })
const moreTab = instance.getEnum('More Tab', { Yes: true, No: false })

const hasIcon = instance.getBoolean('Icon')
const iconSwap = instance.getInstanceSwap('🔁 Swap Icon')
let icon
if (hasIcon && iconSwap && iconSwap.type === 'INSTANCE' && iconSwap.hasCodeConnect()) icon = iconSwap.executeTemplate().example

export default {
  example: moreTab
    ? figma.code`{/* "More" overflow tab: not implemented in @techuiux/dga-ui yet */}`
    : figma.code`<TabsTrigger value="${attr(value)}"${icon ? figma.code` icon={${icon}}` : ''}${disabled ? ' disabled' : ''}>${child(label)}</TabsTrigger>`,
  imports: ['import { TabsTrigger } from "@techuiux/dga-ui"'],
  id: 'tabs-trigger',
  metadata: { nestable: true, props: { value, selected: selected ? 'true' : 'false' } },
}
