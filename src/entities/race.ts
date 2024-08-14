import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}

export const raceSchema = {
  name: { type: "string", required: true, example: "Tour de San Luis" },
  date: { type: "date", required: true, example: "18-01-2024"},
  location: { type: "string", required: true, example: "Argentina" }
};
