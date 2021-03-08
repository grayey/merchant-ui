import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { fadeInRightAnimation } from '../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../@fury/animations/fade-in-up.animation';

export interface Task {
  name: string;
}

@Component({
  selector: 'fury-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation]
})
export class DragAndDropComponent implements OnInit {

  todo = [
    {
      name: 'Meeting with Denis',
      due: 'tomorrow'
    },
    {
      name: 'Interview scheduled with Frank',
      due: 'in 2 days'
    },
    {
      name: 'Party at Rakesh\' house',
      due: 'this weekend'
    },
    {
      name: 'Interview with Nikita',
      due: 'next week'
    }
  ];

  done = [
    {
      name: 'Talk to Jennifer',
      due: 'today'
    },
    {
      name: 'Get stuff done',
      due: 'this weekend'
    },
    {
      name: 'Meet up with the new coworkers',
      due: 'next week'
    },
    {
      name: 'Have fun at work',
      due: 'next week'
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
