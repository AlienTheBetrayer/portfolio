/* eslint-disable react-hooks/immutability */
"use client";

import { CreviceGlowMaterial } from "@/features/sphere/materials/CreviceGlowMaterial";
import { useRef, useMemo, useLayoutEffect } from "react";
import { InstancedMesh, Object3D, Vector3 } from "three";

export const Spheres = ({ count = 1200 }: { count?: number }) => {
  // vars
	const meshRef = useRef<InstancedMesh>(null!);
	const dummy = useMemo(() => new Object3D(), []);

  // fibonacci displacement
	useLayoutEffect(() => {
    if (!meshRef.current) {
      return;
    }

		const phi = Math.PI * (3 - Math.sqrt(5));
		const radius = 2.2;

		for (let i = 0; i < count; i++) {
			const y = 1 - (i / (count - 1)) * 2;
			const radiusAtY = Math.sqrt(1 - y * y);
			const theta = phi * i;

			const x = Math.cos(theta) * radiusAtY * radius;
			const posY = y * radius;
			const z = Math.sin(theta) * radiusAtY * radius;

			dummy.position.set(x, posY, z);

			const target = new Vector3(x * 2, posY * 2, z * 2);
			dummy.lookAt(target);
			dummy.rotateX(Math.PI / 2); 

			dummy.updateMatrix();
			meshRef.current.setMatrixAt(i, dummy.matrix);
		}

		meshRef.current.instanceMatrix.needsUpdate = true;
	}, [count, dummy]);

  // matierla
	const material = useMemo(() => CreviceGlowMaterial(), []);

  // jsx
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
