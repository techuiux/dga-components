// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-165937
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Footer
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))
// Read a property from a nested (possibly unconnected) instance; undefined when absent.
const pv = (node, name) => {
  const v = node.getPropertyValue(name)
  return v !== null && typeof v === 'object' ? undefined : v
}
// Icon code from an instance-swap property, when the icon is mapped (Icons library -> Hugeicons).
const swapIcon = (node, name) => {
  const s = node.getInstanceSwap(name)
  return s && s.type === 'INSTANCE' && s.hasCodeConnect() ? s.executeTemplate().example : undefined
}
// First mapped icon nested in a node (for icon slots without a swap property).
const iconIn = (node) => {
  const i = node.findLayers((n) => n.type === 'INSTANCE' && n.hasCodeConnect() && n.codeConnectId() === 'icon')[0]
  return i ? i.executeTemplate().example : undefined
}

const rtl = instance.getEnum('RTL', { True: true, False: false })
const dark = instance.getEnum('Background Color', { Default: false, 'Dark green': true })
const showNav = instance.getBoolean('Nav links')
// "Breakpoint" is responsive in code.

// Walk the footer in layer order: group labels, links, social buttons, legal links, caption, extra links, logos.
const linkText = (n) => pv(n, pv(n, 'RTL') === 'True' ? 'Link Text AR' : 'Link Text EN') ?? ''
const groups = []
const social = []
const legal = []
const meta = []
const logos = []
let socialLabel
let caption
instance.findLayers((n) => {
  if (n.type === 'TEXT') {
    if (n.name === 'Group Label') groups.push({ label: n.textContent, links: [] })
    else if (n.name === 'Social Media') socialLabel = n.textContent
    else if (caption === undefined && legal.length) caption = n.textContent
  } else if (n.type === 'INSTANCE') {
    const id = n.hasCodeConnect() ? n.codeConnectId() : null
    if (id === 'logo-placeholder') logos.push(n.executeTemplate().example)
    else if (id === 'button') social.push(n.executeTemplate().example)
    else if (pv(n, 'Link Text EN') !== undefined) {
      const link = { text: linkText(n), inline: pv(n, 'Inline') === 'True' }
      if (link.inline) legal.push(link)
      else if (caption !== undefined) meta.push(link)
      else if (groups.length) groups[groups.length - 1].links.push(link)
    }
  }
  return false
})

const names = ['Footer', 'FooterLegal']
const nav = []
if (showNav && groups.length) {
  names.push('FooterNav', 'FooterGroup', 'FooterLinks', 'FooterLink')
  for (const g of groups) nav.push(figma.code`
    <FooterGroup label="${attr(g.label)}">
      <FooterLinks>${g.links.map((l) => figma.code`
        <FooterLink href="#">${child(l.text)}</FooterLink>`)}
      </FooterLinks>
    </FooterGroup>`)
}
if (showNav && social.length) {
  names.push('FooterGroup', 'FooterIcons')
  nav.push(figma.code`
    <FooterGroup label="${attr(socialLabel ?? (rtl ? 'وسائل التواصل' : 'Social media'))}">
      <FooterIcons>${social.map((b) => figma.code`
        ${b}`)}
      </FooterIcons>
    </FooterGroup>`)
}
const info = []
if (legal.length) {
  names.push('FooterLegalLinks', 'FooterLink')
  info.push(figma.code`
      <FooterLegalLinks>${legal.map((l) => figma.code`
        <FooterLink href="#" underline>${child(l.text)}</FooterLink>`)}
      </FooterLegalLinks>`)
}
if (caption !== undefined) {
  names.push('FooterCaption')
  info.push(figma.code`
      <FooterCaption>${child(caption)}</FooterCaption>`)
}
if (meta.length) {
  // FooterMeta is a plain row (no list), so its links are Link, not FooterLink.
  names.push('FooterMeta', 'Link')
  info.push(figma.code`
      <FooterMeta>${meta.map((l) => figma.code`
        <Link href="#" tone="neutral" size="sm">${child(l.text)}</Link>`)}
      </FooterMeta>`)
}
if (info.length) names.push('FooterLegalInfo')
if (logos.length) names.push('FooterLogos')

export default {
  example: figma.code`<Footer${dark ? ' background="dark"' : ''}>${nav.length ? figma.code`
  <FooterNav aria-label="${rtl ? 'روابط التذييل' : 'Footer'}">${nav}
  </FooterNav>` : ''}
  <FooterLegal>${info.length ? figma.code`
    <FooterLegalInfo>${info}
    </FooterLegalInfo>` : ''}${logos.length ? figma.code`
    <FooterLogos>${logos.map((l) => figma.code`
      ${l}`)}
    </FooterLogos>` : ''}
  </FooterLegal>
</Footer>`,
  imports: ['import { ' + [...new Set(names)].join(', ') + ' } from "@techuiux/dga-ui"'],
  id: 'footer',
  metadata: { nestable: false },
}
