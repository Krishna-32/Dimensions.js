import React from 'react'
import { useState } from 'react'

function TextRandomizer() {
  const [text, setText] = useState('yoo')

  return (
    <div>TextRandomizer : {text}</div>
  )
}

export { TextRandomizer };
