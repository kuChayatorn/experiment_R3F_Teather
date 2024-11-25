import { Container, Text } from '@react-three/uikit'
import YoutubeVideoCard from './YoutubeVideoCard'

interface YoutubeVideoGroupProps {
  courseName?: string | undefined
  setPage: (page: number) => void
}

const YoutubeVideoGroup = ({ courseName = "Courses Name", setPage }: YoutubeVideoGroupProps) => {
  return (
    <Container
      backgroundColor="gray"
      backgroundOpacity={0}
      width={1600}
      height={490}
      flexDirection="column"
      justifyContent={'flex-start'}
      padding={20}
    >
      <Text marginLeft={40} fontSize={50} color={'#f4f4f4'}>{courseName}</Text>

      <Container
        width={'100%'}
        flexDirection={'column'}
        paddingTop={20}
        paddingLeft={20}
        paddingRight={20}
      >
        <Container
          flexDirection="row"
          alignItems={'flex-start'}
          justifyContent={'flex-start'}
          backgroundColor={'gray'}
          backgroundOpacity={0}
          gap={40}
        // overflow={'scroll'}
        >
          <YoutubeVideoCard onClick={() => { setPage(1); }} />
          <YoutubeVideoCard />
          <YoutubeVideoCard />
          <YoutubeVideoCard />
          {/* {[...Array(4)].map((_, i) => (
                <YoutubeVideoCard key={i} />
              ))} */}
        </Container>
        <Container
          justifyContent={'flex-end'}
          flexDirection={'row'}
          marginTop={20}
        >
          <Text
            fontSize={20}
            backgroundColor={'#18181b'}
            padding={10}
            paddingX={15}
            borderRadius={20}
            color={'white'}
          >
            View More
          </Text>
        </Container>
      </Container>
    </Container >

  )
}

export default YoutubeVideoGroup