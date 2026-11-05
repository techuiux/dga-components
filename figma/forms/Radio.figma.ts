// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30195-23385
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Radio
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))

// Selected, Style and Read-only live on <RadioGroup> in code.
const selected = instance.getEnum('Selected', { True: true, False: false })
const variant = instance.getEnum('Style', { Primary: 'primary', Neutral: 'neutral' })
const readOnly = instance.getEnum('State', { Default: false, Hovered: false, Pressed: false, Focused: false, 'Read-only': true, Disabled: false })
const disabled = instance.getEnum('State', { Default: false, Hovered: false, Pressed: false, Focused: false, 'Read-only': false, Disabled: true })

export default {
  example: figma.code`<RadioGroup aria-label="Options"${variant !== 'primary' ? figma.code` variant="${attr(variant)}"` : ''}${selected ? ' defaultValue="option"' : ''}${readOnly ? ' readOnly' : ''}>
  <Radio value="option"${disabled ? ' disabled' : ''} />
</RadioGroup>`,
  imports: ['import { RadioGroup, Radio } from "@techuiux/dga-ui"'],
  id: 'radio',
  metadata: {
    nestable: true,
    props: { selected: selected ? 'true' : 'false', variant, readOnly: readOnly ? 'true' : 'false', disabled: disabled ? 'true' : 'false' },
  },
}
