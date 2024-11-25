import { Suspense, useEffect, useMemo, useState } from 'react'
import { Canvas, } from '@react-three/fiber'
import { createXRStore, useXR, XR, XRLayer, XROrigin } from '@react-three/xr'
import { Box, Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import Profile from './Components/Profile'
import Youtube from './Pages/Youtube'
import TeatherPage from './Pages/TeatherPage'

// Create XR store with controller setup
const store = createXRStore({
  controller: {
    rayPointer: {
      rayModel: {
        color: "lime",
        opacity: 1,
      }
    }
  }
})




function App() {
  const [page, setPage] = useState(0)
  return (
    <>
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 9999 }}>
        <button className='card' onClick={() => store.enterVR()}>Enter VR</button>
      </div>
      <Canvas style={{ width: '100vw', height: '100vh' }} gl={{ localClippingEnabled: true }}>
        <XR store={store}>
          <XROrigin position={[0, 1.6, 3]} />
          <PerspectiveCamera
            fov={50}
            position={[0, 1.6, 3]}
            makeDefault
          />
          <ambientLight intensity={2} />
          <Suspense fallback={null}>
            <OrbitControls enableZoom={false} />
            {page == 0 && <>
              <Environment preset="dawn" background blur={0.5} />
              <Profile />
              <Youtube setPage={setPage} />
            </>}
            {page == 1 && <TeatherPage setPage={setPage} />}
          </Suspense>
        </XR>
      </Canvas>
    </>
  )
}

export default App