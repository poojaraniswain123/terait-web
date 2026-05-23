import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { ServicesComponent } from './components/services/services.component';
import { WhyChooseUsComponent } from './components/why-choose-us/why-choose-us.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { CareersComponent } from './components/careers/careers.component';
import { FaqComponent } from './components/faq/faq.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    ServicesComponent,
    WhyChooseUsComponent,
    TestimonialsComponent,
    CareersComponent,
    FaqComponent,
    ContactComponent,
    FooterComponent
  ], // Add it here!
  template: `
    <app-header></app-header>
    <app-hero></app-hero>
    <app-services></app-services>
    <app-why-choose-us></app-why-choose-us>
    <app-testimonials></app-testimonials>
    <app-careers></app-careers> 
    <app-faq></app-faq>
    <app-contact></app-contact>
    <app-footer></app-footer>
    `,
})
export class AppComponent {
  title = 'terait-web';
}
