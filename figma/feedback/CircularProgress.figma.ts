// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=17732-3370
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=CircularProgress
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))
const rtl = instance.getEnum('RTL', { Yes: true, No: false })
const size = instance.getEnum('Size', { '64px': 'sm', '80px': 'md', '120px': 'lg', '160px': 'xl', '200px': '2xl' })
const style = instance.getEnum('Style', { Primary: 'primary', Neutral: 'neutral', Success: 'success', Error: 'error' })
const variant = style === 'neutral' ? 'neutral' : 'primary'
const state = style === 'success' ? 'success' : style === 'error' ? 'error' : 'normal'
const parsed = parseInt(String(instance.getString('Percentage')).replace(/[^0-9]/g, ''), 10)
const value = Number.isFinite(parsed) ? parsed : state === 'success' ? 100 : 0
const showText = instance.getBoolean('Show Text')
const text = rtl ? instance.getString('Text AR') : instance.getString('Text EN')

export default {
  example: figma.code`<CircularProgress
  value={${value}}${size !== 'md' ? figma.code`
  size="${attr(size)}"` : ''}${variant !== 'primary' ? figma.code`
  variant="${attr(variant)}"` : ''}${state !== 'normal' ? figma.code`
  state="${attr(state)}"` : ''}${showText ? figma.code`
  description="${attr(text.trim())}"` : ''}
  showValue
  aria-label="Progress"
/>`,
  imports: ['import { CircularProgress } from "@techuiux/dga-ui"'],
  id: 'circular-progress',
  metadata: { nestable: true },
}
