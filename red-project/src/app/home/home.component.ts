import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSuscription: Subscription;

  ngOnInit(): void {
    // this.firstObsSuscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });
    const customIntervalObservable = Observable.create((observer: Observer<number>) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count == 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater 3!'));
        }
        count++;
      }, 1000);
    });

    this.firstObsSuscription = customIntervalObservable.subscribe((data: number) => {
      console.log(data);
    }, (error: any) => {
      alert(error.message);
    }, () => {
      console.log('Completed!');
    });
  }

  ngOnDestroy(): void {
    this.firstObsSuscription.unsubscribe();
  }
}
