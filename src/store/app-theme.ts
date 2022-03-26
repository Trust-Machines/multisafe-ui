import {atom} from "jotai";
import {PaletteMode} from "@mui/material";

export const appThemeAtom = atom<PaletteMode>("light");
