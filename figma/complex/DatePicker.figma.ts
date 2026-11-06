// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-10582
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=DatePicker
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
// First / longest text layer inside a node (crosses nested instances).
const texts = (node) => node.findLayers((n) => n.type === 'TEXT', { traverseInstances: true }).map((n) => n.textContent)
const longest = (node) => texts(node).reduce((a, b) => (String(b).length > String(a).length ? b : a), '')

const rtl = instance.getEnum('RTL', { True: true, False: false })
const range = instance.getEnum('Range', { True: true, False: false })
// "Picker=True" is the open calendar; in code it opens from the field.
const label = rtl ? 'التاريخ' : 'Date'
const comp = range ? 'DateRangePicker' : 'DatePicker'

export default {
  example: figma.code`<${comp} label="${label}" />`,
  imports: ['import { ' + comp + ' } from "@techuiux/dga-ui"'],
  id: 'date-picker',
  metadata: { nestable: true },
}
