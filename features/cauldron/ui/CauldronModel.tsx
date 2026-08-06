import { useCauldronModel } from "@/features/cauldron/hooks/useCauldronModel";
import { Center } from "@react-three/drei";

export function CauldronModel() {
	// model
	const { scene } = useCauldronModel();

	// jsx
	return (
		<Center>
			<primitive object={scene} />
		</Center>
	);
}
