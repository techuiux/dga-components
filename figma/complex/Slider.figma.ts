// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=18046-29577
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Slider
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

const range = instance.getEnum('Range', { Yes: true, No: false })
// "Persentage" (Figma spelling) is the shown value, e.g. "20" or "20 - 70".
const raw = String(instance.getPropertyValue('Persentage'))
const nums = raw.split('-').map((s) => Number(s.trim())).filter((n) => !isNaN(n))
const value = range ? figma.code`[${String(nums[0] ?? 0)}, ${String(nums[1] ?? 100)}]` : String(nums[0] ?? 0)

export default {
  example: figma.code`<Slider defaultValue={${value}} aria-label="Value" />`,
  imports: ['import { Slider } from "@techuiux/dga-ui"'],
  id: 'slider',
  metadata: { nestable: true },
}
