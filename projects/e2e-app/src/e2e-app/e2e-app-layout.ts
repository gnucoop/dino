import {Component, ViewEncapsulation} from '@angular/core';

@Component({selector: 'home', template: `<p>e2e website!</p>`, standalone: false})
export class Home {}

@Component({
  selector: 'e2e-app-layout',
  templateUrl: 'e2e-app-layout.html',
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class E2eAppLayout {
  showLinks = false;

  navLinks = [
    {path: 'mat-list', title: 'Material - List'},
    {path: 'mat-login', title: 'Material - Login'},
    {path: 'list-example', title: 'List Example'},
    {path: 'filters-example', title: 'Filter Widgets Example'},
  ];
}
