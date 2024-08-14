import { Role } from "./roles";

export interface Team {
  teamId?: number;
  name: string;
  country: string;
  victories?: number;
  points?: number;
  team_status: string;
  abbreviation: string;
  director: string;
  assistant?: string;
  representative?: string;
  bike: string;
  overhead_cost: number;
}
