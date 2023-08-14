import NotFound from './NotFound'
import Home from './Home'
import Movies from './Movies'
import Movie from './Movie'
import Actors from './Actors'
import Actor from './Actor'
import Robots from './Robots'
import Sitemap from './Sitemap'

export default {
  '^/movies/?$': Movies,
  '^/movie/(?<movie>[^/]*)$': Movie,
  '^/actors/?$': Actors,
  '^/actor/(?<actor>[^/]*)$': Actor,
  '^/$': Home,
  '^/robots.txt$': Robots,
  '^/sitemap.xml$': Sitemap,
  '': NotFound
}
