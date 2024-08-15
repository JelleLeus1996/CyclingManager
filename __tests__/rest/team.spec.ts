/* import { Rider } from "../../src/models/rider";
import { Team } from "../../src/models/team";
import request from 'supertest';
import { AppDataSource } from '../../src/core/connection';
import { TeamEntity } from '../../src/entities/team';

const data = {
  riders: [
    {
      riderId: 1,
      nationality: "Poland",
      last_name: "Niewiadoma",
      first_name: "Katarzyna",
      birthday: new Date("1994-09-29"),
      points: 10763,
      teamId: 1,
      monthly_wage: 50047.57,
    },
    {
      riderId: 2,
      nationality: "Australia",
      last_name: "Cromwell",
      first_name: "Tiffany",
      birthday: new Date("1988-07-06"),
      points: 3604,
      teamId: 1,
      monthly_wage: 7192.01,
    },
    {
      riderId: 3,
      nationality: "Italy",
      last_name: "Paladin",
      first_name: "Soraya",
      birthday: new Date("1994-04-11"),
      points: 3372,
      teamId: 1,
      monthly_wage: 6517.66,
    },
  ] as Rider[],
  teams: [
    {
      teamId: 1,
      name: "CyclingTeam 1",
      country: "Germany",
      victories: 8,
      points: 5710,
      team_status: "WTW",
      abbreviation: "CSR",
      director: "Ronny Lauke",
      assistant: "Beth Duryea",
      representative: "Magnus Bäckstedt",
      bike: "Canyon",
      overhead_cost: 6500000.0,
    },
    {
      teamId: 2,
      name: "CyclingTeam 2",
      country: "Switzerland",
      victories: 0,
      points: 0,
      team_status: "UCI",
      abbreviation: "UCI",
      director: "David Lappartient",
      assistant: "Adam Hansen",
      representative: "Jelle Leus",
      bike: "Shimano",
      overhead_cost: 60000000,
    },
  ] as Team[],
};

const dataToDelete = {
    riders: [1, 2, 3],
    teams: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]
  };

  beforeAll(async () => {
    await AppDataSource.initialize();
    // Optionally, run any setup or seeding operations
  });

  afterAll(async () => {
    await AppDataSource.destroy();
    // Optionally, clean up the database
  });


  describe('TeamController', () => {
    describe('GET /teams', () => {
      it('should return all teams', async () => {
        const response = await request(app.callback()).get('/teams');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        // Add more expectations as needed
      });
  
      // Add more tests for other endpoints and scenarios
    });
  
    // Add tests for POST, PUT, DELETE, etc.
  });

 */