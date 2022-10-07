import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils';
import { createTodo } from '../../businessLogic/todos'

import { createLogger } from '../../utils/logger'

const logger = createLogger('createTodo')

export const handler =
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    const id = getUserId(event);
    // TODO: Implement creating a new TODO item

    const todoItem = await createTodo(id, newTodo)
    logger.info(`Todo was created by user ${id} at ${new Date().toISOString}`)

    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({
        item: todoItem
      })
    }
  }
