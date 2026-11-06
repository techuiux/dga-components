// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=9261-7435
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=StructuredList
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
  return s && s.type === 'INSTANCE' ? s.executeTemplate().example : undefined
}
// First / longest text layer inside a node (crosses nested instances).
const texts = (node) => node.findLayers((n) => n.type === 'TEXT', { traverseInstances: true }).map((n) => n.textContent)
const longest = (node) => texts(node).reduce((a, b) => (String(b).length > String(a).length ? b : a), '')

const yn = { Yes: true, No: false }
const compact = instance.getEnum('Compact', yn)
const contained = instance.getEnum('Contained', yn)
const rowDivider = instance.getEnum('Row divider', yn)
const colDivider = instance.getEnum('Col divider', yn)
const selectable = instance.getEnum('Selectable', yn)

// Header cells: RTL-only instances with no nested instances. Rows: "Compact" without "State".
// Row cells: carry "State" / "Selected".
const heads = []
const rows = []
instance.findLayers((n) => {
  if (n.type !== 'INSTANCE') return false
  const keys = Object.keys(n.properties || {})
  if (pv(n, 'State') !== undefined) return false
  if (pv(n, 'Compact') !== undefined) {
    let selected = false
    let disabled = false
    const cells = n
      .findLayers((c) => c.type === 'INSTANCE' && pv(c, 'State') !== undefined)
      .map((c) => {
        if (pv(c, 'Selected') === 'Yes') selected = true
        if (String(pv(c, 'State')).indexOf('Disabled') === 0) disabled = true
        return figma.code`
        <StructuredListCell>${child(longest(c))}</StructuredListCell>`
      })
    rows.push(figma.code`
    <StructuredListRow${selected ? ' selected' : ''}${disabled ? ' disabled' : ''}>${cells}
    </StructuredListRow>`)
  } else if (keys.length <= 1 && n.findLayers((c) => c.type === 'INSTANCE').length === 0 && texts(n).length) {
    heads.push(figma.code`
      <StructuredListHead>${child(longest(n))}</StructuredListHead>`)
  }
  return false
}, { traverseInstances: true })

const attrs = figma.code`${compact ? ' compact' : ''}${contained ? ' contained' : ''}${rowDivider ? '' : ' rowDivider={false}'}${colDivider ? ' colDivider' : ''}${selectable ? ' selectable' : ''}`

export default {
  example: figma.code`<StructuredList${attrs}>
  <StructuredListHeader>
    <tr>${heads}
    </tr>
  </StructuredListHeader>
  <StructuredListBody>${rows}
  </StructuredListBody>
</StructuredList>`,
  imports: ['import { StructuredList, StructuredListHeader, StructuredListBody, StructuredListRow, StructuredListHead, StructuredListCell } from "@techuiux/dga-ui"'],
  id: 'structured-list',
  metadata: { nestable: true },
}
