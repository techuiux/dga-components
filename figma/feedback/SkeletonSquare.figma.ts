// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=26177-5624
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Skeleton
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))
const px = instance.getEnum('Size', { '240px': 240, '170px': 170, '120px': 120, '80px': 80, '64px': 64, '48px': 48, '24px': 24 })

export default {
  example: figma.code`<Skeleton shape="square" width={${px}} height={${px}} />`,
  imports: ['import { Skeleton } from "@techuiux/dga-ui"'],
  id: 'skeleton-square',
  metadata: { nestable: true },
}
