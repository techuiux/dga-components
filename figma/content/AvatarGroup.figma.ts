// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=5699-53727
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=AvatarGroup
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

// "Stacked=False" spaces the avatars out; upstream AvatarGroup always overlaps them.
const avatars = []
let size
instance.findConnectedInstances((node) => {
  if (node.codeConnectId() === 'avatar') {
    const r = node.executeTemplate()
    if (!size) size = r.metadata && r.metadata.props && r.metadata.props.size
    avatars.push(figma.code`
  ${r.example}`)
  }
  return false
})

export default {
  example: figma.code`<AvatarGroup${size && size !== 'md' ? figma.code` size="${size}"` : ''}>${avatars}
</AvatarGroup>`,
  imports: ['import { AvatarGroup } from "@techuiux/dga-ui"'],
  id: 'avatar-group',
  metadata: { nestable: true },
}
