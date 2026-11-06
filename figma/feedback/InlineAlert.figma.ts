// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=1730-46048
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=InlineAlert
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))
const rtl = instance.getEnum('RTL', { True: true, False: false })
const title = rtl ? instance.getString('Lead Text AR') : instance.getString('Lead Text EN')
const helper = rtl ? instance.getString('Helper Text AR') : instance.getString('Helper Text EN')
const showHelper = instance.getBoolean('Helper text')
const type = instance.getEnum('Type', { Neutral: 'neutral', Info: 'info', Destructive: 'destructive', Warning: 'warning', Success: 'success' })
const appearance = instance.getEnum('Background Color', { White: 'white', Color: 'color' })
const closable = instance.getBoolean('Close Button')
const primary = instance.getBoolean('Actions')
const secondary = instance.getBoolean('Secondary Action')
// "Mobile" is a responsive layout variant, not a prop.

const actions = primary || secondary
  ? figma.code`
  actions={
    <>${primary ? figma.code`
      <InlineAlertAction>Action</InlineAlertAction>` : ''}${secondary ? figma.code`
      <InlineAlertAction>Secondary action</InlineAlertAction>` : ''}
    </>
  }`
  : ''

export default {
  example: figma.code`<InlineAlert
  type="${attr(type)}"
  appearance="${attr(appearance)}"
  title="${attr(title)}"${closable ? figma.code`
  onClose={() => {}}` : ''}${actions}
>${showHelper ? figma.code`
  ${child(helper)}` : ''}
</InlineAlert>`,
  imports: [primary || secondary ? 'import { InlineAlert, InlineAlertAction } from "@techuiux/dga-ui"' : 'import { InlineAlert } from "@techuiux/dga-ui"'],
  id: 'inline-alert',
  metadata: { nestable: true },
}
