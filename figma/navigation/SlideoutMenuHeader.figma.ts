// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=23521-31454
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=SlideoutMenuHeader
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))

const rtl = instance.getEnum('RTL', { True: true, False: false })
const title = rtl ? instance.getString('Title AR') : instance.getString('Title Text')
const desc = rtl ? instance.getString('Description AR') : instance.getString('Description Text')
const showDesc = instance.getBoolean('Show Description')
const divider = instance.getBoolean('Show Divider')

// "Featured icon" wraps the icon in a brand disc; code takes just the icon.
let icon
if (instance.getBoolean('Show Featured icon')) {
  const featured = instance.findInstance('Featured icon')
  if (featured.type === 'INSTANCE') {
    const swap = featured.getInstanceSwap('🔀 Icon swap')
    if (swap && swap.type === 'INSTANCE' && swap.hasCodeConnect()) icon = swap.executeTemplate().example
  }
}

// The close button is always drawn in Figma, and showCloseButton defaults to true.
const header = figma.code`<SlideoutMenuHeader${icon ? figma.code` icon={${icon}}` : ''}>
  <SlideoutMenuTitle>${child(title)}</SlideoutMenuTitle>${showDesc ? figma.code`
  <SlideoutMenuDescription>${child(desc)}</SlideoutMenuDescription>` : ''}
</SlideoutMenuHeader>`

const names = ['SlideoutMenuHeader', 'SlideoutMenuTitle']
if (showDesc) names.push('SlideoutMenuDescription')
if (divider) names.push('SlideoutMenuSeparator')

export default {
  example: divider
    ? figma.code`<>
${header}
<SlideoutMenuSeparator />
</>`
    : header,
  imports: ['import { ' + names.join(', ') + ' } from "@techuiux/dga-ui"'],
  id: 'slideout-menu-header',
  metadata: { nestable: true },
}
