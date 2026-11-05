// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30186-53826
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Checkbox
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))

const checked = instance.getEnum('Checked', { True: true, False: false })
const indeterminate = instance.getEnum('Indeterminate', { True: true, False: false })
const state = indeterminate ? 'indeterminate' : checked ? 'true' : 'false'
const size = instance.getEnum('Size', { Medium: 'md', Small: 'sm', 'x Small': 'xs' })
const variant = instance.getEnum('Style', { Primary: 'primary', Neutral: 'neutral' })
const readOnly = instance.getEnum('State', { Default: false, Hovered: false, Pressed: false, Focused: false, 'Read-only': true, Disabled: false })
const disabled = instance.getEnum('State', { Default: false, Hovered: false, Pressed: false, Focused: false, 'Read-only': false, Disabled: true })

const attrs = figma.code`${state === 'indeterminate' ? ' defaultChecked="indeterminate"' : state === 'true' ? ' defaultChecked' : ''}${variant !== 'primary' ? figma.code` variant="${attr(variant)}"` : ''}${size !== 'md' ? figma.code` size="${attr(size)}"` : ''}${readOnly ? ' readOnly' : ''}${disabled ? ' disabled' : ''}`

export default {
  example: figma.code`<Checkbox aria-label="Option"${attrs} />`,
  imports: ['import { Checkbox } from "@techuiux/dga-ui"'],
  id: 'checkbox',
  metadata: {
    nestable: true,
    props: { state, variant, size, readOnly: readOnly ? 'true' : 'false', disabled: disabled ? 'true' : 'false' },
  },
}
