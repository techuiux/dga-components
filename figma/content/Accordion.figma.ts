// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=1147-60874
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Accordion
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
  return s && s.type === 'INSTANCE' && s.hasCodeConnect() ? s.executeTemplate().example : undefined
}

const rtl = instance.getEnum('RTL', { True: true, False: false })
const title = rtl ? instance.getString('Title AR') : instance.getString('Title EN')
const expanded = instance.getEnum('Expanded', { True: true, False: false })
const disabled = instance.getEnum('State', { Default: false, Hovered: false, Pressed: false, Focused: false, Disabled: true })
// Body text comes from the content slot when filled, else the placeholder "Content" text.
let body = instance.getSlot ? instance.getSlot('Swap for accordion content here') : undefined
if (!body) {
  const t = instance.findText('Content', { traverseInstances: true })
  body = t.type === 'TEXT' ? child(t.textContent) : ''
}

const size = instance.getEnum('Size', { Small: 'sm', Medium: 'md', Large: 'lg' })
const iconAlign = instance.getEnum('Icon alignment', { Leading: 'leading', Trailing: 'trailing' })
const flush = instance.getEnum('Flush', { True: true, False: false })
const value = 'item-1'

export default {
  example: figma.code`<Accordion type="single" collapsible${expanded ? figma.code` defaultValue="${value}"` : ''}${size !== 'md' ? figma.code` size="${size}"` : ''}${iconAlign !== 'trailing' ? ' iconAlign="leading"' : ''}${flush ? ' flush' : ''}>
  <AccordionItem value="${value}"${disabled ? ' disabled' : ''}>
    <AccordionTrigger>${child(title)}</AccordionTrigger>
    <AccordionContent>${body}</AccordionContent>
  </AccordionItem>
</Accordion>`,
  imports: ['import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@techuiux/dga-ui"'],
  id: 'accordion',
  metadata: { nestable: true, props: { title: String(title), expanded: expanded ? 'true' : 'false' } },
}
