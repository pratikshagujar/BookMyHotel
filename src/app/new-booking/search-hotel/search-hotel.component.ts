import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControlDirective,AbstractControl, FormGroup, FormGroupDirective, FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-search-hotel',
  templateUrl: './search-hotel.component.html',
  styleUrls: ['./search-hotel.component.scss']
})
export class SearchHotelComponent implements OnInit {
searchHotel!:FormGroup;
parentForm!:FormGroup;

  options: string[] = ['Pune', 'Mumbai', 'Delhi'];
  filteredOptions!: Observable<string[]>;
constructor(private fb:FormBuilder,private formContainer:FormGroupDirective){}

ngOnInit():void{

  this.createForm();
  this.parentForm=this.formContainer.form;
  if(this.parentForm){
    this.parentForm.addControl("searchHotel",this.searchHotel);
  }

  this.filteredOptions = this.searchHotel.controls["city"].valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value || '')),
  );
}
private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.options.filter(option => option.toLowerCase().includes(filterValue));

}

// getCityNames(value:string){
//   const endPoint="hotels? cityName="+value;
//   this.http.getDataFromServer(endPoint).subscribe((response:any)=>{
//     this.filteredOptions=response;
//   })
// }

createForm(){
  this.searchHotel=this.fb.group({
   "city":[''],
    "checkInDate":[''],
    "checkOutDate":[''],
    "adults":[1],
    "childrens":[1]
  })
}
saveForm(){
  console.log(this.searchHotel.value);
  console.log(this.parentForm.value)
}

adultChange(type:string){
if(type=='Increment'){
  this.searchHotel.controls['adults'].setValue(this.searchHotel.controls['adults'].value-1)
}else{
  this.searchHotel.controls['adults'].setValue(this.searchHotel.controls['adults'].value+1)
}
}

childrenChange(type:string){
  if(type=='Increment'){
    this.searchHotel.controls['childrens'].setValue(this.searchHotel.controls['childrens'].value-1)
  }else{
    this.searchHotel.controls['childrens'].setValue(this.searchHotel.controls['childrens'].value+1)
  }
  }
}
