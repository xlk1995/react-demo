class Bus {
  list = null;
  constructor() {
    this.list = {};
  }

  on = (name, fn) => {
    const eventList = this.list[name] || [];
    eventList.push(fn);
    this.list[name] = eventList;
  };

  emit = (name, ...args) => {
    const eventList = this.list[name] || [];
    eventList.map((event) => event.apply(this, args));
  };

  off = (name, fn) => {
    const eventList = this.list[name] || [];
    const index = eventList.indexOf(fn);
    if (index < 0) {
      return;
    }
    eventList.splice(index, 1);
    this.list[name] = eventList;
  };
}
const bus = new Bus();

export default bus;
