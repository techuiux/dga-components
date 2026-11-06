// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=23360-17219
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=SlideoutMenu
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

const rtl = instance.getEnum('RTL', { True: true, False: false })
const background = instance.getEnum('Background Color', { White: 'white', Gray: 'gray' })
const custom = instance.getEnum('Style', { Default: false, 'Custom Style': true })
// "Scroll Bar" and "Border" are drawing aids; the panel scrolls and borders itself.

let header = ''
if (instance.getBoolean('Nav Header')) {
  const h = instance.findConnectedInstance('slideout-menu-header')
  if (h.type === 'INSTANCE') header = figma.code`
    ${h.executeTemplate().example}`
}

// Default style: "Text" layers are group labels, "Menu list item"s are rows, in layer order.
// Rows render as SlideoutMenuItem (not the dropdown's DropdownMenuItem).
const itemCode = (node) => {
  const label = pv(node, pv(node, 'RTL') === 'True' ? 'Label AR' : 'Label EN') ?? ''
  const active = pv(node, 'State') === 'Selected'
  let icon
  if (pv(node, 'Lead Icon') === true) {
    const swap = node.getInstanceSwap('🔁 Swap Lead icon')
    if (swap && swap.type === 'INSTANCE' && swap.hasCodeConnect()) icon = swap.executeTemplate().example
  }
  let trailing = ''
  const trail = pv(node, 'Trail element')
  if (trail === 'Text' && pv(node, 'Show Trail Text') === true) {
    trailing = figma.code` trailing="${attr(pv(node, 'Trail Text') ?? '')}"`
  } else if (trail === 'Icon') {
    const swap = node.getInstanceSwap('🔁 Swap Trail Icon')
    if (swap && swap.type === 'INSTANCE' && swap.hasCodeConnect()) trailing = figma.code` trailing={${swap.executeTemplate().example}}`
  } else if (trail === 'Tag') {
    const n = node.findInstance('Tag')
    if (n.type === 'INSTANCE' && n.hasCodeConnect()) trailing = figma.code` trailing={${n.executeTemplate().example}}`
  }
  // Trail "Button" / "Switch" are left out: SlideoutMenuItem is itself a <button>,
  // and a button inside a button is invalid HTML. Put that action next to the row instead.
  return figma.code`
        <SlideoutMenuItem${icon ? figma.code` icon={${icon}}` : ''}${trailing}${active ? ' active' : ''}>${child(label)}</SlideoutMenuItem>`
}

let body
if (custom) {
  const swap = instance.getInstanceSwap('Swap Custom Content')
  body =
    swap && swap.type === 'INSTANCE' && swap.hasCodeConnect()
      ? figma.code`
      ${swap.executeTemplate().example}`
      : figma.code`
      {/* Your content */}`
} else {
  const groups = []
  instance.findLayers((node) => {
    if (node.type === 'TEXT' && node.name === 'Text') groups.push({ label: node.textContent, items: [] })
    else if (node.type === 'INSTANCE' && pv(node, 'Trail element') !== undefined) {
      if (groups.length === 0) groups.push({ label: '', items: [] })
      groups[groups.length - 1].items.push(itemCode(node))
    }
    return false
  })
  body = groups.map(
    (g) => figma.code`
      <SlideoutMenuGroup${g.label ? figma.code` label="${attr(g.label)}"` : ''}>${g.items}
      </SlideoutMenuGroup>`,
  )
}

const divider = instance.getBoolean('Show Divider')
const actions = []
if (instance.getBoolean('Show Actions')) {
  instance.findConnectedInstances((node) => {
    if (node.codeConnectId() === 'button') actions.push(figma.code`
      ${node.executeTemplate().example}`)
    return false
  })
}

const names = ['Button', 'SlideoutMenu', 'SlideoutMenuTrigger', 'SlideoutMenuContent', 'SlideoutMenuBody']
if (!custom) names.push('SlideoutMenuGroup', 'SlideoutMenuItem')
if (divider) names.push('SlideoutMenuSeparator')
if (actions.length) names.push('SlideoutMenuFooter')

export default {
  example: figma.code`<SlideoutMenu>
  <SlideoutMenuTrigger asChild>
    <Button variant="secondary-outline">${rtl ? 'القائمة' : 'Menu'}</Button>
  </SlideoutMenuTrigger>
  <SlideoutMenuContent${background !== 'gray' ? figma.code` background="${background}"` : ''}>${header}
    <SlideoutMenuBody>${body}
    </SlideoutMenuBody>${divider ? figma.code`
    <SlideoutMenuSeparator />` : ''}${actions.length ? figma.code`
    <SlideoutMenuFooter>${actions}
    </SlideoutMenuFooter>` : ''}
  </SlideoutMenuContent>
</SlideoutMenu>`,
  imports: ['import { ' + names.join(', ') + ' } from "@techuiux/dga-ui"'],
  id: 'slideout-menu',
  metadata: { nestable: false },
}
