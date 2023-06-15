import { TodosAccess } from '../dataLayer/todosAcess'
import { AttachmentUtils } from '../helpers/attachmentUtils'
import { TodoItem } from '../models/TodoItem'
// import { TodoUpdate } from '../models/TodoUpdate'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
// import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'

//TODO: Implement businessLogic
const logger = createLogger('TodosAcess')
const attachmentUtils = new AttachmentUtils()
const todosAcess = new TodosAccess()

/**
 * name: fnCreateTodo
 * @param: newTodo, userId
 * @return {todosAccess} A promise
 * description: create new a todo item
 */
export async function fnCreateTodo(
  newTodo: CreateTodoRequest,
  userId: string
): Promise<TodoItem> {
  logger.info('fnCreateTodo function called.')

  const todoId = uuid.v4()
  const createdAt = new Date().toISOString()
  const s3AttachmentUrl = attachmentUtils.fnGetAttachmentUrl(todoId)
  const newItem = {
    userId,
    todoId,
    createdAt,
    done: false,
    attachmentUrl: s3AttachmentUrl,
    ...newTodo
  }

  return await todosAcess.fnCreateTodoItem(newItem)
}

/**
 * name: fnGetTodosForUser
 * @param: userId
 * @return {todosAccess} A promise
 * description: Get all todo with each user id
 */
export async function fnGetTodosForUser(userId: string): Promise<TodoItem[]> {
  logger.info('Get todos for user function called.')

  return todosAcess.fnGetAllTodos(userId)
}
