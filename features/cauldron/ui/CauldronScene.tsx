import { FluidFBOManager } from "@/features/cauldron/ui/FluidFBOManager";
import { Cauldron } from "@/features/cauldron/ui/models/Cauldron";
import { FluidRaymarchPlanes } from "@/features/cauldron/ui/models/FluidRaymarchPlanes";
import { Center } from "@react-three/drei";

export const CauldronScene = () => {
	return (
		<FluidFBOManager
			densityPath="/textures/dryice_density.EXR"
			velocityPath="/textures/dryice_velocity.EXR"
			fps={24}
		>
			{(fboTexture) => (
				<Center>
					{/* <Cauldron />
					<FluidRaymarchPlanes fboTexture={fboTexture} /> */}

					{/* TEMPORARY DEBUG PREVIEW: Displays FBO directly */}
					<mesh position={[0, 3, 0]}>
						<planeGeometry args={[1, 1]} />
						<meshBasicMaterial map={fboTexture} />
					</mesh>
				</Center>
			)}
		</FluidFBOManager>
	);
};
