// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=19902-6822
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
  return s && s.type === 'INSTANCE' && s.hasCodeConnect() ? s.executeTemplate().example : undefined
}
// First / longest text layer inside a node (crosses nested instances).
const texts = (node) => node.findLayers((n) => n.type === 'TEXT', { traverseInstances: true }).map((n) => n.textContent)
const longest = (node) => texts(node).reduce((a, b) => (String(b).length > String(a).length ? b : a), '')

const size = instance.getEnum('Size', { '40px': 'sm', '48px': 'sm', '64px': 'sm', '80px': 'md', '120px': 'lg' })
const variant = instance.getEnum('Style', { Primary: 'primary', Neutral: 'neutral', 'On-Color': 'primary' })
const step = instance.getEnum('Indicator', { '1 of 4': '1', '2 of 4': '2', '3 of 4': '3', '4 of 4': '4' })

export default {
  example: figma.code`<CircularProgress segments={4} value={${step}} max={4}${size !== 'md' ? figma.code` size="${size}"` : ''}${variant !== 'primary' ? figma.code` variant="${variant}"` : ''} aria-label="Step ${step} of 4" />`,
  imports: ['import { CircularProgress } from "@techuiux/dga-ui"'],
  id: 'circular-stepper',
  metadata: { nestable: true },
}
