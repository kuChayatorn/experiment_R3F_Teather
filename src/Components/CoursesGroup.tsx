import { Container, ContainerRef, DefaultProperties, Root, Text } from '@react-three/uikit'
import CourseCard from './CourseCard'
import { Signal } from '@preact/signals-core';
import { MathUtils, Vector2Tuple } from 'three';
import { useRef } from 'react';

const CoursesGroup = () => {
    const containerRef = useRef<ContainerRef | null>(null)
    return (
        <Container
            backgroundColor="gray"
            backgroundOpacity={0.5}
            borderLeftRadius={50}
            borderWidth={4}
            width={1300}
            height={380}
            flexDirection="column"
            padding={20}
            marginTop={5}
            borderRightRadius={40}>
            <Text fontSize={50}>Courses Name</Text>
            <DefaultProperties
                //custome scroll bar style
                lineHeight={'150%'}
            >
                <Container
                    ref={containerRef}
                    width={'100%'} height={280} justifyContent={'flex-start'}
                    overflow={'scroll'}
                >
                    <Container
                        flexDirection="row"
                        flexShrink={0}
                        alignItems={'flex-start'}
                        justifyContent={'flex-start'}
                        backgroundColor={'gray'}
                        backgroundOpacity={0}
                        gap={20}
                    // overflow={'scroll'}
                    >
                        {[...Array(8)].map((_, i) => (
                            <CourseCard key={i} />
                        ))}
                    </Container>
                </Container>
            </DefaultProperties>

        </Container >
    )
}

export default CoursesGroup