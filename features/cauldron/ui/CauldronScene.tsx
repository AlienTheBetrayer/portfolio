import { CauldronModel } from "@/features/cauldron/ui/CauldronModel";
import { FluidFBOManager } from "@/features/cauldron/ui/FluidFBOManager";
import { Center } from "@react-three/drei";

export const CauldronScene = () => {
	return (
		<FluidFBOManager
			densityPath="/textures/dryice_density.EXR"
			velocityPath="/textures/dryice_velocity.EXR"
			fps={24}
		>
			{(texture) => (
				<Center>
					<CauldronModel texture={texture} />
				</Center>
			)}
		</FluidFBOManager>
	);
};
