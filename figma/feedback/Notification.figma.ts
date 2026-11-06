// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-56889
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Notification
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))
const rtl = instance.getEnum('RTL', { True: true, False: false })
const lead = rtl ? instance.getString('Lead Text AR') : instance.getString('Lead Text EN')
const helper = rtl ? instance.getString('Helper Text AR') : instance.getString('Helper Text EN')
const type = instance.getEnum('Style', { Neutral: 'neutral', Critical: 'critical', Warning: 'warning', Success: 'success', Info: 'info' })
const showLead = instance.getBoolean('Lead Text')
const showIcon = instance.getBoolean('Icon')
const dismissible = instance.getBoolean('Dismissible')
const link = instance.getBoolean('Link')
const button = instance.getBoolean('Button')

const actions = link || button
  ? figma.code`
  actions={
    <>${link ? figma.code`
      <Link href="#">Learn more</Link>` : ''}${button ? figma.code`
      <Button size="sm" variant="secondary-outline">Action</Button>` : ''}
    </>
  }`
  : ''
const names = ['Notification'].concat(link ? ['Link'] : []).concat(button ? ['Button'] : [])

export default {
  example: figma.code`<Notification
  type="${attr(type)}"${showLead ? figma.code`
  lead="${attr(lead)}"` : ''}${showIcon ? '' : figma.code`
  icon={false}`}${dismissible ? figma.code`
  onClose={() => {}}` : ''}${actions}
>
  ${child(helper)}
</Notification>`,
  imports: ['import { ' + names.join(', ') + ' } from "@techuiux/dga-ui"'],
  id: 'notification',
  metadata: { nestable: true },
}
