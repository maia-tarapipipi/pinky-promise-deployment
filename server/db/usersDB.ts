import connection from './connection'
import { user, user_draft } from '../../models/user_models'

export function getUser(db = connection, id: string): Promise<user> {
  return db('users').where('auth0_id', id).select().first()
}

export function addUser(input: user_draft, db = connection) {
  const { username, name, bio } = input
  return db('users').insert({ username, name, bio })
}
