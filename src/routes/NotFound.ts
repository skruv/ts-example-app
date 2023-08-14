import { elementFactory } from 'skruv'
import HtmlView, { state } from './HtmlView'

const { div, h1 } = elementFactory

export default () => {
  state.title = 'Not found'
  return HtmlView(div({},
    h1({}, '404 - Could not find page!')
  ))
}
