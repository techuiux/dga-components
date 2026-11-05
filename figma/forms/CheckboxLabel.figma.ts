// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30186-54105
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Checkbox
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))
const rtl = instance.getEnum('RTL', { True: true, False: false })
const label = rtl ? instance.getString('Label AR') : instance.getString('Label EN')
const helper = rtl ? instance.getString('Helper Text AR') : instance.getString('Helper Text EN')
const alert = rtl ? instance.getString('Alert Message AR') : instance.getString('Alert Message EN')
const showHelper = instance.getBoolean('Helper Text')
const showAlert = instance.getBoolean('Alert message')

let state = 'false'
const box = instance.findInstance('Checkbox')
if (box && box.type === 'INSTANCE') state = box.executeTemplate().metadata?.props?.state || 'false'

export default {
  example: figma.code`<Checkbox
  label="${attr(label)}"${showHelper ? figma.code`
  helperText="${attr(helper)}"` : ''}${showAlert ? figma.code`
  errorMessage="${attr(alert)}"` : ''}${state === 'indeterminate' ? figma.code`
  defaultChecked="indeterminate"` : state === 'true' ? figma.code`
  defaultChecked` : ''}
/>`,
  imports: ['import { Checkbox } from "@techuiux/dga-ui"'],
  id: 'checkbox-label',
  metadata: { nestable: true },
}
