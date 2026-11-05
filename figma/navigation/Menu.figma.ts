// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30195-22214
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=DropdownMenu
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))

const rtl = instance.getEnum('RTL', { True: true, False: false })
const labelNode = instance.findText('Group Label')
const groupLabel = labelNode.type === 'TEXT' ? labelNode.textContent : ''

// Items are Menu list item instances, rendered with their own template.
const items = []
instance.findConnectedInstances((node) => {
  if (node.codeConnectId() === 'menu-item') {
    items.push(figma.code`
      ${node.executeTemplate().example}`)
  }
  return false
})

// The menu needs a trigger in code; Figma only draws the open panel.
const trigger = rtl ? 'خيارات' : 'Options'

export default {
  example: figma.code`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="secondary-outline">${trigger}</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuGroup>${groupLabel ? figma.code`
      <DropdownMenuLabel>${child(groupLabel)}</DropdownMenuLabel>` : ''}${items}
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>`,
  imports: [
    'import { Button, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel } from "@techuiux/dga-ui"',
  ],
  id: 'menu',
  metadata: { nestable: false },
}
