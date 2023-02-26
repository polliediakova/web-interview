import React, { useState } from 'react'
import {
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import useMediaQuery from '@mui/material/useMediaQuery'

import CheckIcon from '@mui/icons-material/Check'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { TodoProgress } from './TodoProgress'
import { useDebouncedCallback } from '../../useDebouncedCallback'

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)

  const handleSubmit = (event) => {
    event.preventDefault()
    saveTodoList(todoList.id, { todos })
  }

  const autoSave = useDebouncedCallback((...params) => {
    saveTodoList(...params)
  }, 2000)

  const onChange = (todo, index, name, newValue) => {
    const newTodos = [
      // immutable update
      ...todos.slice(0, index),
      { ...todo, [name]: newValue },
      ...todos.slice(index + 1),
    ]
    setTodos(newTodos)
    autoSave(todoList.id, { todos: newTodos })
  }

  const isCompleted = todos.every((todo) => todo.completed)

  const matches = useMediaQuery('(max-width:600px)')

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2' style={{ display: 'flex' }}>
          {todoList.title}
          {isCompleted && (
            <>
              {' is completed'}
              <CheckIcon color='green' style={{ fill: 'green' }} />
            </>
          )}
        </Typography>

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {todos.map((todo, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginTop: '12px',
                flexDirection: matches ? 'column' : 'row',
              }}
            >
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>
              <TextField
                sx={{ flexGrow: 1 }}
                label='What to do?'
                value={todo.name}
                onChange={(event) => {
                  onChange(todo, index, 'name', event.target.value)
                }}
              />
              <DatePicker
                disabled={todo.completed}
                renderInput={(props) => <TextField {...props} />}
                label='Should be done by'
                value={todo?.dueDate}
                onChange={(newValue) => {
                  onChange(todo, index, 'dueDate', newValue)
                }}
                style={{ flexGrow: 1, marginTop: '1rem' }}
              />

              <FormControlLabel
                label='Completed?'
                control={
                  <Checkbox
                    checked={todo.completed}
                    onChange={(event) => {
                      onChange(todo, index, 'completed', Boolean(event.target.checked))
                    }}
                  />
                }
              />

              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={() => {
                  setTodos([
                    // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1),
                  ])
                }}
              >
                <DeleteIcon />
              </Button>
              {<TodoProgress dueDate={todo.dueDate} completed={todo.completed} />}
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                setTodos([...todos, { name: 'New todos', completed: false, dueDate: new Date() }])
              }}
            >
              Add Todo <AddIcon />
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
