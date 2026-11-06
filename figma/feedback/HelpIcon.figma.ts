// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-139675
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=HelpIcon
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))
const open = instance.getEnum('Open', { True: true, False: false })
const side = instance.getEnum('Placement', { Top: 'top', Bottom: 'bottom', Left: 'left', Right: 'right' })
const align = instance.getEnum('Alignment', { Start: 'start', Center: 'center', End: 'end' })

// Bubble text comes from the nested Tooltip component's template.
let content = 'More information'
let title = ''
let inverted = false
const tip = instance.findInstance('Tooltip')
if (tip && tip.type === 'INSTANCE') {
  const p = tip.executeTemplate().metadata?.props
  if (p?.content) content = p.content
  title = p?.title || ''
  inverted = p?.inverted === 'true'
}

export default {
  example: figma.code`<HelpIcon label="More information"${side !== 'top' ? figma.code` side="${attr(side)}"` : ''}${align !== 'center' ? figma.code` align="${attr(align)}"` : ''}${title ? figma.code` title="${attr(title)}"` : ''}${inverted ? ' inverted' : ''}${open ? ' defaultOpen' : ''}>
  ${child(content)}
</HelpIcon>`,
  imports: ['import { HelpIcon } from "@techuiux/dga-ui"'],
  id: 'help-icon',
  metadata: { nestable: true },
}
