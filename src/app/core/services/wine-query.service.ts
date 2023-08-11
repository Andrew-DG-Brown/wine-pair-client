import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, delay, throwError, map } from 'rxjs';
import { environment } from 'src/environment/environment';
import { SimpleResponse, ComplexResponse, FoodPair, ErrorRes } from '../interfaces/wine-query.models';
import { searchStateOptions } from './configs/search-state-options'

export interface SearchState { placeholder: string; queryType: string; dropdownValue: string, url: string }

@Injectable({
  providedIn: 'root',
})
export class WineQueryService {
  private readonly SEARCH_STATE_OPTIONS = searchStateOptions;
  private querySearchState$: BehaviorSubject<SearchState> = new BehaviorSubject(
    this.SEARCH_STATE_OPTIONS['Dish to Wine']
  );
  private pairingResult$: Observable<any> = new Observable<any>();

  constructor(private http: HttpClient) {}

  updateSearchSate(queryType: 'Wine to Dish' | 'Dish to Wine'): void {
    this.querySearchState$.next(this.SEARCH_STATE_OPTIONS[queryType])
  }

  getSearchState(): Observable<SearchState> {
    return this.querySearchState$
  }

  getPairing(query: string) {
    const url = this.querySearchState$.getValue().url
    const params = url.includes('wine') ? { dish: query } : { wine: query }
    this.pairingResult$ = this.http.get<SimpleResponse | ComplexResponse | FoodPair | ErrorRes>(url, { params: params })
    .pipe();
    return this.pairingResult$

    // === Example complex wine result ===
    
      // return of({
      //   "paired_wines": [
      //       {
      //           "wine_name": "Pinot Noir",
      //           "image_url": "https://media.winefolly.com/Pinot-Noir-wine-tasting-WineFolly.jpg",
      //           "link": "https://winefolly.com/grapes/pinot-noir/",
      //           "description": "Pinot Noir is the world’s most popular light-bodied red wine. It’s loved for its red fruit, flower, and spice aromas that are accentuated by a long, smooth finish."
      //       },
      //       {
      //           "wine_name": "Merlot",
      //           "image_url": "https://media.winefolly.com/Merlot-wine-tasting-WineFolly.jpg",
      //           "link": "https://winefolly.com/grapes/merlot/",
      //           "description": "Merlot is loved for it’s boisterous black cherry flavors, supple tannins, and chocolatey finish. On the high end, it’s often mistaken with Cabernet Sauvignon and commonly blended with it."
      //       },
      //       {
      //           "wine_name": "Cabernet Sauvignon",
      //           "image_url": "https://media.winefolly.com/Cabernet-Sauvignon-wine-tasting-WineFolly.jpg",
      //           "link": "https://winefolly.com/grapes/cabernet-sauvignon/",
      //           "description": "The world’s most popular red wine grape is a natural cross between Cabernet Franc and Sauvignon Blanc from Bordeaux, France. Cabernet Sauvignon is loved for its high concentration and age worthiness."
      //       }
      //   ],
      //   "pairing_text": "Pinot Noir, Merlot, and Cabernet Sauvignon are great choices for Steak. After all, beef and red wine are a classic combination. Generally, leaner steaks go well with light or medium-bodied reds, such as pinot noir or merlot, while fattier steaks can handle a bold red, such as cabernet sauvingnon. The Flowers Sea View Ridge Estate Pinot Noir with a 4.6 out of 5 star rating seems like a good match. It costs about 67 dollars per bottle.",
      //   "product_matches": [
      //       {
      //           "id": 7112936,
      //           "title": "Flowers Sea View Ridge Estate Pinot Noir",
      //           "description": "Deep red color with a brick rim. Aromas are floral and fruit dominant consisting of raspberry and bing cherry with subtle\nhints of cedar, allspice and anise. The whole cluster element provides spiciness on the palate with smooth texture and\nhints of minerality that leads to an acid-driven lingering finish.",
      //           "price": "$66.99",
      //           "imageUrl": "https://spoonacular.com/productImages/7112936-312x231.jpg",
      //           "averageRating": 0.9199999999999999,
      //           "ratingCount": 11,
      //           "score": 0.8905882352941176,
      //           "link": "https://click.linksynergy.com/deeplink?id=*QCiIS6t4gA&mid=2025&murl=https%3A%2F%2Fwww.wine.com%2Fproduct%2Fflowers-sea-view-ridge-estate-pinot-noir-2011%2F128557"
      //       }
      //   ],
      //   "dish": "Steak",
      //   "maxPrice": null,
      //   "type": "complex"
      // }).pipe(delay(2000))

    // === Example Error wine result ==
    // return of({ error: "Couldn't find pairing for Cheesefsdfd", dish: 'Cheesefsdfd' }).pipe(delay(2000))

    // === Example simple wine result ===
    return of(
      {
        pairing: [
          {
            wine_name: 'Chardonnay',
            image_url: 'https://media.winefolly.com/Chardonnay-wine-tasting-WineFolly.jpg',
            link: 'https://winefolly.com/grapes/chardonnay/',
            description: 'Chardonnay is now the most widely planted white grape variety, globally. Chardonnay is a major grape in Champagne, and other sparkling wines.',
            foodquery: 'Cheese',
            pairdescription: 'A full-bodied white wine with notes of butter, oak, and tropical fruit, making it a great pairing for creamy cheeses.',
            pairname: 'Chardonnay',
            id: 110
          },
          {
            wine_name: 'Sauvignon Blanc',
            image_url: 'https://media.winefolly.com/Sauvignon-Blanc-wine-tasting-WineFolly.jpg',
            link: 'https://winefolly.com/grapes/sauvignon-blanc/',
            description: 'A popular and unmistakable white wine that’s loved for its “green” herbal flavors and racy acidity. Sauvignon Blanc grows nearly everywhere and thus, offers a variety of styles ranging from lean to bountiful.',
            foodquery: 'Cheese',
            pairdescription: 'A crisp white wine with citrus and herbal notes, making it a great pairing for fresh, soft cheeses.',
            pairname: 'Sauvignon Blanc',
            id: 112
          },
          {
            wine_name: 'Pinot Noir',
            image_url: 'https://media.winefolly.com/Pinot-Noir-wine-tasting-WineFolly.jpg',
            link: 'https://winefolly.com/grapes/pinot-noir/',
            description: 'Pinot Noir is the world’s most popular light-bodied red wine. It’s loved for its red fruit, flower, and spice aromas that are accentuated by a long, smooth finish.',
            foodquery: 'Cheese',
            pairdescription: 'A light-bodied red wine with notes of cherry, raspberry, and earth, making it a great pairing for aged cheeses.',
            pairname: 'Pinot Noir',
            id: 111
          }
        ],
        dish: 'Cheese',
        maxPrice: null,
        type: 'simple'
      }
    ).pipe(delay(3000))
  }

  getPairingResult() {
    return this.pairingResult$
  }
}
