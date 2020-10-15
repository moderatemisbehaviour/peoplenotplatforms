import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import Result from '../common/Omnibox/Result'
import Person from './Person'

PersonList.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  refs: PropTypes.arrayOf(PropTypes.object)
}

function PersonList(props) {
  return (
    <ol>
      {props.people.map((person, index) => (
        <Result
          id={person.id}
          key={person.id}
          ref={props.refs ? props.refs[index] : undefined}
        >
          <Link to={`/person/${person.id}`}>
            <Person {...person} />
          </Link>
        </Result>
      ))}
    </ol>
  )
}

export default PersonList
