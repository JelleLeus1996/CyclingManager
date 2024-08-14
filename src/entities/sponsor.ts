import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { TeamEntity } from "./team";

@Entity()
export class SponsorEntity {
  @PrimaryGeneratedColumn()
  sponsorId: number;

  @Column()
  name: string;

  @Column()
  industry: string;
  
  @Column({ nullable: true })
  contribution: number;

  @Column()
  teamId: number;

  @ManyToOne(() => TeamEntity, team => team.riders)
  @JoinColumn({ name: "teamId" })
  team: TeamEntity;

}


export const sponsorSchema = {
  name: { type: "string", required: true, example: "EY" },
  industry: { type: "string", required: true, example: "Consulting" },
  contribution: { type: "number", required: true, example: 7500000 },
  teamId: { type: "number", required: true, example: 4 }
};
