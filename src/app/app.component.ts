import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
declare var sessionStorage;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'spaceX';
  launchYearOptions: any = [
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020'
  ];
  missionList: any = [];
  selectedYearOption: string = null;
  selectedLaunchOption: string = null;
  selectedLandingOption: string = null;
  successfulLaunchOptions: any = ['True', 'False'];
  successfulLandingOptions: any = ['True', 'False'];

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
    if(sessionStorage) {
      this.selectedYearOption = JSON.parse(sessionStorage.getItem('selectedYearOption'));
      this.selectedLaunchOption = JSON.parse(sessionStorage.getItem('selectedLaunchOption'));
      this.selectedLandingOption = JSON.parse(sessionStorage.getItem('selectedLandingOption')); 
    }
    this.getSpaceXdata();
  }

  getSpaceXdata() {
    this.apiService.getSpaceXdata(this.selectedYearOption, this.selectedLaunchOption, this.selectedLandingOption)
    .subscribe(res => {
      // console.log(res);
      this.missionList = res;
    }, err => {
      console.log(err);
    });
  }

  onOptionClick(value, key) {
    if(this[key] == value) {
      this[key] = null;
    } else {
      this[key] = value;
    }
    if(window.sessionStorage) {
      sessionStorage.setItem('selectedYearOption', this.selectedYearOption);
      sessionStorage.setItem('selectedLaunchOption', this.selectedLaunchOption);
      sessionStorage.setItem('selectedLandingOption', this.selectedLandingOption);
    }
    this.getSpaceXdata();
  }
}
