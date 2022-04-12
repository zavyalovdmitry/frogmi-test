class Store {
  constructor(storeName = 'A store') {
    this.storeName = storeName;
    this.incidents = [];
  }

  open(description, actionNeeded, date = new Date()) {
    this.incidents.push({
      openDate: date,
      closeDate: '',
      description,
      actionNeeded,
      status: 'open',
    });

    return this.incidents.length - 1;
  }

  close(id, date = new Date()) {
    this.incidents[id].status = 'solved';
    this.incidents[id].closeDate = date;
  }

  openCases(fromDate, toDate) {
    return this.incidents.filter(
      (item) =>
        item.status === 'open' &&
        item.openDate >= new Date(fromDate) &&
        item.openDate <= new Date(toDate)
    );
  }

  closedCases(fromDate, toDate) {
    return this.incidents.filter(
      (item) =>
        item.status === 'solved' &&
        item.openDate >= new Date(fromDate) &&
        item.openDate <= new Date(toDate)
    );
  }

  averageSolution(fromDate, toDate) {
    const cases = this.closedCases(fromDate, toDate);
    const time = cases.reduce(
      (sum, current) => sum + (current.closeDate - current.openDate),
      0
    );
    return Math.floor(time / 1000 / 60 / cases.length);
  }

  maximumSolution(fromDate, toDate) {
    const cases = this.incidents.map((item) =>
      item.status === 'open' ? { ...item, closeDate: new Date() } : item
    );
    const casesFiltered = cases.filter(
      (item) =>
        item.openDate >= new Date(fromDate) && item.openDate <= new Date(toDate)
    );
    const time = casesFiltered.reduce(
      (max, current) =>
        max < current.closeDate - current.openDate
          ? current.closeDate - current.openDate
          : max,
      this.incidents[0].closeDate - this.incidents[0].openDate
    );

    return Math.floor(time / 1000 / 60);
  }

  getMinDate() {
    return this.incidents.reduce(
      (min, current) => (min > current.openDate ? current.openDate : min),
      this.incidents[0].openDate
    );
  }

  incidentStatus(fromDate = '', toDate = new Date()) {
    fromDate = fromDate ? fromDate : this.getMinDate();

    console.log(
      `Open cases: ${this.openCases(fromDate, toDate).length}, closed cases: ${
        this.closedCases(fromDate, toDate).length
      }, average solution time: ${this.averageSolution(
        fromDate,
        toDate
      )} min, maximum solution time: ${this.maximumSolution(
        fromDate,
        toDate
      )} min`
    );
  }
}

const storeTestInit = (storeName) => {
  storeName.open(
    'the floor in the fruit area is dirty',
    'cleaning',
    new Date('2022-01-26T13:51:50.417-07:00')
  );
  storeName.open(
    'the ceil in the fruit area is dirty',
    'cleaning',
    new Date('2022-01-26T13:45:50.417-07:00')
  );
  storeName.open(
    'the floor in the fruit area is dirty, like a looooot!',
    'cleaning',
    new Date('2022-01-25T13:51:50.417-07:00')
  );
  storeName.open(
    'the floor in the fruit area is dirty',
    'cleaning',
    new Date('2022-01-25T11:51:50.417-07:00')
  );
  storeName.open(
    'the ceil in the fruit area is dirty',
    'cleaning',
    new Date('2022-01-26T13:32:50.417-07:00')
  );
  storeName.open(
    'the floor in the fruit area is dirty, like a looooot!',
    'cleaning',
    new Date('2022-01-25T13:01:50.417-07:00')
  );

  storeName.close(1, new Date('2022-01-26T15:51:50.417-07:00'));
  storeName.close(3, new Date('2022-01-25T11:57:50.417-07:00'));
};

const someStore = new Store('someStore');

storeTestInit(someStore);

someStore.incidentStatus();
