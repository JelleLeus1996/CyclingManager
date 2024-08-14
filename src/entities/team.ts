import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Role } from "../models/roles";
import { RiderEntity } from "./rider";
import { SponsorEntity } from "./sponsor";

@Entity()
export class TeamEntity {
  @PrimaryGeneratedColumn()
  teamId: number;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column({ nullable: true })
  victories: number;

  @Column({ nullable: true })
  points: number;

  @Column()
  team_status: string;

  @Column()
  abbreviation: string;

  @Column()
  director: string;

  @Column({ nullable: true })
  assistant: string;

  @Column({ nullable: true })
  representative: string;

  @Column()
  bike: string;

  @Column()
  overhead_cost: number;

  @OneToMany(() => RiderEntity, rider => rider.team)
  riders: RiderEntity[];

  @OneToMany(() => SponsorEntity, rider => rider.team)
  sponsors: SponsorEntity[];
}

export const teamSchema = {
  name: { type: "string", required: true, example: "Team Ineos" },
  country: { type: "string", required: true, example: "United Kingdom" },
  victories: { type: "number", required: false, example: 10 },
  points: { type: "number", required: false, example: 1000 },
  team_status: { type: "string", required: true, example: "UCI" },
  abbreviation: { type: "string", required: true, example: "INS" },
  director: { type: "string", required: true, example: "Dave Brailsford" },
  assistant: { type: "string", required: false, example: "Rod Ellingworth" },
  representative: { type: "string", required: false, example: "Chris Froome" },
  bike: { type: "string", required: true, example: "Pinarello" },
  overhead_cost: { type: "number", required: true, example: 1000000 },
};
