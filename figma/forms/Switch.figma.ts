// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-69895
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Switch
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))

const on = instance.getEnum('On', { True: true, False: false })
const disabled = instance.getEnum('State', { Default: false, Hovered: false, Pressed: false, Focused: false, Disabled: true })
// Figma "Icon" (check mark in the thumb) has no code equivalent yet.

export default {
  example: figma.code`<Switch aria-label="Setting"${on ? ' defaultChecked' : ''}${disabled ? ' disabled' : ''} />`,
  imports: ['import { Switch } from "@techuiux/dga-ui"'],
  id: 'switch',
  metadata: { nestable: true, props: { on: on ? 'true' : 'false', disabled: disabled ? 'true' : 'false' } },
}
