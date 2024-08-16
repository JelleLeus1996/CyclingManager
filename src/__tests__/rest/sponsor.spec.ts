import supertest from "supertest";
import createServer from '../../createServer'
const app = createServer();
describe('sponsor', () =>
{
    describe('get sponsor route', () =>{
        describe('given the sponsor does not exist', () =>
        {
          it("should return a 404", async () => {
            const sponsorId = '935'

            await supertest(app).get(`/api/get/sponsors/${sponsorId}`)
            .expect(404)
          });
        });
    });
});