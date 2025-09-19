import { useFrame } from "@react-three/fiber";
import { useRef } from 'react';
import { Mesh, SphereGeometry } from 'three'; 
import { mediaQuery } from "../../../shared/utils/mediaQuery";
import { Edges } from "@react-three/drei";
import { cssVar } from "../../../shared/utils/cssVar";
 
export const Sphere = () => {
    const sphereRef = useRef<Mesh>(null);
    const geometryRef = useRef<SphereGeometry>(null);

    const isMobile = mediaQuery("(max-width: 640px)");

    useFrame((state) => {
        if(sphereRef.current) {
            sphereRef.current.rotation.x += 0.01;
            sphereRef.current.rotation.y += 0.01;
            sphereRef.current.rotation.z += 0.01;

            const t = state.clock.getElapsedTime() 
            const scale = (isMobile ? 1 : 1.5) + Math.sin(t * 2) * (isMobile ? 0.4 : 0.7);
            sphereRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <mesh rotation={[0.5, 0.5, 0]} ref={sphereRef}>
            <sphereGeometry args={[1.5, 32, 32]} ref={geometryRef}/>
            <meshStandardMaterial color="hsla(240, 15%, 55%, 1.00)" wireframe/>
            <Edges scale={1.4} threshold={5} color={cssVar('--torus')} transparent opacity={0.25}/>
        </mesh>
    )
}