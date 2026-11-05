// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-68350
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Step
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

// Figma "Progress Indicator" is one step. In code, steps sit inside
// <ProgressIndicator orientation="horizontal | vertical">, which draws the connectors
// (so "Next Step" needs no prop). The orientation is passed up in metadata.
const rtl = instance.getEnum('RTL', { no: false, yes: true })
const orientation = instance.getEnum('Alignment', { Horizontal: 'horizontal', Vertical: 'vertical' })
// "Upcomming" is the Figma spelling. Hover / Focused are live CSS states.
const state = instance.getEnum('State', { Current: 'current', Completed: 'completed', Upcomming: 'upcoming' })
const showName = instance.getBoolean('Show Step Name')
const showDesc = instance.getBoolean('Show Description')
const name = rtl ? instance.getString('Step Name AR') : instance.getString('Step Name EN')
const desc = rtl ? instance.getString('Step description AR') : instance.getString('Step Description Eng')

// The number lives on the nested "_StepperBase".
const base = instance.findInstance('_StepperBase')
const num = base.type === 'INSTANCE' ? pv(base, 'Step Number') : undefined
const stepAttr =
  num === undefined || num === ''
    ? ''
    : /^\d+$/.test(String(num))
      ? figma.code` step={${String(num)}}`
      : figma.code` step="${attr(num)}"`

const content =
  showName || showDesc
    ? figma.code`
  <StepContent>${showName ? figma.code`
    <StepTitle>${child(name)}</StepTitle>` : ''}${showDesc ? figma.code`
    <StepDescription>${child(desc)}</StepDescription>` : ''}
  </StepContent>`
    : ''

const names = ['Step', 'StepIndicator']
if (content) names.push('StepContent')
if (showName) names.push('StepTitle')
if (showDesc) names.push('StepDescription')

export default {
  example: figma.code`<Step state="${state}">
  <StepIndicator${stepAttr} />${content}
</Step>`,
  imports: ['import { ' + names.join(', ') + ' } from "@techuiux/dga-ui"'],
  id: 'progress-step',
  metadata: { nestable: true, props: { orientation, state } },
}
