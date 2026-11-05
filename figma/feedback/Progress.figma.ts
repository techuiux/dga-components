// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=17686-3283
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Progress
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))
const value = instance.getEnum('Percentage', { '20%': 20, '50%': 50, '100% - Success': 100, '0% - Error': 0 })
const error = instance.getEnum('Error', { Yes: true, No: false })
const success = instance.getEnum('Success', { Yes: true, No: false })
const state = error ? 'error' : success ? 'success' : 'normal'
const size = instance.getEnum('Size', { Small: 'sm', Medium: 'md', Large: 'lg' })
const variant = instance.getEnum('Style', { Primary: 'primary', Neutral: 'neutral' })

let label
let required = false
if (instance.getBoolean('Show label')) {
  const l = instance.findInstance('Label')
  if (l && l.type === 'INSTANCE') {
    const p = l.executeTemplate().metadata?.props
    label = p?.text
    required = p?.required === 'true'
  }
}
let helper
if (instance.getBoolean('Helper Text')) {
  const t = instance.findText('Helper Text')
  if (t && t.textContent) helper = t.textContent
}

export default {
  example: figma.code`<Progress
  value={${value}}${size !== 'md' ? figma.code`
  size="${attr(size)}"` : ''}${variant !== 'primary' ? figma.code`
  variant="${attr(variant)}"` : ''}${state !== 'normal' ? figma.code`
  state="${attr(state)}"` : ''}${label ? figma.code`
  label="${attr(label)}"` : figma.code`
  aria-label="Progress"`}${required ? figma.code`
  required` : ''}${helper ? figma.code`
  helperText="${attr(helper)}"` : ''}
  showValue
/>`,
  imports: ['import { Progress } from "@techuiux/dga-ui"'],
  id: 'progress',
  metadata: { nestable: true },
}
