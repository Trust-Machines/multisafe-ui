import {atom} from "jotai";

export interface Todo {
    id: number,
    title: string,
    done: boolean
}

export const todosAtom = atom<Todo[]>([]);


export type Theme = "light" | "dark";
export const themeAtom = atom<Theme>("dark");