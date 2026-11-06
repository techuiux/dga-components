// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-165937
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Footer
import figma from 'figma'
const instance = figma.selectedInstance

const rtl = instance.getEnum('RTL', { True: true, False: false })
const dark = instance.getEnum('Background Color', { Default: false, 'Dark green': true })
// "Breakpoint" is responsive in code. Link groups below are sample content.
const g = rtl ? 'روابط' : 'Links'
const l = rtl ? 'رابط' : 'Link'

export default {
  example: figma.code`<Footer${dark ? ' background="dark"' : ''}>
  <FooterNav>
    <FooterGroup label="${g}">
      <FooterLinks>
        <FooterLink href="#">${l} 1</FooterLink>
        <FooterLink href="#">${l} 2</FooterLink>
      </FooterLinks>
    </FooterGroup>
  </FooterNav>
</Footer>`,
  imports: ['import { Footer, FooterNav, FooterGroup, FooterLinks, FooterLink } from "@techuiux/dga-ui"'],
  id: 'footer',
  metadata: { nestable: false },
}
