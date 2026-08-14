"use client";

import { preprocessGLSL } from "@/shared/lib/preprocess";
import fluidFragment from "./fluid.frag";
import fluidVertex from "./fluid.vert";
import advectionVertex from "./advection.vert";
import advectionFragment from "./advection.frag";

const fluidFragmentShader = preprocessGLSL(fluidFragment);
const fluidVertexShader = preprocessGLSL(fluidVertex);
const advectionFragmentShader = preprocessGLSL(advectionFragment);
const advectionVertexShader = preprocessGLSL(advectionVertex);

export { fluidFragmentShader, fluidVertexShader, advectionFragmentShader, advectionVertexShader };
