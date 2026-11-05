// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=3262-27949
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=DropdownItem
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))
const rtl = instance.getEnum('RTL', { True: true, False: false })
const type = instance.getEnum('Type', { 'Single Select': 'single', 'Multi Select': 'multi', 'Group label': 'group' })
const text = type === 'group'
  ? (instance.findText('Entered Text').textContent || 'Group')
  : (rtl ? instance.getString('Text AR') : instance.getString('Text EN'))
const value = text.toLowerCase().trim().replace(/\s+/g, '-')
const disabled = instance.getEnum('State', { Default: false, Hovered: false, Pressed: false, Focused: false, Disabled: true })
const divider = type !== 'group' && instance.getBoolean('Divider')

export default {
  example: type === 'group'
    ? figma.code`<DropdownGroup heading="${attr(text)}">{/* items */}</DropdownGroup>`
    : figma.code`<DropdownItem value="${attr(value)}"${disabled ? ' disabled' : ''}>${child(text)}</DropdownItem>${divider ? figma.code`
<DropdownSeparator />` : ''}`,
  imports: [type === 'group'
    ? 'import { DropdownGroup } from "@techuiux/dga-ui"'
    : divider ? 'import { DropdownItem, DropdownSeparator } from "@techuiux/dga-ui"' : 'import { DropdownItem } from "@techuiux/dga-ui"'],
  id: 'dropdown-item',
  metadata: { nestable: true, props: { value, text } },
}
