import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  // We would normally use Angular Reactive Forms here, 
  // but for the visual layout, we will keep it simple.

  contactInfo = {
    address: '#24, 100 Feet Rd, HRBR Layout 1st Block, Banaswadi, Bengaluru, Karnataka 560043',
    phones: ['099645 46464', '080 4336 4331'],
    email: 'sales@teraittech.com',
    hours: 'MON - SAT | 09:30 AM - 06:30 PM'
  };
}