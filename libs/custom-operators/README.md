# @btapai/custom-rxjs-operators

A collection of useful rxjs operators created by [Balázs Tápai](https://tapaibalazs.dev).

## FILO Queue

First in, last out queue operator.

```typescript
import { timer, from } from 'rxjs';
import { take } from 'rxjs/operators';
import { filoQueue } from '@btapai/custom-rxjs-operators';

const source$ = from([1, 2, 3, 4, 5]);
const emitter$ = timer(0, 1000).pipe(take(6));

source$.pipe(filoQueue(emitter$)).subscribe(res => {
  console.log(res);
});
// emits in reverse order:
// 5 after 1 sec
// 4 after 2 sec
// 3 after 3 sec
// 2 after 4 sec
// 1 after 5 sec
// undefined
```

Takes a source observable, and an emitter observable. The result observable emits every time when the emitter observable emits. It always emits the value that was last added to the queue.

If the queue is empty, but the emitter emits, the result observable emits undefined.

If the `emitQueue` property in the passed configuration is set to true, the result observable emits every time when the queue changes.

```typescript
import { timer, from } from 'rxjs';
import { take } from 'rxjs/operators';
import { filoQueue } from '@btapai/custom-rxjs-operators';

const source$ = from([1, 2, 3, 4, 5]);
const emitter$ = timer(0, 1000).pipe(take(6));

source$.pipe(filoQueue(emitter$, { emitQueue: true })).subscribe(res => {
  console.log(res);
});

// [1]
// [1, 2]
// [1, 2, 3]
// [1, 2, 3, 4]
// [1, 2, 3, 4, 5]
// [1, 2, 3, 4]
// [1, 2, 3]
// [1, 2]
// [1]
// []
// []
```


## FIFO Queue

First in, first out queue operator.

```typescript
import { timer, from } from 'rxjs';
import { take } from 'rxjs/operators';
import { fifoQueue } from '@btapai/custom-rxjs-operators';

const source$ = from([1, 2, 3, 4, 5]);
const emitter$ = timer(0, 1000).pipe(take(6));

source$.pipe(fifoQueue(emitter$)).subscribe(res => {
  console.log(res);
});
// emits in reverse order:
// 1 after 1 sec
// 2 after 2 sec
// 3 after 3 sec
// 4 after 4 sec
// 5 after 5 sec
// undefined
```

Takes a source observable, and an emitter observable. The result observable emits every time when the emitter observable emits. It always emits the value that was first added to the queue.

If the queue is empty, but the emitter emits, the result observable emits undefined.

If the `emitQueue` property in the passed configuration is set to true, the result observable emits every time when the queue changes.

```typescript
import { timer, from } from 'rxjs';
import { take } from 'rxjs/operators';
import { fifoQueue } from '@btapai/custom-rxjs-operators';

const source$ = from([1, 2, 3, 4, 5]);
const emitter$ = timer(0, 1000).pipe(take(6));

source$.pipe(fifoQueue(emitter$, { emitQueue: true })).subscribe(res => {
  console.log(res);
});

// [1]
// [1, 2]
// [1, 2, 3]
// [1, 2, 3, 4]
// [1, 2, 3, 4, 5]
// [1, 2, 3, 4]
// [1, 2, 3]
// [1, 2]
// [1]
// []
// []
```
