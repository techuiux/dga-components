// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-125364
// source=@dev-dga/react (dist/index.d.ts → TabsProps, TabsListProps)
// component=Tabs
import figma from 'figma'
const instance = figma.selectedInstance

const size = instance.getEnum('Size', { Small: 'sm', Medium: 'md', Large: 'lg' })
const flush = instance.getEnum('Flush', { True: true, False: false })
// "Tab Icons" is a display preset; icons come through each child trigger.
// "Divider" has no prop: the list rule is built into tabs.css.

// Collect every connected Horizontal Tab, in layer order.
const triggers = []
let defaultValue
let i = 0
instance.findConnectedInstances((node) => {
  if (node.codeConnectId() === 'tabs-trigger') {
    const result = node.executeTemplate()
    if (i === 0) defaultValue = result.metadata?.props?.value
    triggers.push(figma.code`
    ${result.example}`)
    i++
  }
  return false
})

export default {
  example: figma.code`<Tabs size="${size}"${defaultValue ? figma.code` defaultValue="${defaultValue}"` : ''}>
  <TabsList${flush ? ' flush' : ''}>${triggers}
  </TabsList>
</Tabs>`,
  imports: ['import { Tabs, TabsList } from "@dev-dga/react"'],
  id: 'tabs',
  metadata: { nestable: true },
}
