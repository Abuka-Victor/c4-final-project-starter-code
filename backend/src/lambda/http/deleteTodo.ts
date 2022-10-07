import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { deleteTodo } from '../../businessLogic/todos'
import { getUserId } from '../utils'

import { createLogger } from '../../utils/logger'

const logger = createLogger('deleteTodo')

export const handler =
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    const id = getUserId(event)
    // TODO: Remove a TODO item by id

    try {
      await deleteTodo(id, todoId)
      logger.info(`Todo:${todoId} was deleted by user ${id} at ${new Date().toISOString}`)
    } catch (e) {
      logger.info(`Todo:${todoId} delete failed, request by user ${id} at ${new Date().toISOString}`)
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "An error occured when trying to delete the following object",
          object: {
            todoId,
          }
        })
      }
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: ""
    }
  }
