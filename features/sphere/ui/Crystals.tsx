/* eslint-disable react-hooks/purity */
import { createCrystalGeometry } from "@/features/sphere/lib/crystal";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { InstancedMesh } from "three";
import { Vector3, Euler, Matrix4, Quaternion } from "three";

export function OrbitingCrystals({ count = 32 }) {
	const meshRef = useRef<InstancedMesh | null>(null);

	// Generate the crystal base geometry once
	const crystalGeometry = useMemo(() => createCrystalGeometry(14, 2.2), []);

	// Pre-calculate per-instance orbital parameters
	const instanceData = useMemo(() => {
		const data = [];
		for (let i = 0; i < count; i++) {
			data.push({
				radius: 4 + Math.random() * 6, // Distance from center
				speed: (0.1 + Math.random() * 0.3) * (Math.random() > 0.5 ? 1 : -1), // Orbit velocity
				angle: Math.random() * Math.PI * 2, // Initial orbital position
				tilt: (Math.random() - 0.5) * 0.8, // Orbital plane tilt
				scale: 0.2 + Math.random() * 0.4, // Crystal size variation
				rotSpeed: new Vector3((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2), // Self-rotation speed
				rotation: new Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
			});
		}
		return data;
	}, [count]);

	// Reusable spatial variables to prevent GC pressure in the render loop
	const tempMatrix = useMemo(() => new Matrix4(), []);
	const tempPosition = useMemo(() => new Vector3(), []);
	const tempQuaternion = useMemo(() => new Quaternion(), []);
	const tempScale = useMemo(() => new Vector3(), []);

	useFrame((state, delta) => {
		if (!meshRef.current) return;

		instanceData.forEach((data, i) => {
			// Advance orbital angle
			data.angle += data.speed * delta;

			// Orbital position (polar to Cartesian + tilt)
			const x = Math.cos(data.angle) * data.radius;
			const z = Math.sin(data.angle) * data.radius;
			const y = Math.sin(data.angle + data.tilt) * (data.radius * 0.3);
			tempPosition.set(x, y, z);

			// Advance local crystal rotation
			data.rotation.x += data.rotSpeed.x * delta;
			data.rotation.y += data.rotSpeed.y * delta;
			data.rotation.z += data.rotSpeed.z * delta;
			tempQuaternion.setFromEuler(data.rotation);

			// Apply scale
			tempScale.set(data.scale, data.scale * (1 + Math.random() * 0.001), data.scale);

			// Compose into matrix and update instance
			tempMatrix.compose(tempPosition, tempQuaternion, tempScale);
			meshRef.current?.setMatrixAt(i, tempMatrix);
		});

		meshRef.current.instanceMatrix.needsUpdate = true;
	});

	return (
		<instancedMesh
			ref={meshRef}
			args={[crystalGeometry, undefined, count]}
			castShadow
			receiveShadow
		>
			<meshPhysicalMaterial
				transmission={0.92} // Glass refraction effect
				opacity={1} // Full opacity when using transmission
				transparent={false}
				roughness={0.05} // Smooth, shiny facets
				metalness={0.1}
				ior={1.6} // Index of Refraction (Quartz/Quartz Crystal ~1.54 - 1.6)
				thickness={1.2} // Internal light absorption depth
				specularIntensity={1.5}
				clearcoat={1} // Glossy outer shell
				clearcoatRoughness={0.1}
				dispersion={0.05} // Chromatic dispersion (js r160+)
				color="#ffffff"
				attenuationColor="#5440c9" // Tint of internal light depth
				attenuationDistance={1.5}
			/>
		</instancedMesh>
	);
}
