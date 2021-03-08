import { Component, OnInit } from '@angular/core';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faPinterest } from '@fortawesome/free-brands-svg-icons/faPinterest';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import { fadeInUpAnimation } from '../../../@fury/animations/fade-in-up.animation';

@Component({
  selector: 'fury-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss'],
  animations: [fadeInUpAnimation]
})
export class ComingSoonComponent implements OnInit {

  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faPinterest = faPinterest;
  faGithub = faGithub;

  constructor() { }

  ngOnInit() {
  }

}
