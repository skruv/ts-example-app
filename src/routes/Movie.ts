import { elementFactory } from 'skruv'
import HtmlView, { state } from './HtmlView'
import { type RouteState } from '../router'

const { div, h1 } = elementFactory

export default (routeState: RouteState) => {
  state.title = routeState.query.thingy
  return HtmlView(div(
    h1('Movie')
  ))
}
