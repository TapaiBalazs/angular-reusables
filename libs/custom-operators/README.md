# @btapai/custom-rxjs-operators

A collection of useful rxjs operators created by [Balázs Tápai](https://tapaibalazs.dev).

## FILO Queue

First in, last out queue operator.

```typescript
import {timer} from 'rxjs';
import {take} from 'rxjs/operators';
import {filoQueue} from '@btapai/custom-rxjs-operators';

const source$ = timer(0, 500)
const emitter$ = timer(0, 1000).pipe(take(5))

source$.pipe(filoQueue(emitter$))
  .subscribe(res => {
    console.log(res)
  })
// emits in order:
// 0
// 2
// 4
// 6
// 8
```

Takes a source observable, and an emitter observable. The result observable emits every time when the emitter observable
emits. It always emits the value that was last added to the queue.

If the queue is empty, but the emitter emits, the result observable emits undefined.

If the `emitQueue` property in the passed configuration is set to true, the result observable emits every time when the
queue changes.

## FIFO Queue

First in, first out queue operator.

```typescript
import {timer} from 'rxjs';
import {take} from 'rxjs/operators';
import {fifoQueue} from '@btapai/custom-rxjs-operators';

const source$ = timer(0, 500)
const emitter$ = timer(0, 1000).pipe(take(5))

source$.pipe(fifoQueue(emitter$))
  .subscribe(res => {
    console.log(res)
  })
// emits in order:
// 0
// 1
// 2
// 3
// 4
```

Takes a source observable, and an emitter observable. The result observable emits every time when the emitter observable
emits. It always emits the value that was first added to the queue.

If the queue is empty, but the emitter emits, the result observable emits undefined.

If the `emitQueue` property in the passed configuration is set to true, the result observable emits every time when the
queue changes.
