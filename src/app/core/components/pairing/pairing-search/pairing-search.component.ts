import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { firstValueFrom, map, Observable } from 'rxjs';
import { WineQueryService } from '../../../services/wine-query.service';
import { SearchState } from '../../../services/wine-query.service';
import { GlobalStateService } from 'src/app/core/services/global-state.service';
import { FormControl, Validators } from '@angular/forms';
import gsap from 'gsap';

@Component({
  selector: 'app-pairing-search',
  templateUrl: './pairing-search.component.html',
  styleUrls: ['./pairing-search.component.css']
})
export class PairingSearchComponent implements OnInit {
    dropdownOpen: boolean = false;
    searchSuggestionsOpen: boolean = false;
    readonly DROPDOWN_OPTIONS: Array<'Wine to Dish' | 'Dish to Wine'> = ["Dish to Wine"]
    searchState$: Observable<SearchState>
    isLoading$: Observable<boolean>
    queryHistory$: Observable<string[]>
    @Output() search = new EventEmitter()
    @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;
    @ViewChild('dropdownButton') dropdownButton!: ElementRef;
    @ViewChild('mainHeading') mainHeading!: ElementRef;
    @ViewChild('subHeading') subHeading!: ElementRef;
    searchInput = new FormControl('', { 
        updateOn: 'blur' , 
        validators: [Validators.minLength(2), Validators.required]
    })
    
    constructor(
        private wineQueryService: WineQueryService,
        private globalState: GlobalStateService,
    ) {
        this.searchState$ = this.wineQueryService.getSearchState()
    }
    
    async ngOnInit() {
        this.isLoading$ = this.globalState.getLoadingState()
        this.queryHistory$ = this.globalState.getQueryHistory()
        const queryResultData = await firstValueFrom(this.globalState.getPairingResultsState())
        if (queryResultData && queryResultData.dish) {
            this.setSearchInput(queryResultData.dish)
        }
        this.animateText()
    }

    toggleDropdown(): void {
        this.dropdownOpen = !this.dropdownOpen;
    }

    chooseOptions(option: 'Wine to Dish' | 'Dish to Wine') {
        this.wineQueryService.updateSearchSate(option)
        this.dropdownOpen = false
    }

    getPair(query: string) {
        this.setSearchInput(query)
        if (this.searchInput.valid) {
            this.search.emit(query)
            this.searchInput.setErrors(null)
        } else {
            this.searchInput.setErrors({ required: true })
        }
    }

    handleFocus(event) {
        switch (event.type) {
            case 'focus': this.searchSuggestionsOpen = true; break
            case 'blur': this.searchSuggestionsOpen = false; break
        }
    }

    setSearchInput(value: string) {
        this.searchInput.setValue(value)
    }

    animateText() {
        gsap.timeline()
            .from(this.mainHeading.nativeElement, { duration: 0.5, delay: 0.3, opacity: 0, y: 30 })
            .from(this.subHeading.nativeElement, { duration: 0.5, opacity: 0, y: 30 }, '<0.3')
    }
}
