import { elementFactory } from 'skruv'
import { Link } from '../router'
const { ul, li } = elementFactory

export default ul(
  li(Link({ href: '/movies' }, 'movies')),
  li(Link({ href: '/movie/exampleMovie?thingy=' + Math.random().toString() }, 'exampleMovie')),
  li(Link({ href: '/this-does-not-exist' }, 'Non-existent page'))
)
