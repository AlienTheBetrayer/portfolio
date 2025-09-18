import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Points, PointsMaterial } from "three";


export const Particles = () => {
    const pointsRef = useRef<Points>(null);

    const particles = useMemo(() => {
        const count = 1000;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++)
            positions[i] = (Math.random() - 0.5) * 10;
        return positions
    }, [])

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        
        if(pointsRef.current) {
            const material = pointsRef.current.material as PointsMaterial;
            material.opacity = Math.abs(Math.sin(t)) + 0.3;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    itemSize={3} args={[particles, 3]}/>
                </bufferGeometry>
            <pointsMaterial size={0.03} transparent color='hsla(0, 0%, 64%, 1.00)' />
        </points>
    )
}