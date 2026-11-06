// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-130250
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=TextInput
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))
const rtl = instance.getEnum('RTL', { True: true, False: false })
const text = rtl ? instance.getString('Text AR') : instance.getString('Text ENG')
const filled = instance.getEnum('Filled', { True: true, False: false })
const error = instance.getEnum('Error', { True: true, False: false })
// Field label comes from the nested "Label" component's own template.
let labelText
let required = false
if (instance.getBoolean('Show label')) {
  const labelNode = instance.findInstance('Label')
  if (labelNode && labelNode.type === 'INSTANCE') {
    const p = labelNode.executeTemplate().metadata?.props
    labelText = p?.text
    required = p?.required === 'true'
  }
}
const labelAttrs = figma.code`${labelText ? figma.code`
  label="${attr(labelText)}"` : ''}${required ? figma.code`
  required` : ''}`
const size = instance.getEnum('Size', { Large: 'lg', Medium: 'md' })
const variant = instance.getEnum('Style', {
  Default: 'default',
  'Filled lighter': 'filled-lighter',
  'Filled darker': 'filled-darker',
})
const readOnly = instance.getEnum('State', { Default: false, Hovered: false, Pressed: false, Focused: false, 'Read-only': true, Disabled: false })
const disabled = instance.getEnum('State', { Default: false, Hovered: false, Pressed: false, Focused: false, 'Read-only': false, Disabled: true })
const fieldAttrs = figma.code`${size !== 'md' ? figma.code`
  size="${attr(size)}"` : ''}${variant !== 'default' ? figma.code`
  variant="${attr(variant)}"` : ''}${readOnly ? figma.code`
  readOnly` : ''}${disabled ? figma.code`
  disabled` : ''}`
// Helper text turns into errorMessage when the field is in its Error variant.
const showHelper = instance.getBoolean('Show Helper Text')
const helper = rtl ? instance.getString('Helper text AR') : instance.getString('Helper Text Eng')
const helperAttrs = showHelper
  ? (error ? figma.code`
  errorMessage="${attr(helper)}"` : figma.code`
  helperText="${attr(helper)}"`)
  : (error ? figma.code`
  error` : '')

// Leading icon or prefix (prefix wins, both render at the input's start)
let start
let usesAffix = false
if (instance.getBoolean('Prefix')) {
  start = figma.code`<TextInputAffix>…</TextInputAffix>`
  usesAffix = true
} else if (instance.getBoolean('Icon')) {
  const swap = instance.getInstanceSwap('🔁 Swap Icon')
  if (swap && swap.type === 'INSTANCE' && swap.hasCodeConnect()) start = swap.executeTemplate().example
}
const end = instance.getBoolean('Suffix') ? figma.code`<TextInputAffix>…</TextInputAffix>` : undefined
if (end) usesAffix = true
let helperIcon
if (showHelper && !error) {
  const swap = instance.getInstanceSwap('🔁 Swap Helper Icon')
  if (swap && swap.type === 'INSTANCE' && swap.hasCodeConnect()) helperIcon = swap.executeTemplate().example
}

export default {
  example: figma.code`<TextInput${labelAttrs}${filled ? figma.code`
  defaultValue="${attr(text)}"` : figma.code`
  placeholder="${attr(text)}"`}${fieldAttrs}${helperAttrs}${helperIcon ? figma.code`
  helperIcon={${helperIcon}}` : ''}${start ? figma.code`
  startAdornment={${start}}` : ''}${end ? figma.code`
  endAdornment={${end}}` : ''}
/>`,
  imports: [usesAffix ? 'import { TextInput, TextInputAffix } from "@techuiux/dga-ui"' : 'import { TextInput } from "@techuiux/dga-ui"'],
  id: 'text-input',
  metadata: { nestable: true },
}
