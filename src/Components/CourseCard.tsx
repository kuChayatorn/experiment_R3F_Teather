import { useFrame } from '@react-three/fiber'
import { Container, ContainerRef, Image, ImageRef, Text } from '@react-three/uikit'
import { easing } from 'maath'
import { useMemo, useRef, useState } from 'react'
import { signal } from '@preact/signals-core'

const CourseCard = () => {
    const [display, setDisplay] = useState<boolean>(false)
    const cardInfo = useRef<ContainerRef | null>(null)
    const imageRef = useRef<ImageRef | null>(null)
    const translateY = useMemo(() => signal(0), [])
    const translateZ = useMemo(() => signal(0), [])
    // const scale = useMemo(() => signal(200), [])

    useFrame((state, delta) => {
        // Updating the position with damp function
        easing.damp(translateY, 'value', display ? 0 : -40, 0.2, delta)
        // Updating the position with damp function
        easing.damp(translateZ, 'value', display ? 100 : 0, 0.2, delta)
        // easing.damp(scale, 'value', display ? 300 : 200, 0.05, delta)
    })
    return (
        <Container
            onPointerOver={() => setDisplay(true)}
            onPointerOut={() => setDisplay(false)}
            flexDirection={'column'}
            justifyContent={'flex-start'}
            backgroundOpacity={1}
            width={200}
            height={200}
        >
            <Image
                ref={imageRef}
                src="https://picsum.photos/200"
                height={200}
                width={200}
                transformTranslateZ={translateZ}
            />
            <Container
                ref={cardInfo}
                width={200}
                height={60}
                padding={0.2}
                backgroundColor=""
                backgroundOpacity={0}
                flexDirection={'column'}
                transformTranslateY={translateY}
                transformTranslateZ={translateZ}
                renderOrder={-1}
            >
                <Container
                    transformTranslateY={translateY}
                    backgroundColor={'lightgray'}
                    backgroundOpacity={0.7}
                    flexDirection={'column'}
                    borderWidth={1}
                    borderColor={'darkgray'}
                    borderRadius={5}
                    overflow={'hidden'}
                >
                    <Text fontSize={18} backgroundOpacity={0}>Title</Text>
                    <Text fontSize={16} backgroundOpacity={0}>Description</Text>
                </Container>

            </Container>
        </Container>
    )
}

export default CourseCard