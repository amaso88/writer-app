export default class Cursor {
  constructor(baseRef, pageSize) {
    this.baseRef = baseRef;
    this.lastKey = null;
    this.lastValue = null;
    this.firstKey = null;
    this.firstValue = null;
    this.pageSize = pageSize;
  }

  next() {
    let ref = this.baseRef;

    if (this.lastValue !== null) {
      // a previous page has been loaded so get the next one using the previous value/key
      // we have to start from the current cursor so add one to page size
      ref = ref
        .startAt(this.lastValue, this.lastKey)
        .limitToFirst(this.pageSize + 1);
    } else {
      // this is the first page
      ref = ref.limitToFirst(this.pageSize);
    }

    return ref.once("value").then(snap => {
      const keys = [];
      const data = []; // store data in array so it's ordered

      snap.forEach(ss => {
        data.push({ ...ss.val(), uid: ss.key });
        keys.push(ss.key);
      });

      if (this.lastValue !== null) {
        // skip the first value, which is actually the cursor
        keys.shift();
        data.shift();
      }

      // store the last loaded record
      if (data.length) {
        const last = data.length - 1;
        this.lastKey = keys[last];
        this.lastValue = data[last].created;
        this.firstKey = keys[0];
        this.firstValue = data[0].created;
      }

      return data;
    });
  }

  previous() {
    let ref = this.baseRef;

    if (this.lastValue !== null) {
      // a previous page has been loaded so get the next one using the previous value/key
      // we have to start from the current cursor so add one to page size
      ref = ref
        .endAt(this.firstValue, this.firstKey)
        .limitToLast(this.pageSize + 1);
    }

    return ref.once("value").then(snap => {
      const keys = [];
      const data = []; // store data in array so it's ordered

      snap.forEach(ss => {
        data.push({ ...ss.val(), uid: ss.key });
        keys.push(ss.key);
      });

      // store the last loaded record
      if (data.length) {
        const last = data.length - 1;
        this.lastKey = keys[last];
        this.lastValue = data[last].created;
        this.lastKey = keys[0];
        this.lastValue = data[0].created;
      }

      if (this.lastValue !== null) {
        // skip the first value, which is actually the cursor
        keys.pop();
        data.pop();
      }

      return data;
    });
  }
}
