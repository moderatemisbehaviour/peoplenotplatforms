import React from 'react'
import PropTypes from 'prop-types'

import './Avatar.css'
import placeholderProfileImage from '../people/placeholderProfileImage.svg'

function Avatar (props) {
  const { src } = props
  return (
    <div className="Avatar">
      <img src={src} alt="logo" />
    </div>
  )
}

Avatar.propTypes = {
  src: PropTypes.string
}

Avatar.defaultProps = {
  src: placeholderProfileImage
}

export default Avatar