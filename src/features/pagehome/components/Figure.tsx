import { useFrame } from "@react-three/fiber";
import { useRef } from "react"
import { Mesh } from "three"
import { cssVar } from "../../../shared/utils/cssVar";
import { Edges } from "@react-three/drei";

interface Props {
    figure?: string;
}



export const Figure = ( { figure } : Props) => {
    const figureRef = useRef<Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        if(figureRef.current) {
            const scale = 1.25 + Math.sin(t) * 0.5;

            figureRef.current.rotation.x += 0.005;
            figureRef.current.rotation.y += 0.005;
            figureRef.current.rotation.z += 0.005;
            figureRef.current.scale.set(scale, scale, scale);
        }
    });

    const figureSwitch = () => {
        switch(figure) {
            case 'torus':
                return <torusGeometry args={[ 2, 0.7 ]}/>;
            case 'cube':
                return <boxGeometry args={[ 2, 2, 2 ]}/>;
            case 'sphere':
                return <sphereGeometry args={[ 2 ]}/>;
            case 'triangle':
                return <tetrahedronGeometry args={[ 1, 0 ]}/>;
            case 'none':
                return <sphereGeometry args={[ 0 ]}/>;
        }
    }
    
    return (
        <mesh ref={figureRef}>
            { figureSwitch() }
            <meshStandardMaterial color={cssVar('--torus')} wireframe/>
            <Edges scale={1.1} threshold={10}/>
        </mesh>
    )
}