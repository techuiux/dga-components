// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-148877
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=HeaderSubMenu
import figma from 'figma'
const instance = figma.selectedInstance

// Background / link style / full width are visual presets of the panel.
const items = []
instance.findConnectedInstances((n) => {
  if (n.codeConnectId() === 'header-sub-menu-item') items.push(figma.code`
    ${n.executeTemplate().example}`)
  return false
})

export default {
  example: figma.code`<HeaderSubMenu open={open} onClose={() => setOpen(false)}>
  <HeaderSubMenuGroup>${items}
  </HeaderSubMenuGroup>
</HeaderSubMenu>`,
  imports: ['import { HeaderSubMenu, HeaderSubMenuGroup } from "@techuiux/dga-ui"'],
  id: 'nav-header-sub-menu',
  metadata: { nestable: true },
}
