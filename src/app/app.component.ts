import { Component, OnInit } from '@angular/core';
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
import * as AOS from 'aos';
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
export class AppComponent implements OnInit {
  ngOnInit() {
    // Initialize the scroll animations
    AOS.init({
      duration: 800,      // How long the animation takes
      easing: 'ease-out', // Smooth timing function
      once: true,         // Elements animate only once when scrolling down
      offset: 100         // Trigger point (100px before the element hits the bottom of the screen)
    });
  }
}
