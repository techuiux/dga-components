// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=5699-53529
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Avatar
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

const type = instance.getEnum('Type', { Image: 'image', Initials: 'initials', Icon: 'icon' })
const square = instance.getEnum('Square', { True: true, False: false })
// Figma px sizes map 1:1 to upstream's size scale.
const size = instance.getEnum('Size', { '24px': 'xs', '32px': 'sm', '40px': 'md', '48px': 'lg', '64px': 'xl', '80px': '2xl', '120px': '3xl' })
const initials = type === 'initials' ? instance.getString('Text EN') : ''
const icon = type === 'icon' ? swapIcon(instance, '🔁 Swap Icon') : undefined
// "Border" is the 3xl ring upstream draws automatically.

const attrs = figma.code`${size !== 'md' ? figma.code` size="${size}"` : ''}${square ? ' shape="square"' : ''}`
const inner =
  type === 'image'
    ? figma.code`
  <AvatarImage src="/avatar.jpg" alt="" />
  <AvatarFallback />`
    : type === 'icon'
      ? figma.code`
  <AvatarFallback>${icon ? icon : ''}</AvatarFallback>`
      : figma.code`
  <AvatarFallback>${child(initials)}</AvatarFallback>`

export default {
  example: figma.code`<Avatar${attrs}>${inner}
</Avatar>`,
  imports: ['import { Avatar, AvatarImage, AvatarFallback } from "@techuiux/dga-ui"'],
  id: 'avatar',
  metadata: { nestable: true, props: { size } },
}
