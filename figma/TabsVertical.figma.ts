// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=418-100259
// source=packages/ui/src/tabs/Tabs.tsx
// component=Tabs
import figma from 'figma'
const instance = figma.selectedInstance

const size = instance.getEnum('Size', { Small: 'sm', Medium: 'md', Large: 'lg' })

const triggers = []
let defaultValue
let firstValue
instance.findConnectedInstances((node) => {
  if (node.codeConnectId() === 'tabs-trigger-vertical') {
    const result = node.executeTemplate()
    const props = result.metadata?.props
    if (!firstValue) firstValue = props?.value
    if (!defaultValue && props?.selected === 'true') defaultValue = props?.value
    triggers.push(figma.code`
    ${result.example}`)
  }
  return false
})
defaultValue = defaultValue || firstValue

export default {
  example: figma.code`<Tabs orientation="vertical"${size !== 'md' ? figma.code` size="${size}"` : ''}${defaultValue ? figma.code` defaultValue="${defaultValue}"` : ''}>
  <TabsList>${triggers}
  </TabsList>
</Tabs>`,
  imports: ['import { Tabs, TabsList } from "@techuiux/dga-ui"'],
  id: 'tabs-vertical',
  metadata: { nestable: true },
}
