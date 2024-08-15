// Functie om 4 willekeurige continentale teams te kiezen
export function getRandomContinentalTeamIds(contiTeams: (number|undefined)[], numberOfTeams: number){
    let selectedIds = [];
    while (selectedIds.length < numberOfTeams)
    {
      const randomIndex = Math.floor(Math.random()*contiTeams.length);
      selectedIds.push(contiTeams.splice(randomIndex,1)[0])
    }
    return selectedIds
  }

