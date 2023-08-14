import { elementFactory } from 'skruv'

const { skruvText, skruvHeader } = elementFactory

export default () => skruvText(
  skruvHeader({ name: 'content-type', value: 'text/plain' }),
`User-agent: *
Allow: /
`)
