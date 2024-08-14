import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { TeamEntity } from "./team";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  email: string;  
  
  @Column()
  password_hash: string;

  @Column()
  roles: string;

  @Column()
  teamId: number;

  @ManyToOne(() => TeamEntity, team => team.riders)
  @JoinColumn({ name: "teamId" })
  team: TeamEntity;

}

export const userSchema = {
  email: { type: "string", required: true, example: "john.doe@hotmail.com" },
  password: { type: "string", required: true, example: "Password" },
};
