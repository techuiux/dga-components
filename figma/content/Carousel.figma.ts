// url=https://www.figma.com/design/VeuZVD7hKl4DZ6hShYHRqV/Components-Library--18th-September---Platforms-Code?node-id=17242-4306
// source=@dev-dga/react (re-exported by packages/ui/src/index.ts)
// component=Carousel
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
// First / longest text layer inside a node (crosses nested instances).
const texts = (node) => node.findLayers((n) => n.type === 'TEXT', { traverseInstances: true }).map((n) => n.textContent)
const longest = (node) => texts(node).reduce((a, b) => (String(b).length > String(a).length ? b : a), '')

const style = instance.getEnum('Style', { Dots: 'dots', Arrows: 'arrows', 'Dots Only': 'dots-only' })
const controls = style === 'arrows' ? 'arrows' : 'dots'
// Slides are your own content; three placeholders shown.

export default {
  example: style === 'dots-only'
    ? figma.code`<Carousel aria-label="Carousel">
  <CarouselViewport>{/* <CarouselSlide>…</CarouselSlide> */}</CarouselViewport>
  <CarouselDots />
</Carousel>`
    : figma.code`<Carousel aria-label="Carousel"${controls !== 'dots' ? figma.code` controls="${controls}"` : ''}>${controls === 'arrows' ? figma.code`
  <CarouselPrevious />` : ''}
  <CarouselViewport>
    <CarouselSlide>Slide 1</CarouselSlide>
    <CarouselSlide>Slide 2</CarouselSlide>
    <CarouselSlide>Slide 3</CarouselSlide>
  </CarouselViewport>${controls === 'arrows' ? figma.code`
  <CarouselNext />` : figma.code`
  <CarouselDots />`}
</Carousel>`,
  imports: style === 'dots-only'
    ? ['import { Carousel, CarouselViewport, CarouselDots } from "@techuiux/dga-ui"']
    : controls === 'arrows'
      ? ['import { Carousel, CarouselViewport, CarouselSlide, CarouselPrevious, CarouselNext } from "@techuiux/dga-ui"']
      : ['import { Carousel, CarouselViewport, CarouselSlide, CarouselDots } from "@techuiux/dga-ui"'],
  id: 'carousel',
  metadata: { nestable: true },
}
