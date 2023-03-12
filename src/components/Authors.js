import React from 'react'
import Select from 'react-select'
import { useQuery, useMutation } from "@apollo/client"
import { useState } from "react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"

const Authors = ({show}) => {
  const result = useQuery(ALL_AUTHORS)
  const [ name, setName ] = useState('')
  const [ birthYear, setBirthYear ] = useState('')
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!show) {
    return null
  }
  if (result.loading) {
    return <div>Loading...</div>
  }

  const authors = result.data.allAuthors

  const authorNames = authors.map((a) => {return {value: a.name, label: a.name}})

  const submit = async (event) => {
    event.preventDefault()
    console.log(name)
    console.log(birthYear)
    editAuthor({variables: { name: name.value, setBornTo: birthYear }})

    setName('')
    setBirthYear('')

  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          <Select
            value={name}
            onChange={(value) => setName(value)}
            options={authorNames}
          />
        </div>
        <div>
          born
          <input 
            type="number" 
            value={birthYear}
            onChange={({ target }) => setBirthYear(parseInt(target.value))}
          />
        </div>
        <div>
          <button type="submit">update author</button>
        </div>
      </form>
    </div>
  )
}

export default Authors
