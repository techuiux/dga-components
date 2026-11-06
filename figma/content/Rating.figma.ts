// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-69520
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Rating
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

// "Meduim" is the Figma spelling.
const size = instance.getEnum('Size', { Small: 'sm', Meduim: 'md', Medium: 'md', Large: 'lg' })
const brand = instance.getEnum('Brand', { yes: true, No: false })
// Count filled / half stars to get the shown value.
let value = 0
let half = false
let max = 0
instance.findLayers((node) => {
  if (node.type !== 'INSTANCE') return false
  const st = pv(node, 'State')
  if (st === undefined || pv(node, 'Style') === undefined) return false
  max++
  if (st === 'Selected' || st === 'Pressed') value++
  if (st === 'Half') { value += 0.5; half = true }
  return false
})

export default {
  example: figma.code`<Rating${value ? figma.code` defaultValue={${String(value)}}` : ''}${max && max !== 5 ? figma.code` max={${String(max)}}` : ''}${half ? ' allowHalf' : ''}${size !== 'md' ? figma.code` size="${size}"` : ''}${brand ? ' tone="brand"' : ''} aria-label="Rating" />`,
  imports: ['import { Rating } from "@techuiux/dga-ui"'],
  id: 'rating',
  metadata: { nestable: true },
}
