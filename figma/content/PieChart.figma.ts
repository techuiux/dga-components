// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=20335-723
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=PieChart
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
// First / longest text layer inside a node (crosses nested instances).
const texts = (node) => node.findLayers((n) => n.type === 'TEXT', { traverseInstances: true }).map((n) => n.textContent)
const longest = (node) => texts(node).reduce((a, b) => (String(b).length > String(a).length ? b : a), '')

// "Series N" is the number of slices; data below is sample data.
const n = instance.getEnum('Pie Chart', { 'Series 1': 1, 'Series 2': 2, Series3: 3, 'Series 4': 4, 'Series 5': 5, 'Series 6': 6 })
const donut = instance.getEnum('Hole', { True: true, False: false })
const palette = instance.getEnum('Style Color', { Brand: 'brand', Color: 'categorical' })
const slices = [40, 25, 15, 10, 6, 4].slice(0, n).map((v, i) => `{ label: "Item ${i + 1}", value: ${v} }`).join(', ')

export default {
  example: figma.code`<PieChart
  data={[${slices}]}${donut ? figma.code`
  donut` : ''}${palette !== 'categorical' ? figma.code`
  palette="${palette}"` : ''}
/>`,
  imports: ['import { PieChart } from "@techuiux/dga-ui"'],
  id: 'pie-chart',
  metadata: { nestable: true },
}
