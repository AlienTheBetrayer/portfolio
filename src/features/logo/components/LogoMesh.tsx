import { useFrame } from "@react-three/fiber";
import { useRef } from "react"
import { cssVar } from "../../../shared/utils/cssVar";
import { Edges } from "@react-three/drei";
import type { Mesh } from "three";

export const LogoMesh = () => {
    const logoRef = useRef<Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        if(logoRef.current) {
            logoRef.current.rotation.x += 0.01;
            logoRef.current.rotation.y += 0.01;
            logoRef.current.rotation.z += 0.01;

            const scale = Math.cos(t) * 0.05 + 0.9; 
            logoRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <mesh ref={logoRef}>
            <sphereGeometry args={[ 2.5 ]}/>
            <meshStandardMaterial color={cssVar('--logo')} wireframe/>
            <Edges scale={1.15} threshold={10}/>
        </mesh>
    )
}