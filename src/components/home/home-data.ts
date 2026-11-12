import type { LapOutline } from "@/lib/home/lap-outline";

/**
 * How far a circuit or car can be trusted, in the two kinds the home page shows (from the registries' `quality`):
 * - "sim": a circuit built for LibreCorsa or hand-built for sims, with its own surfaces; a car on physics built for it
 * - "model": a circuit converted from a community 3D model; a car's 3D body driving on another car's physics
 */
export type HomeGrade = "sim" | "model";

export const GRADE_BADGES: Record<HomeGrade, { label: string; color: string }> = {
  sim: { label: "Sim grade", color: "#00E676" },
  model: { label: "3D model", color: "#FFB300" },
};

/** The legend above the circuit and car cards, and each badge's hover text */
export const GRADE_NOTES: Record<"circuits" | "cars", Record<HomeGrade, string>> = {
  circuits: {
    sim: "Hand-built road, kerbs and barriers, each with its own grip.",
    model: "Converted from a 3D model of the venue, so details can differ from the real one.",
  },
  cars: {
    sim: "Physics built for this car.",
    model: "This car's body, driving on another car's physics.",
  },
};

/** What the home page is built with: the game's own lists, read when the page is built */
export interface HomeLayout {
  id: string;
  layout: string;
  lengthM: number;
  turns: number;
  grade: HomeGrade;
  /** null when the outlines file has none for it (`npm run home-outlines`) */
  outline: LapOutline | null;
}

export interface HomeVenue {
  name: string;
  country: string;
  layouts: HomeLayout[];
}

export interface HomeCar {
  id: string;
  title: string;
  classTitle: string;
  year: number;
  grade: HomeGrade;
  /** null when this copy of the game has no picture of it */
  thumb: string | null;
}

export interface HomeData {
  defaultTrackId: string;
  defaultCarId: string;
  venues: HomeVenue[];
  cars: HomeCar[];
  repoUrl: string;
}

export const km = (l: Pick<HomeLayout, "lengthM">): string => (l.lengthM / 1000).toFixed(2);

/** What is in this Grindline build today */
export const GAME_FACTS: readonly [label: string, text: string][] = [
  ["Physics", "Simulated 500 times a second, with tyre temperatures, active aero and hybrid power"],
  ["Racing", "Practice sessions and offline races against AI"],
  ["Controls", "Touch steering and pedals, tilt steering, or a gamepad"],
  ["Platform", "Installed, fullscreen Android game"],
  ["Conditions", "Your choice of weather and time of day"],
  ["Progress", "Local settings and lap history; career and teams are in development"],
];
