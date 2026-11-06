// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=18800-8281
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=SecondNavHeader
import figma from 'figma'
const instance = figma.selectedInstance

const primary = instance.getEnum('Style', { Gray: false, Primary: true })
const items = []
instance.findConnectedInstances((n) => {
  if (n.codeConnectId() === 'second-nav-item') items.push(figma.code`
    ${n.executeTemplate().example}`)
  return false
})

export default {
  example: figma.code`<SecondNavHeader${primary ? ' background="primary"' : ''}>
  <SecondNavHeaderItems>${items}
  </SecondNavHeaderItems>
</SecondNavHeader>`,
  imports: ['import { SecondNavHeader, SecondNavHeaderItems } from "@techuiux/dga-ui"'],
  id: 'second-nav-header',
  metadata: { nestable: true },
}
