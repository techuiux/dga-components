// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=5698-11136
// source=packages/ui/src/spinner/Spinner.tsx
// component=Spinner
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))
const size = instance.getEnum('Size', {
  'xx Small': 'xxs', 'x Small': 'xs', Small: 'sm', Medium: 'md', Large: 'lg', 'x Large': 'xl', 'xx Large': 'xxl',
})
const tone = instance.getEnum('Style', { Neutral: 'neutral', Primary: 'primary', 'On-Color': 'onColor' })
// "Indicator" is an animation frame, not a prop.

export default {
  example: figma.code`<Spinner${size !== 'md' ? figma.code` size="${attr(size)}"` : ''} tone="${attr(tone)}" aria-label="Loading" />`,
  imports: ['import { Spinner } from "@techuiux/dga-ui"'],
  id: 'spinner',
  metadata: { nestable: true },
}
