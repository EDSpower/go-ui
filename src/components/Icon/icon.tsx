import React from 'react'
// import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

export default function Icon() {
  return (
    <div>
      <FontAwesomeIcon icon={faCoffee} size='4x' color='purple' />
    </div>
  )
}