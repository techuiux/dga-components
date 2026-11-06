// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=3534-49934
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Dropdown
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))
const rtl = instance.getEnum('RTL', { True: true, False: false })
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
// Dropdown uses "Show Helper text" (lowercase t) and the same EN/AR helper props.
const showHelper = instance.getBoolean('Show Helper text')
const helper = rtl ? instance.getString('Helper Text AR') : instance.getString('Helper Text Eng')
const helperAttrs = showHelper
  ? (error ? figma.code`
  errorMessage="${attr(helper)}"` : figma.code`
  helperText="${attr(helper)}"`)
  : (error ? figma.code`
  error` : '')
const placeholderLayer = instance.findText('Placeholder Text')
const placeholder = placeholderLayer && placeholderLayer.textContent ? placeholderLayer.textContent : 'Select'
const enteredLayer = instance.findText('Entered Text')
const entered = enteredLayer && enteredLayer.textContent ? enteredLayer.textContent : 'Option 1'
const enteredValue = entered.toLowerCase().trim().replace(/\s+/g, '-')
// Figma "Icon" (leading icon) and "Clear" have no code equivalent yet.

export default {
  example: figma.code`<Dropdown${labelAttrs}
  placeholder="${attr(placeholder)}"${filled ? figma.code`
  defaultValue="${attr(enteredValue)}"` : ''}${fieldAttrs}${helperAttrs}
>
  <DropdownItem value="${attr(enteredValue)}">${child(entered)}</DropdownItem>
  <DropdownItem value="option-2">Option 2</DropdownItem>
</Dropdown>`,
  imports: ['import { Dropdown, DropdownItem } from "@techuiux/dga-ui"'],
  id: 'dropdown',
  metadata: { nestable: true },
}
