import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AuthorisationEntity {

  @Column()
  email: string;

  @Column()
  date: Date;

  @Column()
  teamId: number;

}

export const authorisationSchema = {
  name: { type: "string", required: true, example: "Tour de San Luis" },
  date: { type: "date", required: true, example: "18-01-2024"},
  location: { type: "string", required: true, example: "Argentina" }
};
