import { elementFactory } from 'skruv'

const { urlset, url, loc, lastmod } = elementFactory

export default () => urlset(
  url(
    loc('https://www.example.com/foo.html'),
    lastmod('2022-06-04')
  )
)
