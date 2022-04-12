class Store {
  incidents = [
    {
      openDate: '2012-01-26T13:51:50.417-07:00',
      closeDate: '2012-01-26T15:51:50.417-07:00',
      description: 'the floor in the fruit area is dirty',
      status: 'solved',
    },
    {
      openDate: '2012-01-26T13:45:50.417-07:00',
      closeDate: '2012-01-26T15:47:50.417-07:00',
      description: 'the floor in the fruit area is dirty',
      status: 'solved',
    },
    {
      openDate: '2012-01-25T13:51:50.417-07:00',
      closeDate: '2012-01-26T15:51:50.417-07:00',
      description: 'the floor in the fruit area is dirty, like a looooot!',
      status: 'open',
    },
  ];

  constructor(storeName) {
    this.storeName = storeName;
  }

  get storeName() {
    return this._storeName;
  }

  set storeName(value) {
    if (value.length < 4) {
      alert('Description is too short.');
      return;
    }
    this._storeName = value;
  }

  open(description) {
    this.incidents.push({
      openDate: new Date(),
      closeDate: '',
      description,
      status: 'open',
    });

    return this.incidents.length - 1;
  }

  close(id) {
    this.incidents[id].status = 'closed';
    this.incidents[id].closeDate = new Date();
  }

  openCases(fromDate, toDate) {
    return this.incidents.filter(
      (item) =>
        item.status === 'open' &&
        item.openDate >= fromDate &&
        item.openDate <= toDate
    );
  }

  closedCases(fromDate, toDate) {
    return this.incidents.filter(
      (item) =>
        item.status === 'solved' &&
        item.openDate >= fromDate &&
        item.closeDate <= toDate
    );
  }

  averageSolution(fromDate, toDate) {
    const cases = this.closedCases(fromDate, toDate);
    // console.log(cases);
    const time = cases.reduce(
      (sum, current) =>
        sum + (new Date(current.closeDate) - new Date(current.openDate)),
      0
    );
    return Math.floor(time / 1000 / 60 / cases.length);
  }

  maximumSolution(fromDate, toDate) {
    const cases = this.closedCases(fromDate, toDate);
    // console.log(cases);
    const time = cases.reduce(
      (max, current) =>
        max < new Date(current.closeDate) - new Date(current.openDate)
          ? new Date(current.closeDate) - new Date(current.openDate)
          : max,
      0
    );
    return Math.floor(time / 1000 / 60 / cases.length);
  }

  incidentStatus(fromDate, toDate) {
    console.log(
      `open_cases: ${this.openCases(fromDate, toDate).length}, closed_cases: ${
        this.closedCases(fromDate, toDate).length
      }, average_solution: ${this.averageSolution(
        fromDate,
        toDate
      )}, maximum_solution: ${this.maximumSolution(fromDate, toDate)}`
    );
  }
}

const someStoreTestInit = (storeName) => {};

const someStore = new Store('someStore');
someStoreTestInit(someStore);

someStore.incidentStatus(
  '2012-01-25T13:51:50.417-07:00',
  '2012-01-26T15:51:50.417-07:00'
);
