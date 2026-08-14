import { useGLTF } from "@react-three/drei";

export const Cauldron = () => {
	// model
	const { scene } = useGLTF("/models/cauldron.gltf");

	// jsx
	return <primitive object={scene} />;
};
