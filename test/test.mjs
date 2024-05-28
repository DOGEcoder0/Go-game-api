import request from 'supertest';
import express from 'express';
import chai from 'chai';

const should = chai.should();

const app = express();

app.get('/:p1/:p2/:p3', (req, res) => {
    const { p1, p2, p3 } = req.params;
    const points = [parseInt(p1), parseInt(p2), parseInt(p3)];

    if (isNaN(points[0]) || isNaN(points[1]) || isNaN(points[2]) || points[0] > points[1] || points[1] > points[2]) {
        return res.json({ max_draws: -1 });
    }

    const maxDraws = calculateMaxDraws(points[0], points[1], points[2]);
    res.json({ max_draws: maxDraws });
});

const calculateMaxDraws = (p1, p2, p3) => {
    const totalPoints = p1 + p2 + p3;
    const totalGames = (totalPoints / 2);

    if (!Number.isInteger(totalGames)) {
        return -1;
    }

    const maxDraws = Math.min(p1, p2, totalGames);

    if (p1 + p2 + p3 != totalGames * 2) {
        return -1;
    }

    return maxDraws;
};

describe('GET /:p1/:p2/:p3', () => {
    it('should return max_draws: 0 for /0/0/0', async () => {
        const res = await request(app).get('/0/0/0');
        res.body.should.have.property('max_draws', 0);
    });

    it('should return max_draws: 2 for /1/1/2', async () => {
        const res = await request(app).get('/1/1/2');
        res.body.should.have.property('max_draws', 2);
    });

    it('should return max_draws: 6 for /3/4/5', async () => {
        const res = await request(app).get('/3/4/5');
        res.body.should.have.property('max_draws', 6);
    });

    it('should return max_draws: -1 for /3/3/3', async () => {
        const res = await request(app).get('/3/3/3');
        res.body.should.have.property('max_draws', -1);
    });
});
