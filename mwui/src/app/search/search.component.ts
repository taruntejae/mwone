import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  appForm: FormGroup = null;
  filteredBanks: any[] = [
    {
      name: 'HDFC',
    },
    {
      name: 'INDIAN',
    },
    {
      name: 'AXIS',
    },
    {
      name: 'ICICI',
    },
  ];

  constructor(public fb: FormBuilder, ) {
    this.appForm = this.fb.group({
      bankCtrl: this.fb.control("", {}),
      bankFilterCtrl: this.fb.control("", {}),
    });
  }

  get searchInput() {
    return this.appForm.get('bankFilterCtrl');
  }
  get searchSelect(){
    return this.appForm.get('bankCtrl');
  }

  ngOnInit() {
    /* Set initial value */
    this.searchSelect.setValue([this.filteredBanks[0]]);
    /* Set initial options */
    /*  */
    
    /* Subscribe for changes */
    this.searchInput.valueChanges.subscribe((val) => {
      console.log(val);
    });
  }

}
