import { serve } from "server";
import { graphql, shortcut } from './api.ts'

const GQL = new URLPattern({pathname: '/graphql'})
const GOTO = new URLPattern({pathname: '/:code'})
const INDEX = new URLPattern({pathname: '/'})

serve(async (req :Request) => {
  if (GQL.exec(req.url)) {
    return graphql(req)
  }
  if (INDEX.exec(req.url)) {
    return new Response("URL SHORTNER")
  }
  if (GOTO.exec(req.url)) {
    const code = GOTO.exec(req.url)?.pathname?.groups?.code
    if (code) {
      
      return Response.redirect(await shortcut(code))
    }
  }
  return new Response('Not Found', { status: 404})

});