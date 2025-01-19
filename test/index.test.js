const fs = require('fs');
const path = require('path');
const express = require('express');
const request = require('supertest');
const { expect } = require('chai');
const { use } = require('../src/index.js');

describe('use function', () => {
    const outputDir = path.join(__dirname, 'output');
    const jsonInput = {
        "project_name": "ExampleAPI",
        "version": "1.0",
        "description": "An API for text analysis and sentiment scoring."
    };

    before(() => {
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
    });

    after(() => {
        // Clean up generated files after tests
        fs.rmSync(outputDir, { recursive: true, force: true });
    });

    it('should pass to next middleware for non-llms paths', (done) => {
        const app = express();
        use(app, jsonInput, outputDir);

        // Add a catch-all route to simulate next middleware
        app.use((req, res) => {
            res.status(404).send('Not Found');
        });

        request(app)
            .get('/')
            .expect(404)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.equal('Not Found');
                done();
            });
    });

    it('should return llms.txt content', (done) => {
        const app = express();
        use(app, jsonInput, outputDir);

        request(app)
            .get('/llms.txt')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.include('project_name');
                done();
            });
    });

    it('should return llms-full.txt content', (done) => {
        const app = express();
        use(app, jsonInput, outputDir);

        request(app)
            .get('/llms-full.txt')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.include('project_name');
                done();
            });
    });
}); 