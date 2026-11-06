// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=23711-197
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Skeleton
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))
// Each preset is built from the Skeleton Circle / Square / Rectangle / Line components,
// so render whichever of those it contains, in layer order.
const ids = ['skeleton-circle', 'skeleton-square', 'skeleton-rectangle', 'skeleton-line']
const parts = []
instance.findConnectedInstances((node) => {
  if (ids.indexOf(node.codeConnectId()) !== -1) {
    parts.push(figma.code`
  ${node.executeTemplate().example}`)
  }
  return false
})
const type = instance.getEnum('Type', {
  'Image Button and Text': 'image-button-text',
  'Icon and List': 'icon-list',
  'Image Content and Button': 'image-content-button',
  'Chart and Content': 'chart-content',
  'Image Profile Content and Button': 'image-profile-content-button',
})

export default {
  example: figma.code`<div aria-busy="true" aria-label="Loading" data-skeleton="${attr(type)}">${parts}
</div>`,
  imports: ['import { Skeleton } from "@techuiux/dga-ui"'],
  id: 'skeleton-component',
  metadata: { nestable: false },
}
