import type { SkruvHTMLFlowContentGroup } from 'skruv/utilityTypes'
import { elementFactory } from 'skruv'
import { createState } from 'skruv/utils/state.js'
import { cssTextGenerator, css } from 'skruv/utils/css.js'
import Menu from '../components/Menu'

const { html, head, body, title, meta, style, link, script, main } = elementFactory

const rootStyles = css`
body {
  color: red
}
`

export const state = createState({
  title: 'movies',
  description: '',
  a: {
    b: 'c'
  }
})

const HtmlView = (...children: SkruvHTMLFlowContentGroup[]) => html({ class: rootStyles },
  head(
    title(state.getGenerator('title')),
    meta({ name: 'viewport', content: 'width=device-width, initial-scale=1' }),
    style(cssTextGenerator),
    link({ rel: 'icon', href: '/icon.svg', type: 'image/svg+xml', sizes: 'any' }),
    meta(async function * () {
      for await (const currentState of state) {
        yield {
          name: 'description',
          content: currentState.description
        }
      }
    })
  ),
  body(
    Menu,
    main({ skruvWaitForNotEmpty: true }, children),
    script({ type: 'module' }, globalThis.skruvSSRScript ?? '')
  )
)

export default HtmlView
