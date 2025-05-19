import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-global-error',
  templateUrl: './global-error.component.html',
  styleUrls: ['./global-error.component.scss']
})
export class GlobalErrorComponent  implements OnInit {
  message: string | null = null;
  @ViewChild('errorBox') errorBoxRef!: ElementRef;

  constructor(private errorService: ErrorService) {}

  ngOnInit(): void {
    this.errorService.error$.subscribe(msg => {
      this.message = msg;
      setTimeout(() => {
        if (this.errorBoxRef) {
          gsap.fromTo(this.errorBoxRef.nativeElement,
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'elastic.in'
            }
          );
        }
      });

      setTimeout(() => this.message = null, 4000);
    });
  }
}
