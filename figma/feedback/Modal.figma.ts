// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=30150-55001
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Modal
import figma from 'figma'
const instance = figma.selectedInstance
// Escape designer-entered text so snippets stay valid JSX.
const attr = (s) => String(s).replace(/"/g, '&quot;')
const child = (s) => (/[{}<>]/.test(String(s)) ? '{' + JSON.stringify(String(s)) + '}' : String(s))
// Content lives in private sub-components (_Modal Header / Body / Actions); read their layers.
const deep = { traverseInstances: true }
const titleLayer = instance.findText('Lead Text', deep)
const title = titleLayer && titleLayer.textContent ? titleLayer.textContent : 'Title'
const bodyLayer = instance.findText('Helper Text', deep)
const body = bodyLayer && bodyLayer.textContent ? bodyLayer.textContent : ''

// Action buttons are real Button instances, so they render through the Button template.
const action = (name) => {
  const node = instance.findInstance(name, deep)
  return node && node.type === 'INSTANCE' ? node.executeTemplate().example : undefined
}
const primary = action('Primary Action')
const secondary = action('Secondary Action')
const tertiary = action('Tertiary Action')
// "Mobile" is a responsive layout variant, not a prop.

export default {
  example: figma.code`<Modal>
  <ModalTrigger asChild>
    <Button>Open</Button>
  </ModalTrigger>
  <ModalContent>
    <ModalHeader>
      <ModalTitle>${child(title)}</ModalTitle>
    </ModalHeader>${body ? figma.code`
    <ModalBody>
      <ModalDescription>${child(body)}</ModalDescription>
    </ModalBody>` : ''}
    <ModalFooter>${tertiary ? figma.code`
      ${tertiary}` : ''}${secondary ? figma.code`
      <ModalClose asChild>
        ${secondary}
      </ModalClose>` : ''}${primary ? figma.code`
      ${primary}` : ''}
    </ModalFooter>
  </ModalContent>
</Modal>`,
  imports: ['import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalBody, ModalDescription, ModalFooter, ModalClose, Button } from "@techuiux/dga-ui"'],
  id: 'modal',
  metadata: { nestable: false },
}
