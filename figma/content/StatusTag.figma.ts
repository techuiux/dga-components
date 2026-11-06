// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=5698-52957
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=StatusTag
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
const tone = instance.getEnum('Style', { Neutral: 'neutral', Green: 'success', Blue: 'info', Yellow: 'warning', Red: 'error' })
const status = instance.getEnum('Status', { Inverted: 'inverted', Subtle: 'subtle', Ghost: 'ghost' })
const size = instance.getEnum('Size', { 'x Small': 'sm', Small: 'md', Medium: 'lg' })

export default {
  example: figma.code`<StatusTag tone="${tone}" status="${status}"${size !== 'md' ? figma.code` size="${size}"` : ''}>${child(label)}</StatusTag>`,
  imports: ['import { StatusTag } from "@techuiux/dga-ui"'],
  id: 'status-tag',
  metadata: { nestable: true },
}
