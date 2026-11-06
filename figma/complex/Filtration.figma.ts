// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-36683
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Filtration
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

const rtl = instance.getEnum('RTL', { Yes: true, No: false })
const open = instance.getEnum('Open', { Yes: true, No: false })
// "Placement" is where the panel docks next to the trigger; upstream positions it.
// "Result" shows the filtered-results area; render your results next to the panel.
const label = rtl ? 'تصفية' : 'Filter'

export default {
  example: figma.code`<Filtration${open ? ' defaultOpen' : ''}>
  <FiltrationTrigger>${label}</FiltrationTrigger>
  <FiltrationPanel aria-label="${rtl ? 'عوامل التصفية' : 'Filters'}">
    <FiltrationSection label="${rtl ? 'الفئة' : 'Category'}">
      <FiltrationCheckboxFilter
        options={[
          { value: "a", label: "${rtl ? 'خيار ١' : 'Option 1'}" },
          { value: "b", label: "${rtl ? 'خيار ٢' : 'Option 2'}" },
        ]}
      />
    </FiltrationSection>
  </FiltrationPanel>
</Filtration>`,
  imports: ['import { Filtration, FiltrationTrigger, FiltrationPanel, FiltrationSection, FiltrationCheckboxFilter } from "@techuiux/dga-ui"'],
  id: 'filtration',
  metadata: { nestable: true },
}
