// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=5698-40875
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Table
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
// Icon from an instance-swap property (undefined when the swap is empty).
const swapIcon = (node, name) => {
  const s = node.getInstanceSwap(name)
  return s && s.type === 'INSTANCE' && s.hasCodeConnect() ? s.executeTemplate().example : undefined
}
// First / longest text layer inside a node (crosses nested instances).
const texts = (node) => node.findLayers((n) => n.type === 'TEXT', { traverseInstances: true }).map((n) => n.textContent)
const longest = (node) => texts(node).reduce((a, b) => (String(b).length > String(a).length ? b : a), '')

const compact = instance.getEnum('Compact', { True: true, False: false })
const striped = instance.getEnum('Alternating rows', { True: true, False: false })
const contained = instance.getEnum('Contained', { True: true, False: false })
const imports = new Set(['Table', 'TableHeader', 'TableBody', 'TableRow', 'TableHead', 'TableCell'])

// Cells are private instances: header cells have "Type" only, row cells "Type" + "Compact".
const cellCode = (cell, head) => {
  const type = pv(cell, 'Type')
  const text = longest(cell)
  if (type === 'Checkbox') { imports.add('Checkbox'); return figma.code`<Checkbox aria-label="${head ? 'Select all' : 'Select row'}" />` }
  if (head) return child(text)
  if (type === 'Link') { imports.add('Link'); return figma.code`<Link href="#">${child(text)}</Link>` }
  if (type === 'Badge' || type === 'Status') { imports.add('StatusTag'); return figma.code`<StatusTag tone="success" status="subtle">${child(text)}</StatusTag>` }
  if (type === 'Switch') { imports.add('Switch'); return figma.code`<Switch aria-label="Toggle" />` }
  if (type === 'Default' || type === 'Input field' || type === 'Custom') return child(text)
  return figma.code`{/* ${type} */}`
}
const headCode = (cell) => {
  let sort
  cell.findLayers((n) => {
    if (n.type === 'INSTANCE' && pv(n, 'Sort') !== undefined) sort = pv(n, 'Sort')
    return false
  }, { traverseInstances: true })
  const s = sort === undefined ? '' : figma.code` sortable sortLabel="Sort"${sort === 'Up' ? ' sortDirection="asc"' : sort === 'Down' ? ' sortDirection="desc"' : ''}`
  return figma.code`
        <TableHead${s}>${cellCode(cell, true)}</TableHead>`
}

const heads = []
const rows = []
instance.findLayers((n) => {
  if (n.type !== 'INSTANCE') return false
  const type = pv(n, 'Type')
  const cmp = pv(n, 'Compact')
  if (type !== undefined && cmp === undefined) heads.push(headCode(n))
  else if (type === undefined && cmp !== undefined) {
    const cells = n
      .findLayers((c) => c.type === 'INSTANCE' && pv(c, 'Type') !== undefined && pv(c, 'Compact') !== undefined)
      .map((c) => figma.code`
        <TableCell>${cellCode(c, false)}</TableCell>`)
    rows.push(figma.code`
      <TableRow>${cells}
      </TableRow>`)
  }
  return false
}, { traverseInstances: true })

export default {
  example: figma.code`<Table aria-label="Table"${compact ? ' size="sm"' : ''}${striped ? ' striped' : ''}${contained ? ' contained' : ''}>
  <TableHeader>
    <TableRow>${heads}
    </TableRow>
  </TableHeader>
  <TableBody>${rows}
  </TableBody>
</Table>`,
  imports: ['import { ' + [...imports].join(', ') + ' } from "@techuiux/dga-ui"'],
  id: 'table',
  metadata: { nestable: true },
}
