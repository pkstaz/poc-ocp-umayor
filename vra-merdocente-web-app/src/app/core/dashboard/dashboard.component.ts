import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';
// const GRAPH_ENDPOINT = 'https://graph.microsoft-ppe.com/v1.0/me'; // PPE testing environment

type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	userData: string = 'john Doe';
  usuario: string = this.userData || 'Académic@';
  panelOpenState = false;
	profile!: ProfileType;

constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile;
      });
  }



}
