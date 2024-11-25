// SceneExperience.tsx
import { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { Environment, Html, OrbitControls, RoundedBox } from '@react-three/drei';
import Profile from './Components/Profile';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import Youtube from './Pages/Youtube';
import TeatherPage from './Pages/TeatherPage';

const SceneExperience = () => {
  const { gl } = useThree();
  const orbitControlsRef = useRef<OrbitControlsImpl>(null)


  useEffect(() => {
    const handleResize = () => {
      gl.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [gl]);

  // useFrame(() => {
  //   if (orbitControlsRef.current) {
  //     orbitControlsRef.current.enabled = false;
  //   }
  // });


  const Testscene = () => {
    return <>
      <RoundedBox args={[1, 1, 0.1]} position={[-2.5, 0, 0]} radius={0.5}>
        <meshStandardMaterial color="#fff" />
        <Html distanceFactor={10} position={[0, 0, 0.1]}>
          <img
            src="https://picsum.photos/200"
            alt="User Avatar"
            style={{ borderRadius: '50%', width: '60px', height: '60px' }}
          />
        </Html>
      </RoundedBox>

      {/* User Info and Controls */}
      <Html position={[-0.5, 0, 0]}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {/* User Name and Welcome Message */}
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>{"userName"}</div>
          <div style={{ fontSize: '14px', color: '#666' }}>{"welcomeText"}</div>
        </div>
      </Html>

      {/* Course Selector and Branding Logo */}
      <Html position={[2.5, 0, 0]}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Logo */}
          <img
            src="https://picsum.photos/200"
            alt="Logo"
            style={{ height: '30px', marginRight: '8px' }}
          />
          {/* Course Selector */}
          <select style={{ padding: '5px', fontSize: '14px' }} value={"course"}>
            <option>All Course</option>
            <option>Course 1</option>
            <option>Course 2</option>
          </select>
        </div>
      </Html>
    </>

  }

  const [page, setPage] = useState<number>(0);

  return (
    <>
      <OrbitControls ref={orbitControlsRef} enableZoom={false}/>
      <Environment preset="dawn" background blur={0.5} />
      <mesh
        position={[0, 0, 0]}
        scale={[-1, 1, 1]}
        rotation={[0, Math.PI / 2, 0]}
        layers={2}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="hotpink" />
      </mesh>


      {/* <Testscene /> */}
      {/* <CourseScrollRow /> */}

      {/* <Root>
        <CourseCard />
      </Root> */}
      {/* {page == 0 && <><Profile /><Youtube setPage={setPage} /></>}
      {page == 1 && <TeatherPage setPage={setPage} />} */}


    </>
  );
}

export default SceneExperience;

