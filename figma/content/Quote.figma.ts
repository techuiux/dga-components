// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-69027
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Quote
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

const rtl = instance.getEnum('RTL', { Yes: true, No: false })
const size = instance.getEnum('Size', { Small: 'sm', Large: 'lg' })
const white = instance.getEnum('White Background', { Yes: true, No: false })
const s = (en, ar) => (rtl ? instance.getString(ar) : instance.getString(en))
const title = instance.getBoolean('Show Quote Title') ? s('Quote Title EN', 'Quote Title AR') : undefined
const text = instance.getBoolean('Show Description') ? s('Quote Description EN', 'Quote Description AR') : ''
const showAuthor = instance.getBoolean('Show Author Details')
const author = s('Author Name EN', 'Author Name AR')
const authorTitle = s('Author Title EN', 'Author Title AR')
const avatar = instance.getBoolean('Show Avatar')

const attrs = figma.code`${size !== 'lg' ? figma.code` size="${size}"` : ''}${white ? ' whiteBackground' : ''}${title !== undefined ? figma.code`
  quoteTitle="${attr(title)}"` : ''}${showAuthor ? figma.code`
  author="${attr(author)}"
  authorTitle="${attr(authorTitle)}"` : ''}${avatar ? figma.code`
  avatar={<Avatar size="2xl"><AvatarImage src="/author.jpg" alt="" /><AvatarFallback /></Avatar>}` : ''}`

export default {
  example: figma.code`<Quote${attrs}
>
  ${child(text)}
</Quote>`,
  imports: avatar
    ? ['import { Quote, Avatar, AvatarImage, AvatarFallback } from "@techuiux/dga-ui"']
    : ['import { Quote } from "@techuiux/dga-ui"'],
  id: 'quote',
  metadata: { nestable: true },
}
