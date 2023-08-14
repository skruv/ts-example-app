import { render, elementFactory } from 'skruv'
import { syncify, hydrationPromise } from 'skruv/utils/syncify.js'

import { Router } from './router'

import routes from './routes/index'

// TODO: Move this into a better place
// eslint-disable-next-line no-var
declare global { var skruvSSRScript: string | undefined }

const { skruvText } = elementFactory

// TODO: rename skruvText to skruvTransparent or similar
const dom = syncify(skruvText(Router(routes)))

const doRender = async () => {
  await hydrationPromise
  render(dom)
}

void doRender()

export default doRender
