import PropTypes from 'prop-types'

function Box(props) {
  return (
    <div className='bg-red-500 w-10 h-10'>{props.text}</div>
  )
}

Box.propTypes = {
  text: PropTypes.string.isRequired
}

export { Box }
