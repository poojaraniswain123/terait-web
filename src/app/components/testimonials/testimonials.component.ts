import { Component } from '@angular/core';

interface Testimonial {
  name: string;
  role: string;
  location: string;
  text: string;
  initials: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  templateUrl: './testimonials.component.html'
})
export class TestimonialsComponent {

  partners = [
    'VERTEX INNOVATIONS', 'SECURE NETWORKS', 'NEXUS TECHNOLOGIES', 'SOAR ENTERPRISES'
  ];

  testimonials: Testimonial[] = [
    {
      name: 'Rajesh Kumar',
      role: 'Business Owner',
      location: 'Bangalore',
      text: '"Terait helped us set up our office network and CCTV system perfectly. Their team is professional and highly skilled. The transition was seamless."',
      initials: 'RK'
    },
    {
      name: 'Suresh Raina',
      role: 'IT Manager',
      location: 'Bangalore',
      text: '"The server setup and networking provided by Terait exceeded our expectations. Reliable, efficient service with zero downtime during migration."',
      initials: 'SR'
    },
    {
      name: 'Meera Nair',
      role: 'Operations Head',
      location: 'Bangalore',
      text: '"Great after-support and quick installation. Terait Technologies is our absolute go-to partner for all things IT and infrastructure scaling."',
      initials: 'MN'
    }
  ];
}