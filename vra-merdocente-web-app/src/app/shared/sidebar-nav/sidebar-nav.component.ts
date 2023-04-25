import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html'
})
export class SidebarNavComponent implements OnInit {

	constructor(private reouter: Router) { }

  ngOnInit(): void {
  }
}
