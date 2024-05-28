
# Go Game Score Calculation API

This project implements a Web API to calculate the maximum number of draws that could have occurred in a series of Go games played by three friends, given their points.

## Installation

### Prerequisites

- Node.js installed on your machine ([Download Node.js](https://nodejs.org/))

### Clone the Repository

```bash
git clone https://github.com/DOGEcoder0/Go-game-api.git
cd your-repo-name
```

### Install Dependencies

```bash
npm install
```

## Usage

### Start the Server

```bash
npm start
```

### Access the API

You can access the API at `http://localhost:3000/:p1/:p2/:p3`, where `p1`, `p2`, and `p3` are the points of the three players.

Replace `:p1`, `:p2`, and `:p3` with the actual points to get the maximum number of draws.

### Example

- `http://localhost:3000/3/4/5` returns `{ "max_draws": 6 }`
- `http://localhost:3000/1/1/2` returns `{ "max_draws": 2 }`

## Testing

To run tests, use the following command:

```bash
npm test
```
