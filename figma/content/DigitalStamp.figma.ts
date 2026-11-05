// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=11336-1177
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=DigitalStamp
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

// All copy is built into DigitalStamp (Arabic when DgaUiProvider dir="rtl").
const opened = instance.getEnum('Opened', { yes: true, no: false })
// "Device" is responsive in code; no prop needed.
let ext
instance.findLayers((node) => {
  if (!ext && node.type === 'INSTANCE') {
    const e = pv(node, 'Extension')
    if (e) ext = String(e).replace(/^\./, '')
  }
  return false
}, { traverseInstances: true })

export default {
  example: figma.code`<DigitalStamp${ext && ext !== 'gov.sa' ? figma.code` extension="${attr(ext)}"` : ''} registrationNumber="00000000"${opened ? ' defaultOpen' : ''} />`,
  imports: ['import { DigitalStamp } from "@techuiux/dga-ui"'],
  id: 'digital-stamp',
  metadata: { nestable: true },
}
