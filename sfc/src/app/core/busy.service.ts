import { ReplaySubject } from 'rxjs';

export interface BusyPayload {
  isBusy: boolean;
  message?: string;
}
const notBusyPayload: BusyPayload = { isBusy: false };

const subject = new ReplaySubject<BusyPayload>();
let busyCounter = 0;
const busyState$ = subject.asObservable();

const increment = (message: string) => {
  busyCounter++;
  const payload: BusyPayload = { isBusy: true, message };
  subject.next(payload);
};

const decrement = () => {
  busyCounter--;
  if (busyCounter <= 0) {
    subject.next(notBusyPayload);
  }
};
export { increment, decrement, busyState$ };
