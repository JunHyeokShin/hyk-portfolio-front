import { LenisRef } from "lenis/react";
import { createContext, RefObject } from "react";

export type LenisRefObject = RefObject<LenisRef | null> | null;

const LenisRefContext = createContext<LenisRefObject>(null);

export default LenisRefContext;
