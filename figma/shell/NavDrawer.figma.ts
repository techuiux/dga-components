// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-160799
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Sidebar
import figma from 'figma'
const instance = figma.selectedInstance

const overlay = instance.getEnum('Overlay', { True: true, False: false })
// "Background Color" (White / Gray / Green) has no Sidebar prop; theme it with CSS.
let header
const rows = []
let sub = []
const flush = () => {
  if (sub.length) rows.push(figma.code`
      <SidebarMenuItem>
        <SidebarMenuSub>${sub}
        </SidebarMenuSub>
      </SidebarMenuItem>`)
  sub = []
}
instance.findConnectedInstances((n) => {
  const id = n.codeConnectId()
  if (id === 'nav-drawer-header') header = n.executeTemplate().example
  else if (id === 'nav-drawer-item') {
    const r = n.executeTemplate()
    if (r.metadata && r.metadata.props && r.metadata.props.level === '2') sub.push(figma.code`
          ${r.example}`)
    else {
      flush()
      rows.push(figma.code`
      ${r.example}`)
    }
  }
  return false
})
flush()

export default {
  example: figma.code`<SidebarProvider>
  <Sidebar${overlay ? ' collapsible="offcanvas"' : ''} aria-label="Navigation">${header ? figma.code`
    ${header}` : ''}
    <SidebarContent>
      <SidebarMenu>${rows}
      </SidebarMenu>
    </SidebarContent>
  </Sidebar>
</SidebarProvider>`,
  imports: ['import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuSub } from "@techuiux/dga-ui"'],
  id: 'nav-drawer',
  metadata: { nestable: false },
}
