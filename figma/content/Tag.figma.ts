// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=421-110968
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Tag
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))
// Read a property from a nested (possibly unconnected) instance; undefined when absent.
const pv = (node, name) => {
  const v = node.getPropertyValue(name)
  return v !== null && typeof v === 'object' ? undefined : v
}
// Icon from an instance-swap property (undefined when the swap is empty).
const swapIcon = (node, name) => {
  const s = node.getInstanceSwap(name)
  return s && s.type === 'INSTANCE' ? s.executeTemplate().example : undefined
}

const rtl = instance.getEnum('RTL', { True: true, False: false })
const label = rtl ? instance.getString('Label AR') : instance.getString('Label EN')
const size = instance.getEnum('Size', { 'x Small': 'sm', Small: 'md', Medium: 'lg' })
const variant = instance.getEnum('Style', { Neutral: 'default', Success: 'success', Info: 'info', Warning: 'warning', Error: 'destructive', 'On-Color': 'on-color' })
const outlined = instance.getEnum('Outline', { True: true, False: false })
const rounded = instance.getEnum('Rounded', { True: true, False: false })
const iconOnly = instance.getEnum('Icon only', { True: true, False: false })
const lead = instance.getBoolean('Lead icon') ? swapIcon(instance, '🔁 Swap Lead Icon') : undefined
const trail = instance.getBoolean('Trail icon') ? swapIcon(instance, '🔁 Swap Trail Icon') : undefined

const attrs = figma.code`${variant !== 'default' ? figma.code` variant="${variant}"` : ''}${size !== 'md' ? figma.code` size="${size}"` : ''}${rounded ? ' shape="pill"' : ''}${outlined ? ' outlined' : ''}${iconOnly ? figma.code` iconOnly aria-label="${attr(label)}"` : ''}${lead ? figma.code` startIcon={${lead}}` : ''}${trail && !iconOnly ? figma.code` endIcon={${trail}}` : ''}`

export default {
  example: iconOnly ? figma.code`<Tag${attrs} />` : figma.code`<Tag${attrs}>${child(label)}</Tag>`,
  imports: ['import { Tag } from "@techuiux/dga-ui"'],
  id: 'tag',
  metadata: { nestable: true, props: { label: String(label) } },
}
