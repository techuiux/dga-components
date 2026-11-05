// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=1188-65307
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
  return s && s.type === 'INSTANCE' ? s.executeTemplate().example : undefined
}

// Each row is an Accordion instance; rebuild them as items of one Accordion.
const items = []
let open
let i = 0
instance.findLayers((node) => {
  if (node.type === 'INSTANCE' && pv(node, 'Expanded') !== undefined && pv(node, 'Icon alignment') !== undefined) {
    i++
    const value = 'item-' + i
    const rtl = pv(node, 'RTL') === 'True'
    const title = pv(node, rtl ? 'Title AR' : 'Title EN') ?? ''
    if (!open && pv(node, 'Expanded') === 'True') open = value
    const t = node.findText('Content', { traverseInstances: true })
    const body = t.type === 'TEXT' ? child(t.textContent) : ''
    items.push(figma.code`
  <AccordionItem value="${value}">
    <AccordionTrigger>${child(title)}</AccordionTrigger>
    <AccordionContent>${body}</AccordionContent>
  </AccordionItem>`)
  }
  return false
})

export default {
  example: figma.code`<Accordion type="single" collapsible${open ? figma.code` defaultValue="${open}"` : ''}>${items}
</Accordion>`,
  imports: ['import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@techuiux/dga-ui"'],
  id: 'accordion-list',
  metadata: { nestable: true },
}
