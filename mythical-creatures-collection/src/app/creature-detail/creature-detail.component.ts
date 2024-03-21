import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Creature } from '../creature';
import { CreatureService } from '../creature.service';

@Component({
  selector: 'app-creature-detail',
  templateUrl: './creature-detail.component.html',
  styleUrls: ['./creature-detail.component.css'],
})

export class CreatureDetailComponent {
  creature: Creature | undefined;

  constructor(
    private route: ActivatedRoute,
    private creatureService: CreatureService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getCreature();
  }

  getCreature(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.creatureService.getCreature(id)
        .subscribe({
          next: (creature) => this.creature = creature,
          error: (err) => console.error('Failed to get creature', err)
        });
    } else {
      console.error('No ID found in route');
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.creature) {
      this.creatureService.updateCreature(this.creature)
        .subscribe({
          next: () => this.goBack(),
          error: (err) => console.error('Update failed', err)
        });
    }
  }
}
