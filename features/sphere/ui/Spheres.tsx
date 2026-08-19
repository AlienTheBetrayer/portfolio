/* eslint-disable react-hooks/immutability */

"use client";

import { CreviceGlowMaterial } from "@/features/sphere/materials/CreviceGlowMaterial";
import { useRef, useMemo, useLayoutEffect } from "react";
import { InstancedMesh, Object3D, Vector3, Quaternion, Raycaster, Sphere, Vector2, MathUtils } from "three";
import { useFrame } from "@react-three/fiber";
import { createNoise3D } from "simplex-noise";

export const Spheres = ({ count = 1200 }: { count?: number }) => {
	const meshRef = useRef<InstancedMesh>(null!);
	const raycaster = useMemo(() => new Raycaster(), []);
	const mouse = useMemo(() => new Vector2(), []);
	const sphere = useMemo(() => new Sphere(new Vector3(0, 0, 0), 2.2), []);
	const mousePoint = useMemo(() => new Vector3(), []);
	const targetMousePoint = useMemo(() => new Vector3(), []);
	const currentMousePoint = useMemo(() => new Vector3(), []);
	const hasMousePoint = useRef(false);
	const influenceStrength = useRef(0);
	const dummy = useMemo(() => new Object3D(), []);
	const noise3D = useMemo(() => createNoise3D(), []);

	// base
	const baseTransforms = useMemo(() => {
		return new Array(count).fill(0).map(() => ({
			position: new Vector3(),
			normal: new Vector3(),
			quaternion: new Quaternion(),
		}));
	}, [count]);

	// fibonacci
	useLayoutEffect(() => {
		if (!meshRef.current) return;

		const phi = Math.PI * (3 - Math.sqrt(5));
		const radius = 2.2;

		for (let i = 0; i < count; i++) {
			const y = 1 - (i / (count - 1)) * 2;
			const radiusAtY = Math.sqrt(1 - y * y);
			const theta = phi * i;

			const x = Math.cos(theta) * radiusAtY * radius;
			const posY = y * radius;
			const z = Math.sin(theta) * radiusAtY * radius;

			const basePos = new Vector3(x, posY, z);
			const normal = basePos.clone().normalize();

			dummy.position.copy(basePos);
			dummy.lookAt(basePos.clone().multiplyScalar(2));
			dummy.rotateX(Math.PI / 2);

			baseTransforms[i].position.copy(basePos);
			baseTransforms[i].normal.copy(normal);
			baseTransforms[i].quaternion.copy(dummy.quaternion);

			dummy.updateMatrix();

			meshRef.current.setMatrixAt(i, dummy.matrix);
		}

		meshRef.current.instanceMatrix.needsUpdate = true;
	}, [count, dummy, baseTransforms]);

	// animation
	useFrame((state, delta) => {
		const mesh = meshRef.current;
		if (!mesh) {
			return;
		}

		// raycasing
		const time = state.clock.getElapsedTime();

		mouse.set(state.pointer.x, state.pointer.y);
		raycaster.setFromCamera(mouse, state.camera);
		const hit = raycaster.ray.intersectSphere(sphere, mousePoint);

		if (hit) {
			targetMousePoint.copy(mousePoint);
			hasMousePoint.current = true;

			// fade in
			influenceStrength.current = MathUtils.damp(influenceStrength.current, 1, 8, delta);
		} else {
			// fade out
			influenceStrength.current = MathUtils.damp(influenceStrength.current, 0, 3, delta);
		}

		if (!hasMousePoint.current) {
			return;
		}

		// smooth disturbance
		currentMousePoint.lerp(targetMousePoint, 1 - Math.exp(-2 * delta));

		const strength = influenceStrength.current;

		// animate capsules
		const influenceRadius = 2.0;

		for (let i = 0; i < count; i++) {
			const { position, normal, quaternion } = baseTransforms[i];
			const localX = position.x - currentMousePoint.x;
			const localY = position.y - currentMousePoint.y;
			const localZ = position.z - currentMousePoint.z;
			const distance = Math.sqrt(localX * localX + localY * localY + localZ * localZ);

			// falloff
			const influence = MathUtils.clamp(1 - distance / influenceRadius, 0, 1);
			const smoothInfluence = influence * influence * (3 - 2 * influence);

			// wave
			const wave = Math.sin(distance * 5.0 - time * 3.0);

			// noise
			const organicNoise = noise3D(localX * 0.5 + time * 0.1, localY * 0.5 + time * 0.1, localZ * 0.5 + time * 0.2);

			// displacement
			const noiseOffset = (wave * 0.12 + organicNoise * 0.025) * smoothInfluence * strength;

			dummy.position.copy(position).addScaledVector(normal, noiseOffset);
			dummy.quaternion.copy(quaternion);
			dummy.scale.set(1, 1 + noiseOffset * 6, 1);
			dummy.updateMatrix();
			mesh.setMatrixAt(i, dummy.matrix);
		}

		mesh.instanceMatrix.needsUpdate = true;
	});

	// jsx
	const material = useMemo(() => CreviceGlowMaterial(), []);

	return (
		<instancedMesh
			ref={meshRef}
			args={[undefined, undefined, count]}
			material={material}
			onPointerEnter={(e) => {
				e.stopPropagation();

				if (e.instanceId === undefined) return;

				material.uniforms.uHoveredInstance.value = e.instanceId;
			}}
			onPointerLeave={(e) => {
				e.stopPropagation();

				material.uniforms.uHoveredInstance.value = -1;
			}}
		>
			<capsuleGeometry args={[0.09, 0.45, 12, 24]} />
		</instancedMesh>
	);
};
