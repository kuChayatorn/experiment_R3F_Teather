import { Container, Root } from '@react-three/uikit'
import React from 'react'
import CoursesGroup from './CoursesGroup'

const CourseScrollRow = () => {
  return (
    <group position={[0, 0, -10]}>
    <Root >
      <Container flexDirection={'column'}>
        <CoursesGroup />
      </Container>
    </Root>
  </group>
  )
}

export default CourseScrollRow