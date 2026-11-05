// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=5698-2597
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Breadcrumb
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

const rtl = instance.getEnum('RTL', { True: true, False: false })
const TYPES = ['Root', 'Middle', 'Current', 'Middle-overflow', 'Middle-overflow open']

// Each crumb is a private "_Breadcrumb Item"; read its type and label in layer order.
const crumbs = instance
  .findLayers((node) => node.type === 'INSTANCE' && TYPES.indexOf(pv(node, 'Type')) !== -1)
  .map((node) => {
    const type = pv(node, 'Type')
    if (type.indexOf('overflow') !== -1) return { kind: 'overflow' }
    let text
    if (type !== 'Current') {
      const link = node.findInstance('Link')
      if (link.type === 'INSTANCE') text = pv(link, pv(link, 'RTL') === 'True' ? 'Link Text AR' : 'Link Text EN')
    }
    if (text === undefined) {
      const t = node.findText('Entered Text', { traverseInstances: true })
      if (t.type === 'TEXT') text = t.textContent
    }
    return { kind: type === 'Current' ? 'page' : 'link', text: text ?? '' }
  })

// Fallback when the layers can't be read: placeholder crumbs from "Levels".
if (crumbs.length === 0) {
  const levels = instance.getEnum('Levels', { '2': 2, '3': 3, '4': 4, '5': 5, '>5': 6 })
  const home = rtl ? 'الرئيسية' : 'Home'
  const page = (i) => (rtl ? 'صفحة ' : 'Page ') + i
  crumbs.push({ kind: 'link', text: home })
  if (levels > 5) crumbs.push({ kind: 'overflow' })
  for (let i = levels > 5 ? levels - 3 : 2; i < levels; i++) crumbs.push({ kind: 'link', text: page(i) })
  crumbs.push({ kind: 'page', text: page(levels) })
}

const parts = crumbs.map((c, i) => {
  const sep = i < crumbs.length - 1 ? figma.code`
    <BreadcrumbSeparator />` : ''
  const body =
    c.kind === 'overflow'
      ? figma.code`<BreadcrumbEllipsisTrigger />`
      : c.kind === 'page'
        ? figma.code`<BreadcrumbPage>${child(c.text)}</BreadcrumbPage>`
        : figma.code`<BreadcrumbLink href="#">${child(c.text)}</BreadcrumbLink>`
  return figma.code`
    <BreadcrumbItem>
      ${body}
    </BreadcrumbItem>${sep}`
})

export default {
  example: figma.code`<Breadcrumb>
  <BreadcrumbList>${parts}
  </BreadcrumbList>
</Breadcrumb>`,
  imports: [
    'import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsisTrigger } from "@techuiux/dga-ui"',
  ],
  id: 'breadcrumb',
  metadata: { nestable: true },
}
