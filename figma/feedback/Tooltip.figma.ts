// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-139266
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Tooltip
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))
const rtl = instance.getEnum('RTL', { True: true, False: false })
const title = rtl ? instance.getString('Title AR') : instance.getString('Title EN')
const content = rtl ? instance.getString('Content AR') : instance.getString('Content EN')
const showTitle = instance.getBoolean('Title')
const showIcon = instance.getBoolean('Icon')
const inverted = instance.getEnum('Inverted', { True: true, False: false })
// Figma places the beak; code places the bubble. A beak on top means the bubble sits below the trigger.
const side = instance.getEnum('Beak placement', { None: 'none', Top: 'bottom', Bottom: 'top', Left: 'right', Right: 'left' })
const align = instance.getEnum('Beak Alignment', { Start: 'start', Center: 'center', End: 'end' })

const contentAttrs = figma.code`${side !== 'none' ? figma.code` side="${attr(side)}"` : ' arrow={false}'}${align !== 'center' ? figma.code` align="${attr(align)}"` : ''}${showTitle ? figma.code` title="${attr(title)}"` : ''}${showIcon ? ' icon' : ''}${inverted ? ' inverted' : ''}`

export default {
  example: figma.code`<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="subtle">Hover me</Button>
  </TooltipTrigger>
  <TooltipContent${contentAttrs}>${child(content)}</TooltipContent>
</Tooltip>`,
  imports: ['import { Tooltip, TooltipTrigger, TooltipContent, Button } from "@techuiux/dga-ui"'],
  id: 'tooltip',
  metadata: {
    nestable: true,
    props: { title: showTitle ? title : '', content, inverted: inverted ? 'true' : 'false' },
  },
}
