import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { WhyChooseUsComponent } from '../../components/why-choose-us/why-choose-us.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { FaqComponent } from '../../components/faq/faq.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, WhyChooseUsComponent, TestimonialsComponent, FaqComponent],
  template: `
    <app-hero></app-hero>
    <app-why-choose-us></app-why-choose-us>
    <app-testimonials></app-testimonials>
    <app-faq></app-faq>
  `
})
export class HomeComponent { }