// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=2508-25804
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Link
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))

const rtl = instance.getEnum('RTL', { True: true, False: false })
const text = rtl ? instance.getString('Link Text AR') : instance.getString('Link Text EN')
const tone = instance.getEnum('Style', { Primary: 'primary', Neutral: 'neutral', 'On-color': 'onColor' })
const size = instance.getEnum('Size', { Medium: 'md', Small: 'sm' })
const inline = instance.getEnum('Inline', { True: true, False: false })
// Hovered / Pressed / Focused / Visited are live CSS states, not props.
const disabled = instance.getEnum('State', {
  Default: false,
  Hovered: false,
  Pressed: false,
  Focused: false,
  Visited: false,
  Disabled: true,
})

// The icon sits after the text in Figma, so it maps to endIcon.
let icon
if (instance.getBoolean('Icon')) {
  const swap = instance.getInstanceSwap('🔁 Swap Icon')
  if (swap && swap.type === 'INSTANCE' && swap.hasCodeConnect()) icon = swap.executeTemplate().example
}

export default {
  example: figma.code`<Link href="#"${tone !== 'primary' ? figma.code` tone="${attr(tone)}"` : ''}${size !== 'md' ? figma.code` size="${attr(size)}"` : ''}${inline ? ' inline' : ''}${disabled ? ' disabled' : ''}${icon ? figma.code` endIcon={${icon}}` : ''}>${child(text)}</Link>`,
  imports: ['import { Link } from "@techuiux/dga-ui"'],
  id: 'link',
  metadata: { nestable: true, props: { text: String(text) } },
}
