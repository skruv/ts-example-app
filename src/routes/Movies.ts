import { elementFactory } from 'skruv'
import HtmlView, { state } from './HtmlView'

const { div, h1 } = elementFactory

export default () => {
  state.title = 'Movies'
  return HtmlView(div(
    h1('Movies')
  ))
}
