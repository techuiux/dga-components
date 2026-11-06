// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30146-37020
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=FileUpload
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
const state = instance.getEnum('State', { Default: 'default', Disabled: 'disabled', Uploaded: 'uploaded' })
// Wire `files` / `onFilesAdded` to your state; "Uploaded" just means files is non-empty.

export default {
  example: figma.code`<FileUpload
  variant="button"
  label="${rtl ? 'إرفاق ملف' : 'Attach file'}"
  files={files}
  onFilesAdded={addFiles}
  onRemove={removeFile}${state === 'disabled' ? figma.code`
  disabled` : ''}
/>`,
  imports: ['import { FileUpload } from "@techuiux/dga-ui"'],
  id: 'file-upload-single',
  metadata: { nestable: true },
}
