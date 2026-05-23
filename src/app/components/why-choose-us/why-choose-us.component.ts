import { Component } from '@angular/core';

interface Reason {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  templateUrl: './why-choose-us.component.html'
})
export class WhyChooseUsComponent {

  reasons: Reason[] = [
    {
      title: 'Certified IT Engineers',
      description: 'Our team consists of highly skilled and certified professionals ensuring top-tier implementation.',
      // Shield check icon
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
    },
    {
      title: 'Fast Installation',
      description: 'We prioritize quick and efficient setup workflows to completely minimize your business downtime.',
      // Lightning bolt icon
      icon: 'M13 10V3L4 14h7v7l9-11h-7z'
    },
    {
      title: 'Affordable Solutions',
      description: 'Providing high-quality, scalable IT infrastructure and services at highly competitive price points.',
      // Currency/Chart icon
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    }
  ];
}