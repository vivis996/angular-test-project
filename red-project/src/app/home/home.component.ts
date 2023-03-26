import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, Observable, Observer } from 'rxjs';
import { map, filter } from 'rxjs/operators';

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
    const customIntervalObservable: Observable<number> = Observable.create((observer: Observer<number>) => {
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

    this.firstObsSuscription = customIntervalObservable.pipe(filter(data => {
      return data > 0;
    }),
    map((data: number) => {
      return 'Round: ' + (data + 1);
    })).subscribe((data: string) => {
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
