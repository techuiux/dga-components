// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-61013
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=NumberInput
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))
const rtl = instance.getEnum('RTL', { True: true, False: false })
const text = instance.getString('Text')
const filled = instance.getEnum('Filled', { True: true, False: false })
const error = instance.getEnum('Error', { True: true, False: false })
const numeric = /^-?\d+(\.\d+)?$/.test(text.trim())
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
// Prefix / Suffix are the minus / plus steppers.
const hideControls = !instance.getBoolean('Prefix') && !instance.getBoolean('Suffix')

export default {
  example: figma.code`<NumberInput${labelAttrs}${filled && numeric ? figma.code`
  defaultValue={${text.trim()}}` : figma.code`
  placeholder="${attr(text)}"`}${fieldAttrs}${helperAttrs}${hideControls ? figma.code`
  hideControls` : ''}
/>`,
  imports: ['import { NumberInput } from "@techuiux/dga-ui"'],
  id: 'number-input',
  metadata: { nestable: true },
}
