// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=19896-813
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=CircularProgress
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

// Radial Stepper = a segmented ring plus "Step x of y" text.
const size = instance.getEnum('Size', { '40px': 'sm', '48px': 'sm', '64px': 'sm', '80px': 'md', '120px': 'lg' })
const variant = instance.getEnum('Style', { Primary: 'primary', Neutral: 'neutral' })
const label = longest(instance)
const m = String(label).match(/(\d+)\D+(\d+)/)
const current = m ? m[1] : '1'
const total = m ? m[2] : '4'

export default {
  example: figma.code`<CircularProgress
  segments={${total}}
  value={${current}}
  max={${total}}${size !== 'md' ? figma.code`
  size="${size}"` : ''}${variant !== 'primary' ? figma.code`
  variant="${variant}"` : ''}
  description="${attr(label)}"
  aria-label="${attr(label)}"
/>`,
  imports: ['import { CircularProgress } from "@techuiux/dga-ui"'],
  id: 'radial-stepper',
  metadata: { nestable: true },
}
