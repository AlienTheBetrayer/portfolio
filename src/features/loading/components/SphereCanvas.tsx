import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
import { Sphere } from "./Sphere";

export const SphereCanvas = () => {
    return (
        <Canvas>
            <ambientLight intensity={0.15} />
            <directionalLight position={[2, 2, 2]} />
            <pointLight position={[-2.5, 1, 0.5]} color='hsla(0, 80%, 50%, 1.00)' intensity={20} distance={300}/>
            <pointLight position={[2.5, -1, -0.5]} color='hsla(240, 80%, 50%, 1.00)' intensity={20} distance={300}/>

            <OrbitControls enableRotate={true} enablePan={false} enableZoom={false}/>

            <Sphere/>
        </Canvas>
    )
}