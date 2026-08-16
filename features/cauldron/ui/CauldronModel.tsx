import { useCauldronModel } from "@/features/cauldron/hooks/useCauldronModel";
import { Texture, TextureEventMap } from "three";

export const CauldronModel = ({ texture }: { texture: Texture<unknown, TextureEventMap> }) => {
	// model
	const { scene } = useCauldronModel({ texture });

	// jsx
	return <primitive object={scene} />;
};
