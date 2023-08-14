import type { SkruvAHTMLAttributes, SkruvHTMLPhrasingContentGroup } from 'skruv/utilityTypes'
import { createState } from 'skruv/utils/state.js'
import { elementFactory } from 'skruv'
const { a } = elementFactory

addEventListener('popstate', () => {
  urlState.url = location.href
})

export const urlState = createState({ url: location.href })

export const matches = (url: string | URL) => new URL(url, location.href).toString() === location.href

export async function * Link (attributes: SkruvAHTMLAttributes & { href: string, class?: string }, ...children: SkruvHTMLPhrasingContentGroup[]) {
  for await (const state of urlState) {
    yield a({
      // TODO: Async attributes are iffy here. Wrap in something that checks for generators/promises or require that a raw attributes object is passed in.
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      ...attributes,
      href: attributes.href,
      class: ((attributes.class ?? '') + (matches(attributes.href) ? ' active' : '')).trim(),
      onclick: e => {
        const newUrl = new URL(e.currentTarget.href)
        const oldUrl = new URL(state.url)
        if (!(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && newUrl.host === oldUrl.host) {
          e.preventDefault()
          if (newUrl.toString() !== oldUrl.toString()) {
            state.url = newUrl.toString()
            history.pushState({}, '', newUrl)
          }
        }
      }
    }, children)
  }
}

export interface RouteState {
  route: string
  routeArguments: Record<string, string>
  query: Record<string, string>
}

export async function * Router<T> (routes: T & Record<string, T[keyof T] & ((routeState: RouteState) => any)>): AsyncGenerator<T[keyof T]> {
  for await (const state of urlState) {
    const routeState: RouteState = {
      route: '',
      routeArguments: {},
      query: {}
    }
    let component
    const url = new URL(state.url)
    Object.keys(routes).forEach(path => {
      const match = url.pathname.match(new RegExp(path))
      const groups = ((match?.groups) != null) || {}
      if ((match != null) && (Object.keys(groups).length > Object.keys(routeState.routeArguments).length || path.length > routeState.route.length)) {
        routeState.route = path
        routeState.routeArguments = groups
        component = routes[path]
      }
    })
    if (component == null) {
      component = routes['']
    }
    url.searchParams.forEach((value, key) => {
      routeState.query[key] = value
    })
    yield component(routeState)
  }
}
