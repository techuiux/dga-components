// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=26177-5878
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Skeleton
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))
// Heights 24 / 32 / 40px; "Long" fills 320px, "Short" widths come from the Figma variants.
const size = instance.getEnum('Size', { Small: 'sm', Medium: 'md', Large: 'lg' })
const long = instance.getEnum('width', { Long: true, Short: false })
const height = { sm: 24, md: 32, lg: 40 }[size]
const width = long ? 320 : { sm: 59, md: 75, lg: 90 }[size]

export default {
  example: figma.code`<Skeleton shape="rectangle" width={${width}} height={${height}} />`,
  imports: ['import { Skeleton } from "@techuiux/dga-ui"'],
  id: 'skeleton-rectangle',
  metadata: { nestable: true },
}
