// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-125364
// source=packages/ui/src/tabs/Tabs.tsx
// component=Tabs
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))

const size = instance.getEnum('Size', { Small: 'sm', Medium: 'md', Large: 'lg' })
const flush = instance.getEnum('Flush', { True: true, False: false })
const divider = instance.getBoolean('Divider')
// "Tab Icons" is a preset; each trigger carries its own icon.

const triggers = []
let defaultValue
let firstValue
instance.findConnectedInstances((node) => {
  if (node.codeConnectId() === 'tabs-trigger') {
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
  example: figma.code`<Tabs${size !== 'md' ? figma.code` size="${attr(size)}"` : ''}${defaultValue ? figma.code` defaultValue="${attr(defaultValue)}"` : ''}>
  <TabsList${flush ? ' flush' : ''}${divider ? '' : ' divider={false}'}>${triggers}
  </TabsList>
</Tabs>`,
  imports: ['import { Tabs, TabsList } from "@techuiux/dga-ui"'],
  id: 'tabs',
  metadata: { nestable: true },
}
