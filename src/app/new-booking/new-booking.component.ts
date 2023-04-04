import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.scss']
})
export class NewBookingComponent {
  parentForm = this._formBuilder.group({
    // firstCtrl: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder) {}

  bookHotel(){
    console.log(this.parentForm.value)
  }
}
