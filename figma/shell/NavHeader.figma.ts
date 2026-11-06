// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-148751
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Header
import figma from 'figma'
const instance = figma.selectedInstance

const fullWidth = instance.getEnum('Full-width', { True: true, False: false })
// "Breakpoint" is responsive in code.
const brand = []
const nav = []
const actions = []
let menuButton
instance.findConnectedInstances((n) => {
  const id = n.codeConnectId()
  const ex = n.executeTemplate().example
  if (id === 'logo-placeholder') brand.push(ex)
  else if (id === 'header-menu-item') nav.push(figma.code`
    ${ex}`)
  else if (id === 'header-action') actions.push(figma.code`
    ${ex}`)
  else if (id === 'header-menu-button') menuButton = ex
  return false
})

export default {
  example: figma.code`<Header${fullWidth ? ' fullWidth' : ''}>${menuButton ? figma.code`
  ${menuButton}` : ''}
  <HeaderBrand>${brand.length ? brand[0] : figma.code`<LogoPlaceholder label="Logo" />`}</HeaderBrand>
  <HeaderNav>${nav}
  </HeaderNav>
  <HeaderActions>${actions}
  </HeaderActions>
</Header>`,
  imports: ['import { Header, HeaderBrand, HeaderNav, HeaderActions, LogoPlaceholder } from "@techuiux/dga-ui"'],
  id: 'nav-header',
  metadata: { nestable: false },
}
