import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed for basic directives

interface FAQ {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html'
})
export class FaqComponent {

  faqs: FAQ[] = [
    {
      question: 'WHAT IT SERVICES DOES TERAIT TECHNOLOGIES PROVIDE?',
      answer: 'Terait Technologies specializes in IT networking, CCTV installation, server setup, hardware supply (laptops, printers, etc.), and UPS power backup solutions.',
      isOpen: true // First one open by default
    },
    {
      question: 'WHERE IS TERAIT TECHNOLOGIES LOCATED?',
      answer: 'We are headquartered at #24, 100 Feet Rd, HRBR Layout 1st Block, Banaswadi, Bengaluru, Karnataka 560043. We primarily serve businesses across the Bangalore region.',
      isOpen: false
    },
    {
      question: 'DO YOU PROVIDE AFTER-INSTALLATION SUPPORT?',
      answer: 'Yes, absolutely. We believe in long-term partnerships. We provide comprehensive maintenance contracts, continuous monitoring, and reliable after-sales support to ensure your infrastructure runs smoothly.',
      isOpen: false
    }
  ];

  toggleFaq(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}