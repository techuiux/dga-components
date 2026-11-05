// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-69998
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Switch
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
// Figma "Trail switch" (switch after the label) has no code equivalent yet.

let on = false
const sw = instance.findInstance('Switch')
if (sw && sw.type === 'INSTANCE') on = sw.executeTemplate().metadata?.props?.on === 'true'

export default {
  example: figma.code`<Switch
  label="${attr(label)}"${showHelper ? figma.code`
  helperText="${attr(helper)}"` : ''}${showAlert ? figma.code`
  errorMessage="${attr(alert)}"` : ''}${on ? figma.code`
  defaultChecked` : ''}
/>`,
  imports: ['import { Switch } from "@techuiux/dga-ui"'],
  id: 'switch-label',
  metadata: { nestable: true },
}
