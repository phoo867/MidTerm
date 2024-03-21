import { Component, OnInit } from '@angular/core';
import { Creature } from '../creature';
import { CreatureService } from '../creature.service';

@Component({
  selector: 'app-creatures',
  templateUrl: './creatures.component.html',
  styleUrls: ['./creatures.component.css'],
})
export class CreaturesComponent implements OnInit {
  creatures: Creature[] = [];

  constructor(private creatureService: CreatureService) {}

  ngOnInit(): void {
    this.getCreatures();
  }

  getCreatures(): void {
    this.creatureService.getCreatures()
      .subscribe(creatures => this.creatures = creatures);
  }

  add(name: string, description: string, habitat: string): void {
    name = name.trim();
    description = description.trim();
    habitat = habitat.trim();
    if (!name || !description || !habitat) { return; }
    this.creatureService.addCreature({ name, description, habitat } as Creature)
      .subscribe(creature => {
        this.creatures.push(creature);
      });
  }

  delete(creature: Creature): void {
    if (creature._id) {
      this.creatures = this.creatures.filter(c => c._id !== creature._id);
      this.creatureService.deleteCreature(creature._id).subscribe();
    } else {
      console.error('Attempted to delete a creature without a valid _id', creature);
    }
  }
  
}


