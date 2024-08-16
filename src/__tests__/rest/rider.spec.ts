import { withServer, login, loginAdmin } from '../supertest.setup'
import { AppDataSource } from '../../core/connection_tests';
import { RiderEntity } from '../../entities/rider';

describe('RiderService', () => {
  let request;
  let authHeader: string;
  let authHeaderAdmin: string;

  withServer(({ request: r }) => {
    request = r;
  });

  beforeAll(async () => {
    authHeader = await login(request);
    authHeaderAdmin = await loginAdmin(request);
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('should return a rider by ID', async () => {
    const response = await request(app.callback()).get(`/api/riders/1`);
    expect(response.status).toBe(200);
    expect(response.body.items.length).toBe(1)
    expect(response.body.items[0]).toEqual({
        id:1, 
        nationality:'Poland', 
        last_name:'Niewiadoma', 
        first_name:'Katarzyna', 
        birthday:'1994-09-29', 
        points:10763, 
        teamId:1,
      });
  });

  it('should return all riders',async()=>{
    const response = await request(app.callback()).get(`/api/riders`);
    expect(response.status).toBe(200);
    expect(response.body.items.length).toBe(3)
    expect(response.body.items[0]).toEqual({
        id:1, 
        nationality:'Poland', 
        last_name:'Niewiadoma', 
        first_name:'Katarzyna', 
        birthday:'1994-09-29', 
        points:10763, 
        teamId:1,
      });
      expect(response.body.items[1]).toEqual({
        id:2, nationality:'Australia', last_name:'Cromwell', first_name:'Tiffany', birthday:'1988-07-06', points:3604, teamId:1
      });
      expect(response.body.items[2]).toEqual({
        id:3, nationality:'Italy', last_name:'Paladin', first_name:'Soraya', birthday:'1994-04-11', points:3372, teamId:1
      });
  })

  
  it('should return 404 if the rider is not found', async () => {
    const nonExistentRiderId = -1; // A non existsent rider id
    const response = await request(app.callback()).get(`/api/riders/${nonExistentRiderId}`);
    expect(response.status).toBe(404);
    expect(response.body.code).toBe('VALIDATION_FAILED');
  });

  describe('POST /api/riders', () => {
    const ridersToDelete = [];
         
    //create some rider data; no riders before, we will create it ourself
    beforeAll(async () => {
        await AppDataSource.initialize();
        app = await createServer();

    });
    afterAll(async () => {
     // Clean up the test rider
     const riderRepo = AppDataSource.getRepository(RiderEntity);
     await riderRepo.delete({ riderId: testRider.riderId });
 
     await AppDataSource.destroy();
    });
  
    const inputRider = [{
        'id':350, 
        'nationality':'Belgium', 
        'last_name':'Poppe', 
        'first_name':'Febe', 
        'birthday':'2000-07-14', 
        'points':0, 
        'teamId':1, 
        'monthly_wage':500.00 }
    ]
    it('should 201 and return the created rider', async () => {
        
        const response = await request(app.callback()).get(`/api/riders/${inputRider}`);
      expect(response.status).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.nationality).toBe('Belgium');
      expect(response.body.last_name).toBe('Poppe');
      expect(response.body.first_name).toBe('Febe');
      expect(response.body.points).toBe(0);
      expect(response.body.birthday).toBe('2000-07-14');
      expect(response.body.teamId).toBe('1');
      expect(response.body.monthly_wage).toBe(500.00);
      expect(response.body.rider_cost).toBe(1177803.13);
      
      ridersToDelete.push(response.body.id);
    });
  });
});
