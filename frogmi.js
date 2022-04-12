class Store {
  incidents = [
    {
      openDate: '2012-01-26T13:51:50.417-07:00',
      closeDate: '2012-01-26T15:51:50.417-07:00',
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
    ).length;
  }

  closedCases(fromDate, toDate) {
    return this.incidents.filter(
      (item) =>
        item.status === 'solved' &&
        item.openDate >= fromDate &&
        item.closeDate <= toDate
    ).length;
  }

  averageSolution(fromDate, toDate) {
    return 3;
  }

  maximumSolution(fromDate, toDate) {
    return 3;
  }

  incidentStatus(fromDate, toDate) {
    console.log(
      `open_cases: ${this.openCases(
        fromDate,
        toDate
      )}, closed_cases: ${this.closedCases(
        fromDate,
        toDate
      )}, average_solution: ${this.averageSolution(
        fromDate,
        toDate
      )}, maximum_solution: ${this.maximumSolution(fromDate, toDate)}`
    );
  }
}

const someStoreTestInit = (storeName) => {
  // {
  //   openDate: '2012-01-26T13:51:50.417-07:00',
  //   closeDate: '2012-01-26T15:51:50.417-07:00',
  //   description: 'the floor in the fruit area is dirty',
  //   status: 'solved',
  // },
  // {
  //   openDate: '2012-01-25T13:51:50.417-07:00',
  //   closeDate: '2012-01-26T15:51:50.417-07:00',
  //   description: 'the floor in the fruit area is dirty, like a looooot!',
  //   status: 'open',
  // },
};

const someStore = new Store('someStore');
someStoreTestInit(someStore);

someStore.incidentStatus(
  '2012-01-25T13:51:50.417-07:00',
  '2012-01-26T15:51:50.417-07:00'
);
