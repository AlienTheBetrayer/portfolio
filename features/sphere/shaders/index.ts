import { preprocessGLSL } from "@/shared/lib/preprocess";
import creviceFragment from "./crevice.frag";
import creviceVertex from "./crevice.vert";

const creviceFragmentShader = preprocessGLSL(creviceFragment);
const creviceVertexShader = preprocessGLSL(creviceVertex);

export { creviceFragmentShader, creviceVertexShader };
