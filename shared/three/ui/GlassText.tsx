import { Center, Text3D, MeshTransmissionMaterial, AccumulativeShadows, RandomizedLight } from "@react-three/drei";
import React, { type JSX } from "react";

type MaterialConfig = {
	backside: boolean;
	backsideThickness: number;
	thickness: number;
	samples: number;
	transmission: number;
	clearcoat: number;
	clearcoatRoughness: number;
	chromaticAberration: number;
	anisotropy: number;
	roughness: number;
	distortion: number;
	distortionScale: number;
	temporalDistortion: number;
	ior: number;
	color: string;
};

interface GlassTextProps extends Omit<JSX.IntrinsicElements["group"], "children"> {
	height?: number;
	text: string;
	config: MaterialConfig;
	environment: boolean;
	children: React.ReactNode;
}

function _GlassText({ height = 0.3, text, ...props }: GlassTextProps) {
	const fontUrl = "/fonts/Pretendard_Bold.json";
	const fontThinUrl = "/fonts/Pretendard_Thin.json";

	return (
		<>
			<group {...props}>
				<Center
					scale={1}
					key={text}
					front
					top
				>
					<Text3D
						castShadow
						bevelEnabled
						font={fontUrl}
						scale={5}
						letterSpacing={-0.03}
						height={height}
						bevelSize={0.01}
						bevelSegments={3}
						curveSegments={64}
						bevelThickness={0.01}
					>
						{text}
						<MeshTransmissionMaterial
              backside={true}
              backsideThickness={0.13}
              anisotropicBlur={0.1}
              transmission={1}
              roughness={0.4}
              dispersion={0.1}
              distortionScale={0.09}
              thickness={0.15}
              ior={1.5}
              chromaticAberration={0.1}
              anisotropy={0.1}
              fog={false}
							//   background={texture}
						/>
					</Text3D>
				</Center>
				<group>
					<Center
						position={[0.1, 0.2, 0.75]}
						scale={[0.925, 0.875, 1]}
						key={text}
						front
						top
					>
						<Text3D
							bevelEnabled={true}
							font={fontThinUrl}
							scale={5}
							letterSpacing={0.1}
							height={0.01}
							bevelSize={0.01}
							bevelSegments={1}
							curveSegments={10}
							bevelThickness={0.01}
						>
							{text}
							<meshBasicMaterial />
						</Text3D>
					</Center>
				</group>
			</group>
		</>
	);
}

const Shadows = React.memo(function ShadowsComponent({ shadow }: { shadow: string }) {
	return (
		<AccumulativeShadows
			frames={100}
			color={shadow}
			colorBlend={5}
			toneMapped={true}
			alphaTest={0.9}
			opacity={1.3}
			scale={30}
			position={[0, -1.01, 0]}
		>
			<RandomizedLight
				amount={4}
				radius={8}
				position={[0, 10, -10]}
				size={15}
				mapSize={256}
			/>
		</AccumulativeShadows>
	);
});

export const GlassText = ({ text }: { text: string }) => {
	const controls = {
		saturation: -1,
		environment: true,
		backside: true,
		backsideThickness: 0.3,
		thickness: 0.15,
		samples: 6,
		transmission: 0.6,
		clearcoat: 1,
		clearcoatRoughness: 0.5,
		chromaticAberration: 1,
		anisotropy: 0.2,
		roughness: 0,
		distortion: 0,
		distortionScale: 0.09,
		temporalDistortion: 0.0,
		ior: 1.5,
		color: "#ff9cf5",
		stripes: "#444",
		shadow: "black",
	};

	const { environment, shadow, ...materialConfig } = controls;

	return (
		<>
			<_GlassText
				environment={environment}
				config={materialConfig}
				rotation={[-Math.PI / 2, 0, 0]}
				position={[0, 0, 2.25]}
				text={text}
			>
				{text}
			</_GlassText>
			<Shadows
				key={text}
				shadow={shadow}
			/>
		</>
	);
};
