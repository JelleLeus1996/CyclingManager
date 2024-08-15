import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RaceTeamEntity } from "./raceTeam";

@Entity()
export class RaceEntity {
  @PrimaryGeneratedColumn()
  raceId: number;

  @Column()
  name: string;

  @Column()
  date: Date;

  @Column()
  location: string;

  // In RaceEntity
  @OneToMany(() => RaceTeamEntity, raceTeam => raceTeam.race)
  raceTeams: RaceTeamEntity[];

}

export const raceSchema = {
  name: { type: "string", required: true, example: "Tour de San Luis" },
  date: { type: "date", required: true, example: "18-01-2024"},
  location: { type: "string", required: true, example: "Argentina" }
};
