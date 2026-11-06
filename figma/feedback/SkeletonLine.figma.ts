// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=26177-5977
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Skeleton
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))
const height = instance.getEnum('Size', { Large: 22, Small: 14 })

export default {
  example: figma.code`<Skeleton shape="text" height={${height}} />`,
  imports: ['import { Skeleton } from "@techuiux/dga-ui"'],
  id: 'skeleton-line',
  metadata: { nestable: true },
}
