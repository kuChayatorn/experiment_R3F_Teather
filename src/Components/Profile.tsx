import { Container, FontFamilyProvider, Image, Root, Text } from '@react-three/uikit'
import { Text as Text2 } from '@react-three/drei'

const Profile = () => {
    return (
        <group position={[0, 6, -10]}>
            <group position={[-5, 0, 0]}>
                <Root>
                    <Container
                        backgroundColor="gray"
                        backgroundOpacity={0.5}
                        borderLeftRadius={50}
                        borderWidth={4}
                        width={300}
                        height={80}
                        flexDirection="row"
                        padding={-2}
                        marginTop={5}
                        borderRightRadius={40}
                        transformScale={1.5}
                    >
                        <Image src="https://picsum.photos/200"
                            borderRadius={50}
                            borderWidth={4}
                            objectFit={'cover'}
                            width={100}
                            height={100}
                            positionTop={-15}
                            positionLeft={-10}
                        />
                        <Container flexDirection="column" padding={8} flexGrow={1} justifyContent={'center'} >
                            <Text fontSize={20}>John Doe</Text>
                            <Text fontSize={10}>Software Engineer</Text>
                            <Text fontSize={10}>New York, NY</Text>
                        </Container >
                    </Container>
                </Root>
            </group>
            <group position={[2, 0, 0]}>
                <Root>
                    <Container
                        flexDirection={'row'}
                        justifyContent={'center'}
                        gap={20}
                    >
                        <Image src="https://picsum.photos/150"
                            borderRadius={50}
                            borderWidth={4}
                            objectFit={'cover'}
                            width={100}
                            height={100}
                        />
                        <Text fontSize={60}>CV Learn</Text>
                        <Text fontSize={60}>logo</Text>
                        <Text fontSize={60}>logo</Text>
                        {/* <FontFamilyProvider
                            nano={{
                                medium: "ChulaCharasNewReg-msdf.json",
                            }}
                        >
                            <Text fontFamily="nano"
                                fontSize={60}
                            >
                                สวัสดีภาษาไทย นี้
                            </Text>
                            <Text2>
                                สวัสดีภาษาหมั้นหมาpfasdnตี้ไค-่พขตจ
                            </Text2>
                        </FontFamilyProvider> */}
                    </Container>
                </Root>
            </group>
        </group >

    )
}

export default Profile