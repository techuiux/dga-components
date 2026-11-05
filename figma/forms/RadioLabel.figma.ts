// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30195-23490
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Radio
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
const showAlert = instance.getBoolean('Alert Message')
const value = label.toLowerCase().trim().replace(/\s+/g, '-')

let selected = false
const dot = instance.findInstance('Radio')
if (dot && dot.type === 'INSTANCE') selected = dot.executeTemplate().metadata?.props?.selected === 'true'

export default {
  example: figma.code`<RadioGroup aria-label="Options"${selected ? figma.code` defaultValue="${attr(value)}"` : ''}${showHelper ? figma.code` helperText="${attr(helper)}"` : ''}${showAlert ? figma.code` errorMessage="${attr(alert)}"` : ''}>
  <Radio value="${attr(value)}" label="${attr(label)}" />
</RadioGroup>`,
  imports: ['import { RadioGroup, Radio } from "@techuiux/dga-ui"'],
  id: 'radio-label',
  metadata: { nestable: true },
}
