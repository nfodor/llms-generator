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

    it('should integrate with Express and return generated file content', (done) => {
        const app = express();

        // Use the middleware
        use(app, jsonInput, outputDir);

        // Simulate a request to the root path
        request(app)
            .get('/')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                // Check if the response contains expected content
                expect(res.text).to.include('project_name');
                done();
            });
    });
}); 