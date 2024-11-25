import React, { useEffect, useRef, useState } from 'react'
import { Container, Image, Root, Text } from '@react-three/uikit';
import { Slider } from './apfel/slider';

interface Props {
    videoElement: HTMLVideoElement;
    handlerPageIndex: (page: number) => void;
}

const Controller = ({ videoElement, handlerPageIndex }: Props) => {
    const [playIconSrc, setPlayIconSrc] = useState('./icon/icon-play.png');
    const [muteIconSrc, setMuteIconSrc] = useState("./icon/icon-unmute.png");
    const [videoProgress, setVideoProgress] = useState(0);
    const [videoElementMount, setVideoElementMount] = useState<HTMLVideoElement>(videoElement);
    const videoDurationRef = useRef(0);
    const isSeekingRef = useRef(false); // Track if the user is currently seeking
    // const [speed, setSpeed] = useState(1.0);
    useEffect(() => {
        setVideoElementMount(videoElement)
    }, [videoElement])


    useEffect(() => {

        // Log the duration directly from the video element when metadata is loaded
        console.log('Initial video duration:', videoElement.duration);

        // Handler to set video duration when metadata is loaded
        const handleLoadedMetadata = () => {
            const duration = videoElementMount.duration;
            videoDurationRef.current = duration; // Store duration in the ref
            console.log('Metadata loaded, video duration set:', duration);
        };

        // Handler to update progress as the video plays
        const handleTimeUpdate = () => {
            if (videoDurationRef.current > 0) {
                setVideoProgress((videoElementMount.currentTime / videoDurationRef.current) * 100);
            }
        };

        // Add event listeners
        videoElementMount.addEventListener('loadedmetadata', handleLoadedMetadata);
        videoElementMount.addEventListener('timeupdate', handleTimeUpdate);

        // Initial duration set if the metadata is already loaded
        if (videoElementMount.readyState >= 1) {
            handleLoadedMetadata();
        }

        // Clean up event listeners on unmount
        return () => {
            videoElementMount.removeEventListener('loadedmetadata', handleLoadedMetadata);
            videoElementMount.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [videoElement]);

    const controllerHandler = useRef({
        watching: false,
        onTrackedVideoFrame: (currentTime: number, duration: number) => {
            // if (this !== undefined) {
            //     this.ad = duration;
            //     this.ac = currentTime;
            // }
        },
        back: () => {
            handlerPageIndex(0);
            videoElementMount.pause();
            videoElementMount.removeAttribute('src');
            videoElementMount.load();
        },
        play: (type = !controllerHandler.current.watching) => {
            console.log(`Playback state: ${type ? 'Playing' : 'Paused'}`);
            console.log(videoElementMount)
            if (videoElementMount) {
                type ? videoElementMount.play() : videoElementMount.pause();
            }
            setPlayIconSrc(type ? "./icon/icon-pause.png" : "./icon/icon-play.png");
            controllerHandler.current.watching = type;
        },
        setCurrentTimeInterval: (type: boolean) => {
            const upgrade_progress_interval = 10;
            controllerHandler.current.watching = false;
            let ct = videoElementMount.currentTime;
            // type ?
            //     videoElementMount.currentTime += upgrade_progress_interval :
            //     videoElementMount.currentTime -= upgrade_progress_interval;
            // this.currentProgress.update((res) => {
            //     this.countdown = 0;
            //     let it = setInterval(() => {
            //         let check = type
            //             ? videoElementMount.currentTime > ct + upgrade_progress_interval
            //             : videoElementMount.currentTime > ct - upgrade_progress_interval;
            //         if (check) {
            //             controllerHandler.current.watching = true;
            //             clearInterval(it);
            //         }
            //     }, 500);
            // });
        },
        // setCurrentTime: (newTime) => {
        //     controllerHandler.current.watching = false;
        //     let ct = videoElementMount.currentTime;
        //     videoElementMount.currentTime = newTime;
        //     this.currentProgress.update((res) => {
        //         this.countdown = 0;
        //         let it = setInterval(() => {
        //             let check = type
        //                 ? videoElementMount.currentTime > newTime
        //                 : videoElementMount.currentTime > newTime;
        //             if (check) {
        //                 controllerHandler.current.watching = true;
        //                 clearInterval(it);
        //             }
        //         }, 500);
        //     });
        // },
        sound: (type = (videoElementMount.muted ? false : true)) => {
            // console.log(`Sound state: ${type ? 'Muted' : 'Unmuted'}`);
            videoElementMount.muted = type;
            type ? setMuteIconSrc("./icon/icon-mute.png") : setMuteIconSrc("./icon/icon-unmute.png");
        },
        // speed: (type) => {
        //     // this.playSpeed = type ?
        //     //     Math.min(3.0, this.playSpeed + 0.5) :
        //     //     Math.max(0.5, this.playSpeed - 0.5);
        //     // videoElementMount.playbackRate = this.playSpeed;
        //     // this.speedText.set({ content: `${this.playSpeed.toFixed(1)}` });
        // },
        seek: (value: number) => {
            isSeekingRef.current
            const duration = videoDurationRef.current;
            if (duration > 0) {
                const newTime = (value / 100) * duration;
                console.log(`Seeking: videoDuration=${duration}, newTime=${newTime}`);
                videoElementMount.currentTime = newTime;
                setVideoProgress(value);
            } else {
                console.warn('Cannot seek because video duration is 0 or not yet loaded.');
            }
        },
        visible: (type: boolean) => {
            // controllerHandlerContainer.visible = type;
        },
    })

    const handleSliderChange = (value: number) => {
        isSeekingRef.current = true; // Set seeking to true when slider is being dragged
        controllerHandler.current.seek(value);
        // handlerDisableOrbitControls(false);
    };

    const handleSliderChangeComplete = () => {
        isSeekingRef.current = false; // Set seeking to false once the user stops dragging
        // handlerDisableOrbitControls(true);
    };

    return (
        <group
            position={[0, 0, -30]} scale={5} rotation={[-Math.PI / 18, 0, 0]}
        >
            <Root sizeX={6} sizeY={1.5} flexDirection="row" alignItems={"center"} justifyContent={"center"}
                borderRadius={5}
            >
                <Container flexGrow={1} padding={20} backgroundColor="black" borderRadius={35} backgroundOpacity={0.4} positionBottom={-300} justifyContent={'space-between'}
                >
                    <Container margin={2} backgroundColor={"#444444"}
                        width={50}
                        height={50}
                        borderRadius={15}
                        onClick={(event) => { event.stopPropagation(); controllerHandler.current.back() }}
                        hover={{ backgroundColor: '#666666' }}
                        backgroundOpacity={0.8}
                        active={{ backgroundColor: 'grey' }}
                    >
                        <Image src="./icon/back_arrow.png" width={50} height={50} />
                    </Container>

                    <Container margin={2} backgroundColor={"#444444"}
                        width={50}
                        height={50}
                        marginX={10}
                        borderRadius={15}
                        justifyContent={"center"}
                        alignItems={"center"}
                        onClick={(event) => { event.stopPropagation(); controllerHandler.current.play() }}
                        hover={{ backgroundColor: '#666666' }}
                        active={{ backgroundColor: 'grey' }}
                    >
                        <Image src={playIconSrc} width={35} height={35} />
                    </Container>

                    <Container margin={2} backgroundColor="grey"
                        width={360}
                        height={50}
                        justifyContent={"space-between"}
                        backgroundOpacity={0}
                        flexDirection={"column"}
                    >
                        <Text
                            backgroundColor={"#444444"}
                            color="white"
                            borderRadius={10}
                            fontSize={25}
                            fontWeight={"bold"}
                            borderColor={"#444444"}
                            borderBend={0.3}
                            borderWidth={4}
                            height={20}
                            textAlign={"center"}
                            marginBottom={5}
                        >
                            Learning Video
                        </Text>
                        <Container
                            height={20}
                        >
                            <Slider
                                width={360}
                                height={20}
                                borderRadius={15}
                                size="md"
                                value={videoProgress}
                                onValueChange={(value) => { controllerHandler.current.seek(value) }}
                                onPointerLeave={() => {
                                    if (isSeekingRef.current) {
                                        controllerHandler.current.seek(videoProgress);
                                        handleSliderChangeComplete();
                                    }
                                }}
                                onPointerDown={(e) => handleSliderChange(20)}
                            />
                        </Container>
                    </Container>

                    <Container margin={2} backgroundColor={"#444444"}
                        width={50}
                        height={50}
                        borderRadius={15}
                        marginLeft={20}
                        onClick={(event) => { event.stopPropagation(); controllerHandler.current.sound(); }}
                        hover={{ backgroundColor: '#666666' }}
                        active={{ backgroundColor: 'grey' }}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <Image src={muteIconSrc} width={35} height={35} />
                    </Container>
                    {/* <Container margin={2} backgroundColor="grey"
              width={25}
              height={50}
              active={{ backgroundColor: 'grey' }}
              justifyContent={"space-between"}
              backgroundOpacity={0}
              flexDirection={"column"}
            >
              <Container backgroundColor="grey"
                width={23}
                height={23}
                borderRadius={15}
                onClick={() => console.log('clicked')}
                active={{ backgroundColor: 'grey' }}
              >
                <Image src="./icon/back_arrow.png" width={50} height={50} />
              </Container>
              <Container backgroundColor="grey"
                width={23}
                height={23}
                borderRadius={15}
                onClick={() => console.log('clicked')}
                active={{ backgroundColor: 'grey' }}
              >
                <Image src="./icon/back_arrow.png" width={50} height={50} />
              </Container>
            </Container> */}
                </Container>
            </Root>
        </group>
    )
}

export default Controller