// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=2962-38090
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=TableOfContents
import figma from 'figma'
const instance = figma.selectedInstance

// No TOC component upstream: a labelled <nav> list of TOC Item links, indented by heading level.
const rtl = instance.getEnum('RTL', { True: true, False: false })
const items = []
instance.findConnectedInstances((n) => {
  if (n.codeConnectId() === 'toc-item') {
    const r = n.executeTemplate()
    const lv = Number((r.metadata && r.metadata.props && r.metadata.props.level) || 1)
    items.push(figma.code`
    <li${lv > 1 ? figma.code` style={{ paddingInlineStart: ${(lv - 1) * 16} }}` : ''}>${r.example}</li>`)
  }
  return false
})

export default {
  example: figma.code`<nav aria-label="${rtl ? 'في هذه الصفحة' : 'On this page'}">
  <ul role="list">${items}
  </ul>
</nav>`,
  imports: ['import { Link } from "@techuiux/dga-ui"'],
  id: 'toc',
  metadata: { nestable: false },
}
