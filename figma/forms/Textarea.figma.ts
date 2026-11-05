// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=5462-417368
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Textarea
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))
const rtl = instance.getEnum('RTL', { True: true, False: false })
const filled = instance.getEnum('Filled', { True: true, False: false })
const error = instance.getEnum('Error', { True: true, False: false })
// Textarea exposes no text properties; read the visible layer instead.
const layer = instance.findText(filled ? 'Entered Text' : 'Placeholder Text')
const text = layer && layer.textContent ? layer.textContent : ''
const resizable = instance.getBoolean('Resize')
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
const variant = instance.getEnum('Style', { Default: 'default', 'Filled lighter': 'filled-lighter', 'Filled darker': 'filled-darker' })
const readOnly = instance.getEnum('State', { Default: false, Hovered: false, Pressed: false, Focused: false, 'Read-only': true, Disabled: false })
const disabled = instance.getEnum('State', { Default: false, Hovered: false, Pressed: false, Focused: false, 'Read-only': false, Disabled: true })

export default {
  example: figma.code`<Textarea${labelAttrs}${text ? (filled ? figma.code`
  defaultValue="${attr(text)}"` : figma.code`
  placeholder="${attr(text)}"`) : ''}${variant !== 'default' ? figma.code`
  variant="${attr(variant)}"` : ''}${error ? figma.code`
  error` : ''}${resizable ? '' : figma.code`
  resize="none"`}${readOnly ? figma.code`
  readOnly` : ''}${disabled ? figma.code`
  disabled` : ''}
/>`,
  imports: ['import { Textarea } from "@techuiux/dga-ui"'],
  id: 'textarea',
  metadata: { nestable: true },
}
