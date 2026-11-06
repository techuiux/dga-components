// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=7936-8133
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Pagination
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
// "Meduim" is the Figma spelling.
const size = instance.getEnum('Size', { Small: 'sm', Meduim: 'md', Medium: 'md', Large: 'lg' })

// Walk the row in layer order: arrow Buttons and private "_PaginationItem"s.
const slots = []
instance.findLayers((node) => {
  if (node.type !== 'INSTANCE') return false
  const overflow = pv(node, 'Overflow')
  if (overflow === 'Yes') slots.push({ kind: 'overflow' })
  else if (overflow === 'No') {
    slots.push({ kind: 'page', n: String(pv(node, 'Number') ?? ''), active: pv(node, 'State') === 'Current Page' })
  } else if (node.codeConnectId() === 'button') slots.push({ kind: 'arrow' })
  return false
})

let pages = slots.filter((s) => s.kind !== 'arrow')
const firstPage = slots.findIndex((s) => s.kind !== 'arrow')
const hasPrev = slots.some((s, i) => s.kind === 'arrow' && (firstPage === -1 || i < firstPage))
const hasNext = slots.some((s, i) => s.kind === 'arrow' && firstPage !== -1 && i > firstPage)
// Fallback when the layers can't be read.
if (pages.length === 0) pages = [1, 2, 3].map((n) => ({ kind: 'page', n: String(n), active: n === 1 }))

let usesOverflow = false
let usesEllipsis = false
const toNum = (s) => (s && s.kind === 'page' && /^\d+$/.test(s.n) ? Number(s.n) : undefined)
const items = pages.map((s, i) => {
  let body
  if (s.kind === 'overflow') {
    // Overflow opens a jump-to-page menu; list the hidden pages when the neighbours are numbers.
    const from = toNum(pages[i - 1])
    const to = toNum(pages[i + 1])
    if (from !== undefined && to !== undefined && to - from > 1) {
      const hidden = []
      for (let n = from + 1; n < to; n++) hidden.push(n)
      usesOverflow = true
      body = figma.code`<PaginationOverflow pages={[${hidden.join(', ')}]} onSelect={setPage}${rtl ? ' label="صفحات أخرى"' : ''} />`
    } else {
      usesEllipsis = true
      body = figma.code`<PaginationEllipsis />`
    }
  } else {
    body = figma.code`<PaginationLink href="#"${s.active ? ' isActive' : ''}>${child(s.n)}</PaginationLink>`
  }
  return figma.code`
    <PaginationItem>
      ${body}
    </PaginationItem>`
})

const names = ['Pagination', 'PaginationContent', 'PaginationItem', 'PaginationLink']
if (hasPrev) names.push('PaginationPrevious')
if (hasNext) names.push('PaginationNext')
if (usesOverflow) names.push('PaginationOverflow')
if (usesEllipsis) names.push('PaginationEllipsis')

export default {
  example: figma.code`<Pagination${size !== 'md' ? figma.code` size="${attr(size)}"` : ''}>
  <PaginationContent>${hasPrev ? figma.code`
    <PaginationItem>
      <PaginationPrevious href="#"${rtl ? ' label="السابق"' : ''} />
    </PaginationItem>` : ''}${items}${hasNext ? figma.code`
    <PaginationItem>
      <PaginationNext href="#"${rtl ? ' label="التالي"' : ''} />
    </PaginationItem>` : ''}
  </PaginationContent>
</Pagination>`,
  imports: ['import { ' + names.join(', ') + ' } from "@techuiux/dga-ui"'],
  id: 'pagination',
  metadata: { nestable: true },
}
