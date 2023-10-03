// Sample data for countries, states, and cities
const countries = [
  { id: 1, name: 'Country 1' },
  { id: 2, name: 'Country 2' },
  // Add more countries as needed
];

const states = [
  { id: 1, name: 'State 1', countryId: 1 }, // Associate states with countries using the countryId
  { id: 2, name: 'State 2', countryId: 1 },
  { id: 3, name: 'State 3', countryId: 2 },
  // Add more states as needed
];

const cities = [
  { id: 1, name: 'City 1', stateId: 1 }, // Associate cities with states using the stateId
  { id: 2, name: 'City 2', stateId: 1 },
  { id: 3, name: 'City 3', stateId: 2 },
  // Add more cities as needed
];

export { countries, states, cities };
