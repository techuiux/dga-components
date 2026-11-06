// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=8680-37527
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=toast
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))
const rtl = instance.getEnum('RTL', { True: true, False: false })
const lead = rtl ? instance.getString('Lead Text AR') : instance.getString('Lead Text EN')
const helper = rtl ? instance.getString('Helper Text AR') : instance.getString('Helper Text EN')
const showHelper = instance.getBoolean('Helper Text')
const fn = instance.getEnum('Type', { Neutral: 'toast', Info: 'toast.info', 'Critical/Error': 'toast.error', Warning: 'toast.warning', Success: 'toast.success' })
const closable = instance.getBoolean('Close Button')
const primary = instance.getBoolean('Actions')
const secondary = instance.getBoolean('Secondary Action')
const js = (s) => JSON.stringify(String(s))

const opts = []
if (showHelper) opts.push('description: ' + js(helper))
if (primary) opts.push('action: { label: "Action", onClick: () => {} }')
if (secondary) opts.push('secondaryAction: { label: "Secondary action", onClick: () => {} }')
const optsCode = opts.length ? ', {\n  ' + opts.join(',\n  ') + ',\n}' : ''

// Toasts are fired imperatively; the viewport is rendered once at the app root.
export default {
  example: figma.code`// Once at the app root: <NotificationToast${closable ? ' closeButton' : ''} />
${fn}(${js(lead)}${optsCode})`,
  imports: ['import { toast, NotificationToast } from "@techuiux/dga-ui"'],
  id: 'notification-toast',
  metadata: { nestable: false },
}
