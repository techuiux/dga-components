// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-134187
// source=packages/ui/src/label/Label.tsx
// component=Label
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))
const rtl = instance.getEnum('RTL', { True: true, False: false })
const text = rtl ? instance.getString('Text AR') : instance.getString('Text')
const size = instance.getEnum('Size', { Medium: 'md', Large: 'lg' })
const weight = instance.getEnum('Type', { 'Regular (Default)': 'regular', Semibold: 'semibold' })
const required = instance.getBoolean('Required')
const disabled = instance.getEnum('Disabled', { True: true, False: false })

export default {
  example: figma.code`<Label${size !== 'md' ? figma.code` size="${attr(size)}"` : ''}${weight !== 'regular' ? figma.code` weight="${attr(weight)}"` : ''}${required ? ' required' : ''}${disabled ? ' disabled' : ''}>${child(text)}</Label>`,
  imports: ['import { Label } from "@techuiux/dga-ui"'],
  id: 'label',
  metadata: { nestable: true, props: { text, required: required ? 'true' : 'false' } },
}
