import { environment } from 'src/environment/environment';

export const searchStateOptions = {
    'Wine to Dish': {
      placeholder: 'Enter a wine...',
      queryType: "dish",
      dropdownValue: 'Wine to Dish',
      url: `${environment.api.url}/food/food-pairing`
    },
    'Dish to Wine': {
      placeholder: 'Enter a dish...',
      queryType: "wine",
      dropdownValue: 'Dish to Wine',
      url: `${environment.api.url}/wine`
    },
  };