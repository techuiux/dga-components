// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=18632-730
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=CodeSnippet
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

const multi = instance.getEnum('Type', { 'Multi-Line': true, 'Single-Line': false })
const sidebar = multi ? instance.getBoolean('Show Sidebar') : false
// Code text is a plain layer, not a component property.
let code = ''
let lang = 'bash'
if (multi) {
  const t = instance.findText('Code')
  code = t.type === 'TEXT' ? t.textContent : ''
  lang = 'tsx'
} else {
  instance.findLayers((node) => {
    if (node.type === 'TEXT' && node.textContent.length > code.length) code = node.textContent
    return false
  })
}
// Multiple tabs in Figma become multiple `languages`; add the others in code.

export default {
  example: figma.code`<CodeSnippet
  languages={[{ value: "${lang}", label: "${lang}", code: ${JSON.stringify(String(code).replace(/\|$/gm, ''))} }]}${sidebar ? '' : multi ? figma.code`
  lineNumbers={false}` : ''}
/>`,
  imports: ['import { CodeSnippet } from "@techuiux/dga-ui"'],
  id: 'code-snippet',
  metadata: { nestable: true },
}
