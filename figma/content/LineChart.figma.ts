// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=20470-1259
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=LineChart
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

// The Figma chart is a fixed illustration; data below is sample data.
export default {
  example: figma.code`<LineChart
  series={[{ label: "Series 1", data: [12, 19, 14, 22, 18, 26] }]}
  categories={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
/>`,
  imports: ['import { LineChart } from "@techuiux/dga-ui"'],
  id: 'line-chart',
  metadata: { nestable: true },
}
