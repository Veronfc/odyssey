import { Hono } from "hono";
import { postLobbySchema } from "../validation/lobby.schema";
import { ZodError } from 'zod'
import {zValidator} from '@hono/zod-validator'
import { HTTPException } from "hono/http-exception";

const lobbiesRoute = new Hono()
  .onError((error, context) => {
    if (error instanceof ZodError) {
      const formattedErrors = error.issues.map(issue => {return {
        field: issue.path[0],
        message: issue.message
      }})

      throw new HTTPException(400, {res: new Response(JSON.stringify(formattedErrors))})
    }

    console.error(error)
    throw new HTTPException(500, {message: "A server error has occurred"})
  })
  .post("/", zValidator('json', postLobbySchema, (result) => {if (!result.success) {throw result.error}}), context => {
    // TODO
    let body

    try {
      body = context.req.valid('json')
    } catch (error) {
      throw error
    }
    
    return context.json(body)
  })

export default lobbiesRoute