// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=18697-19412
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Divider
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

const tone = instance.getEnum('Color', { Neutral: 'neutral', Primary: 'primary', White: 'white', 'Alpha-white': 'alpha-white' })
const vertical = instance.getEnum('Line Type', { Horizontal: false, Vertical: true })

export default {
  example: figma.code`<Divider${vertical ? ' orientation="vertical"' : ''}${tone !== 'neutral' ? figma.code` tone="${tone}"` : ''} />`,
  imports: ['import { Divider } from "@techuiux/dga-ui"'],
  id: 'divider',
  metadata: { nestable: true },
}
