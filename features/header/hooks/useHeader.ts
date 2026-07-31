"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RefObject } from "react";

gsap.registerPlugin(useGSAP);

export const useHeader = (headerRef: RefObject<HTMLDivElement | null>) => {
	useGSAP(
		() => {
			if (!headerRef.current) {
				return;
			}

			gsap.to(
				headerRef.current,

				{
					top: 12,
					ease: "power3.inOut",
					duration: 1,
					delay: 3,
				},
			);
		},
		{ scope: headerRef },
	);
};
