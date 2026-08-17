import { useCauldronModel } from "@/features/cauldron/hooks/useCauldronModel";
import { useRef } from "react";
import { DirectionalLight, Texture, TextureEventMap } from "three";

export const CauldronModel = ({ texture }: { texture: Texture<unknown, TextureEventMap> }) => {
	// model
	const lightRef = useRef<DirectionalLight | null>(null);
	const { scene } = useCauldronModel({ texture, lightRef });

	// jsx
	return (
		<>
			<primitive object={scene} />
			<directionalLight
				intensity={128}
				position={[0, 0, 0]}
				ref={lightRef}
			/>
		</>
	);
};
