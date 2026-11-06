// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-148860
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=HeaderMenuButton
import figma from 'figma'
const instance = figma.selectedInstance

const opened = instance.getEnum('Opened', { True: true, False: false })

export default {
  example: figma.code`<HeaderMenuButton label="Menu" aria-expanded={${opened ? 'true' : 'false'}} />`,
  imports: ['import { HeaderMenuButton } from "@techuiux/dga-ui"'],
  id: 'header-menu-button',
  metadata: { nestable: true },
}
