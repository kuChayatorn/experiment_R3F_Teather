import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { XRLayer, VRButton, useXR } from '@react-three/xr';
import dashjs from 'dashjs';
import { Container, Root } from '@react-three/uikit';
import Controller from '../Components/Controller';

const TeatherPage = ({ setPage }: any) => {
  const refMesh = useRef<any>(null);
  const videoCourse = useMemo(() => {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.autoplay = false;
    video.loop = true;
    video.style.display = "none";
    document.body.appendChild(video);
    return video;
  }, []);

  useEffect(() => {
    const player = dashjs.MediaPlayer().create();
    player.initialize(videoCourse, "https://player.vimeo.com/external/986300466.mpd?s=67c4770b8102d7ff31dc86c428263dcde33387a7&logging=false", false);

    return () => {
      player.reset();
      document.body.removeChild(videoCourse);
    };
  }, [videoCourse]);

  const CustomVideoMaterial = (videoElement: any) => {
    const videoTexture = useMemo(() => {
      const texture = new THREE.VideoTexture(videoElement);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.format = THREE.RGBFormat;
      return texture;
    }, [videoElement]);

    return new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: videoTexture },
        uBrightness: { value: 1.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uBrightness;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(uTexture, vUv);
          color.rgb *= uBrightness;
          gl_FragColor = color;
        }
      `,
      side: THREE.BackSide,
      toneMapped: true,
    });
  };
  const customMaterial = CustomVideoMaterial(videoCourse);
  const halfSphereGeometry = useMemo(() => new THREE.SphereGeometry(64, 64, 64, Math.PI / 2, Math.PI * 2), []);


  function StereoVideoSphere() {
    // const video = useMemo(() => {
    //   const result = document.createElement('video')
    //   result.src = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    //   return result
    // }, [])
    const [isPresenting, setIsPresenting] = useState(false)
    const { mode } = useXR((state) => state)
    useEffect(() => {
      setIsPresenting(mode === 'immersive-vr')
    }, [mode])
    return (
      isPresenting ?
        <XRLayer layout='stereo-left-right'
          position={[0, 1.6, -15]}
          onClick={() => videoCourse.play()}
          scale={50}
          src={videoCourse}
          shape='equirect'
          centralHorizontalAngle={Math.PI}
          upperVerticalAngle={Math.PI / 2}
          lowerVerticalAngle={-Math.PI / 2}
        /> :
        <mesh
          ref={refMesh}
          geometry={halfSphereGeometry}
          material={customMaterial}
          position={[0, 0, 0]}
          scale={[-1, 1, 1]}
          rotation={[0, Math.PI / 2, 0]}
        />
    );
  }

  return (
    <>
      <StereoVideoSphere />
      <Controller
        videoElement={videoCourse}
        handlerPageIndex={(page: number) => setPage(page)}
      />
    </>
  );
};

export default TeatherPage;
