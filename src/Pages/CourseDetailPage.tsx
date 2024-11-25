import { Container, DefaultProperties, Image, Root, Text } from '@react-three/uikit'

import YoutubeVideoGroup from '../Components/YoutubeVideoGroup'
import SideBar from '../Components/SideBar'

const Youtube = () => {
    return <>
        <group position={[0, 4, -10]}>
            <Root
                anchorY={'top'}
            >
                <DefaultProperties
                //custome scroll bar style
                // lineHeight={'150%'}
                // scrollbarBorderBottomWidth={3}
                // scrollbarBorderColor={'#333'}
                // scrollbarBorderRadius={5}
                >
                    <Container

                        flexDirection={'column'}
                        backgroundColor={'#121212'}
                        width={'100%'}
                        height={900}
                        justifyContent={'flex-start'}
                        flexShrink={0}
                        overflow={'scroll'}
                    >
                    </Container>
                </DefaultProperties>
            </Root>
        </group >
        <SideBar />
    </>
}

export default Youtube