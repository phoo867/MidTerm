import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Creature } from '../creature';
import { CreatureService } from '../creature.service';

@Component({
  selector: 'app-creature-search',
  templateUrl: './creature-search.component.html',
  styleUrl: './creature-search.component.css'
})

export class CreatureSearchComponent implements OnInit {

  creatures$!: Observable<Creature[]>;
  
  private searchTerms = new Subject<string>();

  constructor(private creatureService: CreatureService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.creatures$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.creatureService.searchCreatures(term)),
    );
  }
}
