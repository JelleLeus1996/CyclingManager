import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { RaceEntity } from "./race";
import { TeamEntity } from "./team";

@Entity()
export class RaceTeamEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RaceEntity, race => race.raceTeams)
  race: RaceEntity;

  @ManyToOne(() => TeamEntity, team => team.raceTeams)
  team: TeamEntity;
}