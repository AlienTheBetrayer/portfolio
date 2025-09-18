import { Canvas } from "@react-three/fiber"
import { LogoMesh } from "./LogoMesh"
import { OrbitControls } from "@react-three/drei"

export const LogoCanvas = () => {
    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 1, 2]} />
            <pointLight position={[0, 4, 1]} color='#4040f4' intensity={40} distance={300}/>
            <pointLight position={[0, -4, 1]} color='#f47340' intensity={40} distance={300}/>

            <LogoMesh/>

            <OrbitControls enablePan={false} enableZoom={false}/>
        </Canvas>
    )
}