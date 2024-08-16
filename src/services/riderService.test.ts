import { riderService } from './riderService'


test('Gives all riders', () => {
    expect(riderService.getAllRiders()).toBe(
        [
            { riderId: 1, nationality: 'Poland', last_name: 'Niewiadoma', first_name: 'Katarzyna', birthday: new Date('1994-09-29'), points: 10763, teamId: 1, monthly_wage: 50047.57 },
            { riderId: 2, nationality: 'Australia', last_name: 'Cromwell', first_name: 'Tiffany', birthday: new Date('1988-07-06'), points: 3604, teamId: 1, monthly_wage: 7192.01 },
            { riderId: 3, nationality: 'Italy', last_name: 'Paladin', first_name: 'Soraya', birthday: new Date('1994-04-11'), points: 3372, teamId: 1, monthly_wage: 6517.66 },
        ]
    );
});