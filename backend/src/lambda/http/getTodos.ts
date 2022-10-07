import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { getAllTodosForUser as getAllTodosForUser } from '../../businessLogic/todos'
import { getUserId } from '../utils';

import { createLogger } from '../../utils/logger'

const logger = createLogger('deleteTodo')

// TODO: Get all TODO items for a current user
export const handler =
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Write your code here
    const userId = getUserId(event);
    const todos = await getAllTodosForUser(userId);
    logger.info(`Todo get by user ${userId} at ${new Date().toISOString}`)

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({
        items: todos
      })
    }

  }
