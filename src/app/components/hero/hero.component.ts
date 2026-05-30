import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Hero3DScene } from './hero-3d-scene';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas3d') canvasRef!: ElementRef<HTMLDivElement>;
  
  private scene3d: Hero3DScene | null = null;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser && this.canvasRef) {
      this.initScene();
    }
  }

  private async initScene(): Promise<void> {
    try {
      this.scene3d = new Hero3DScene({
        container: this.canvasRef.nativeElement,
        onReady: () => {
          console.log('3D scene initialized');
        }
      });
    } catch (error) {
      console.error('Failed to initialize 3D scene:', error);
    }
  }

  ngOnDestroy(): void {
    if (this.scene3d) {
      this.scene3d.dispose();
      this.scene3d = null;
    }
  }
}
