import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { Figure } from "./Figure";
import { Particles } from "./Particles";
import { useEffect, useRef } from "react";
import { mediaQuery } from "../../../shared/utils/mediaQuery";

interface Props {
    fullscreen?: boolean;
    figure?: string;
}

export const HomeCanvas = ({ fullscreen, figure }: Props) => {
    const orbitRef = useRef<OrbitControlsImpl>(null);

    const resetCamera = () => {
        const controls = orbitRef.current;
        if(!controls)
            return;

        controls.reset();
    }

    useEffect(() => {
        if(!fullscreen)
            resetCamera();
    }, [fullscreen]);

    const isMobile = mediaQuery("(max-width: 640px)");

    return (
        <Canvas>
            <ambientLight intensity={0.15} />
            <directionalLight position={[2, 2, 2]} />
            <pointLight position={[2, 0, 0]} color='hsla(240, 80%, 50%, 1.00)' intensity={20} distance={300}/>
            <pointLight position={[0, 0, 2]} color='hsla(0, 80%, 50%, 1.00)' intensity={20} distance={300}/>
            <pointLight position={[0, 2, 0]} color='hsla(100, 80%, 50%, 1.00)' intensity={1} distance={300}/>
            <spotLight position={[6, 0, 0]} penumbra={1} angle={Math.PI / 4} intensity={20} color='#00ffee'/>

            <EffectComposer>
                <Bloom intensity={10} luminanceThreshold={0.0} luminanceSmoothing={1}/>
            </EffectComposer>
            <Figure figure={figure}/>
            { !isMobile && <Particles/> }

            <OrbitControls ref={orbitRef} autoRotate={!fullscreen} enableDamping={true} enableZoom={fullscreen} enablePan={fullscreen}/>
        </Canvas>
    )
}