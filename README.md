# Frogmi test task

## `Store`

A simple class for Incidents.

### Properties

- `storeName {String}` a name of an instance
- `incidents {Array of Object}` an array of incidents
  - `openDate {Date}` a date of an incident
  - `closeDate {Date}` a date of solving the incident
  - `description {String}` a description of the incident
  - `actionNeeded {String}` a description of an action needed to solve the incident
  - `status {String}` a status of the incident: `open` - for active incident, `solved` - for closed incident

### Methods

#### open

Adds a new incident

_Parameters_

- `description {String}` a description of an incident
- `actionNeeded {String}` a description of an action needed to solve the incident
- `date {Date}` a date of an incident, **not required, default value is current date**

_Returns_

- `{Number}` an id of added incident

#### close

Changes a status of an incident to solved

_Parameters_

- `id {Number}` an id of an incident to close
- `date {Date}` a date of closing the incident, **not required, default value is current date**

#### incidentStatus

Calculates statistics on the incidents between two dates:

- the number of “open” cases between those dates
- the number of “solved” cases between those dates
- the average solution time between those dates (including only the solved cases)
- the current maximum solution time between those dates (include open cases using the current time).

_Parameters_

- `fromDate {Date}` a starting date (YYYY-MM-DD) of an incidents, **not required, default value is minimum date from all incidents**
- `toDate {Date}` the last date (YYYY-MM-DD) of an incidents, **not required, default value is current date**

_Returns_

- `{String}` statistics on the incidents between given dates

## `storeTestInit`

A function for initializing an instance of a Store class with some test data.

_Parameters_

- `storeName {Object}` an instance of a Store class
