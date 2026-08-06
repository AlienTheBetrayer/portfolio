"use client";

import { preprocessGLSL } from "@/shared/lib/preprocess";
import smokeFragment from "./smoke.frag";
import smokeVertex from "./smoke.vert";

const smokeFragmentShader = preprocessGLSL(smokeFragment);
const smokeVertexShader = preprocessGLSL(smokeVertex);

export { smokeFragmentShader, smokeVertexShader };
