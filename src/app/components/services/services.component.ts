import { Component } from '@angular/core';

interface ServiceItem {
  title: string;
  description: string;
  svgPath: string;
  features: string[];
  imagePath: string; // <-- Added this
}

@Component({
  selector: 'app-services',
  standalone: true,
  templateUrl: './services.component.html',
})
export class ServicesComponent {

  services: ServiceItem[] = [
    {
      title: 'Professional IT Services',
      description: 'Comprehensive IT consulting, deployment, and continuous support for modern infrastructure.',
      svgPath: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      features: ['IT Consulting', 'Implementation & Deployment', 'IT Support Services'],
      imagePath: 'services/service-it.jpg'
    },
    {
      title: 'Cloud & SaaS Solutions',
      description: 'Scalable cloud business applications engineered for high availability and growth.',
      svgPath: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
      features: ['Hosting & SaaS', 'IaaS & PaaS', 'Cloud Backup'],
      imagePath: 'services/service-cloud.jpg'
    },
    {
      title: 'Cybersecurity Solutions',
      description: 'Protecting businesses from advanced cyber threats with multi-layered digital defenses.',
      svgPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      features: ['Firewalls & UTM', 'Antivirus & EDR', 'Endpoint Protection'],
      imagePath: 'services/service-cyber.jpg'
    },
    {
      title: 'Backup & Disaster Recovery',
      description: 'Safeguarding critical business data with comprehensive backup and continuity plans.',
      svgPath: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
      features: ['Data Backup', 'Disaster Recovery Strategy', 'Data Protection Services'],
      imagePath: 'services/service-backup.jpg'
    },
    {
      title: 'Automation & DevOps',
      description: 'Accelerating innovation and operational speed with RPA, CI/CD, and workflow automation.',
      svgPath: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      features: ['RPA & Workflow Automation', 'CI/CD Platforms', 'Version Control Tools'],
      imagePath: 'services/service-devops.jpg'
    },
    {
      title: 'IoT & Smart Surveillance',
      description: 'Advanced networking solutions for smart cities, industrial monitoring, and secure CCTV.',
      svgPath: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
      features: ['CCTV & Security Integration', 'Industrial IoT', 'Plant Monitoring'],
      imagePath: 'services/service-iot.jpg'
    }
  ];
}