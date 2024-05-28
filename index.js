import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to the Go Game Score Calculation API. Use the endpoint /:p1/:p2/:p3 to calculate the maximum number of draws.');
});

app.get('/:p1/:p2/:p3', (req, res) => {
    const { p1, p2, p3 } = req.params;
    const points = [parseInt(p1), parseInt(p2), parseInt(p3)];

    // Validate input
    if (isNaN(points[0]) || isNaN(points[1]) || isNaN(points[2]) || points[0] > points[1] || points[1] > points[2]) {
        return res.json({ max_draws: -1 });
    }

    // Calculate max draws
    const maxDraws = calculateMaxDraws(points[0], points[1], points[2]);
    res.json({ max_draws: maxDraws });
});

const calculateMaxDraws = (p1, p2, p3) => {
    const totalPoints = p1 + p2 + p3;
    const totalGames = totalPoints / 2;

    // Check if total games is an integer
    if (!Number.isInteger(totalGames)) {
        return -1;
    }

    // Calculate the maximum possible number of draws
    let maxDraws = 0;
    for (let i = 0; i <= totalGames; i++) {
        if (i <= p1 && i <= p2 && (totalGames - i) <= p3) {
            maxDraws = i;
        }
    }

    // Validate if the scores are consistent with the number of games
    if ((p1 + p2 + p3) !== totalGames * 2) {
        return -1;
    }

    return maxDraws;
};

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
