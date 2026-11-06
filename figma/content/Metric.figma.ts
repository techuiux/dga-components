// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=19332-693
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Metric
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

const rtl = instance.getEnum('RTL', { True: true, False: false })
const layout = instance.getEnum('Style', { 'Small Chart': 'small', 'Large Chart': 'large' })
const label = rtl ? instance.getString('Label AR') : instance.getString('Label EN')
const value = instance.getString('Percentage')
const changeLabel = instance.getBoolean('Show Text') ? (rtl ? instance.getString('Text AR') : instance.getString('Text EN')) : undefined
const icon = instance.getBoolean('Show Featured icon') ? swapIcon(instance, 'Swap Featured Icon') : undefined

// Trend / change type / change text from the private "_Change" and chart parts.
let trend = 'up'
let changeType
let change
let chart = false
instance.findLayers((n) => {
  if (n.type !== 'INSTANCE') return false
  if (pv(n, 'Trend') !== undefined) {
    if (pv(n, 'Trend') === 'Negative') trend = 'down'
    if (pv(n, 'Type') === '01' || pv(n, 'Type') === '02') {
      changeType = pv(n, 'Type')
      change = longest(n)
    } else chart = true
  }
  return false
})
if (!instance.getBoolean('Show _Change')) change = undefined
if (!instance.getBoolean('Show Chart')) chart = false

// Icon-only Button = header action ("More"); the rest are footer actions.
let action
const footer = []
instance.findConnectedInstances((node) => {
  if (node.codeConnectId() !== 'button') return false
  const ex = node.executeTemplate().example
  if (pv(node, 'Icon only') === 'True') action = ex
  else footer.push(ex)
  return false
})
if (!instance.getBoolean('Show More Button')) action = undefined
if (!instance.getBoolean('Show Actions')) footer.length = 0

const names = ['Metric']
if (chart) names.push('MetricChart')

export default {
  example: figma.code`<Metric${layout !== 'small' ? ' layout="large"' : ''}${icon ? figma.code`
  icon={${icon}}` : ''}
  label="${attr(label)}"
  value="${attr(value)}"${change !== undefined ? figma.code`
  change="${attr(change)}"
  trend="${trend}"${changeType && changeType !== '01' ? figma.code` changeType="${changeType}"` : ''}` : ''}${changeLabel !== undefined ? figma.code`
  changeLabel="${attr(changeLabel)}"` : ''}${chart ? figma.code`
  chart={<MetricChart data={[4, 6, 5, 8, 7, 10]} trend="${trend}" />}` : ''}${action ? figma.code`
  action={${action}}` : ''}${footer.length ? figma.code`
  footer={<>${footer}</>}` : ''}
/>`,
  imports: ['import { ' + names.join(', ') + ' } from "@techuiux/dga-ui"'],
  id: 'metric',
  metadata: { nestable: true },
}
