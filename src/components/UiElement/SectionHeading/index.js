import React from 'react'

function SectionHeading({headingText, extraclassName='', ...rest}){
  return (
    <>
        <h2 className={`${extraclassName} commonHead position-relative`} {...rest}>{headingText}</h2>
    </>
  )
}

export default SectionHeading;