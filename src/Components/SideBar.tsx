import { Container, Root, Text } from '@react-three/uikit'
import * as Icons from '@react-three/uikit-lucide'
import { useState } from 'react'


const SideBar = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [hover, setHover] = useState<boolean>(false)
    return (
        <group position={[-9, 3.25, -7]} rotation={[0, 0.5, 0]}>
            <Root
                justifyContent={'flex-start'}
                alignItems={'center'}
                flexDirection={'column'}
                anchorY={'top'}
            >
                <Container
                    flexDirection={'column'}
                    justifyContent={'flex-start'}
                    alignItems={'center'}
                    gap={20}
                >
                    <Container
                        width={80}
                        height={80}
                        borderRadius={50}
                        justifyContent={'center'}
                        alignItems={'center'}
                        onClick={() => setOpen(!open)}
                        onPointerOver={() => setHover(true)}
                        onPointerOut={() => setHover(false)}
                        backgroundColor={hover ? '#444444' : '#333333'}
                        cursor={'pointer'}
                    >
                        {open ? <Icons.X color="white" width={60} /> :
                            <Icons.Search color="white" width={60} />
                        }
                    </Container>
                    {open &&
                        <Container
                            width={400}
                            borderRadius={20}
                            padding={20}
                            backgroundColor={'#333333'}
                            justifyContent={'flex-start'}
                            alignItems={'center'}
                            flexDirection={'column'}
                            gap={20}
                        >
                            <Text width={'100%'} height={60} textAlign={'center'} backgroundColor={'#333333'} padding={20} borderWidth={3} borderColor={'#666666'} borderRadius={60} fontSize={20} color={'#f4f4f4'}>Simulation Expression</Text>
                            <Text width={'100%'} height={60} textAlign={'center'} backgroundColor={'#333333'} padding={20} borderWidth={3} borderColor={'#666666'} borderRadius={60} fontSize={20} color={'#f4f4f4'}>Immersive VR</Text>
                            <Text width={'100%'} height={60} textAlign={'center'} backgroundColor={'#333333'} padding={20} borderWidth={3} borderColor={'#666666'} borderRadius={60} fontSize={20} color={'#f4f4f4'}>360 VR</Text>
                            <Text width={'100%'} height={60} textAlign={'center'} backgroundColor={'#333333'} padding={20} borderWidth={3} borderColor={'#666666'} borderRadius={60} fontSize={20} color={'#f4f4f4'}>Medical</Text>
                            <Text width={'100%'} height={60} textAlign={'center'} backgroundColor={'#333333'} padding={20} borderWidth={3} borderColor={'#666666'} borderRadius={60} fontSize={20} color={'#f4f4f4'}>Explore</Text>
                        </Container>
                    }
                </Container>
            </Root>

        </group>
    )
}

export default SideBar