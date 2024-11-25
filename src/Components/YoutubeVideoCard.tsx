import { useState } from 'react';
import { Container, Image, Root, Text } from '@react-three/uikit';
// import { CiClock2 } from "react-icons/ci";
// import { Clock } from "lucide-react";

const YoutubeVideoCard = (
    {
        title = "Exploring Virtual Reality",
        thumbnailUrl = "/api/placeholder/1920/1080",
        duration = "10:30",
        views = "1.2M views",
        channelName = "VR Channel",
        onClick = () => { }
    }
): any => {
    const [hover, setHover] = useState<boolean>(false)
    return (
        <Container
            width={360}
            height={300}
            padding={0.2}
            borderRadius={0.2}
            flexDirection="column"
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            backgroundColor={hover ? '#212121' : '#18181b'}
            cursor={'pointer'}
            onClick={(e) => { e.stopPropagation(); onClick() }}
        >
            {/* Thumbnail Container */}
            <Container
                flexGrow={1}
                height={150}
                backgroundColor="#FFFFFF87"
                borderRadius={0.15}
            >
                <Image
                    src={'https://picsum.photos/200/300'}
                    flexGrow={1}
                    objectFit="cover"
                    keepAspectRatio={false}
                />

                {/* Duration Badge */}
                <Container
                    positionType="absolute"
                    positionBottom={10}
                    positionRight={10}
                    transformTranslateZ={10}
                    renderOrder={2}
                    width={60}
                    height={30}
                    backgroundColor="#18181b"
                    borderRadius={10}
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <Text
                        fontSize={16}
                        fontWeight='semi-bold'
                        color="white"
                        alignItems={"center"}
                    >
                        {duration}
                    </Text>
                </Container>
            </Container>

            {/* Info Container */}
            <Container
                width={'100%'}
                height={80}
                backgroundColor="#18181b"
                backgroundOpacity={0}
                flexDirection={'column'}
                padding={10}
                gap={3}
            >
                <Text
                    fontSize={16}
                    color="white"
                    fontWeight='semi-bold'
                    textAlign="left"
                    maxWidth={240}
                >
                    {title}
                </Text>

                <Text
                    fontSize={12}
                    color="#f5f5f5"
                    textAlign="left"
                    fontWeight='semi-bold'
                >
                    {channelName}
                </Text>
                <Text
                    fontSize={12}
                    color="#f5f5f5"
                    fontWeight='semi-bold'
                    textAlign="left"
                >
                    {views}
                </Text>
            </Container>
        </Container>
    )
}

export default YoutubeVideoCard