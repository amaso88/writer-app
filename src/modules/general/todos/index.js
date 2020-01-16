import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { compose } from 'redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

export default function Todos() {
  // Attach listener for todos in Real Time Database
  useFirebaseConnect([
    { path: 'todos' }
  ])
  // Get todos from redux state
  const todos = useSelector(state => state.firebase.data.todos)

  // Show message while todos are loading
  if (!isLoaded(todos)) {
    return <div>Loading...</div>
  }

  // Show message if there are no todos
  if (isEmpty(todos)) {
    return <div>Todos List Is Empty</div>
  }

  return (
    <div>
      <h1>Todos</h1>
      <div>
        {JSON.stringify(todos, null, 2)}
      </div>
    </div>
  )
}