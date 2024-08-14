import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { TeamEntity } from "./team";

@Entity()
export class RiderEntity {
  @PrimaryGeneratedColumn()
  riderId: number;

  @Column()
  nationality: string;

  @Column()
  last_name: string;

  @Column()
  first_name: string;

  @Column()
  birthday: Date;

  @Column({ nullable: true })
  points: number;
  
  @Column({ nullable: true })
  monthly_wage: number;

  @Column()
  teamId: number;

  @ManyToOne(() => TeamEntity, team => team.riders)
  @JoinColumn({ name: "teamId" })
  team: TeamEntity;

}


export const riderSchema = {
  first_name: { type: "string", required: true, example: "Lance" },
  last_name: { type: "string", required: true, example: "Armstrong" },
  nationality: { type: "string", required: true, example: "United States" },
  birthday: { type: "date", required: true, example: "1-1-2000"},
  points: { type: "number", required: false, example: 354 },
  monthly_wage: { type: "number", required: true, example: 220000 },
  teamId: { type: "number", required: true, example: 2 }
};
