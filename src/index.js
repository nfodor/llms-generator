const fs = require('fs');
const path = require('path');

function generateLLMSFiles(jsonInput, outputDir) {
    try {
        let jsonData;

        // Determine if jsonInput is a file path or a JSON object
        if (typeof jsonInput === 'string') {
            // Read and parse the JSON file
            jsonData = JSON.parse(fs.readFileSync(jsonInput, 'utf-8'));
        } else if (typeof jsonInput === 'object') {
            // Use the JSON object directly
            jsonData = jsonInput;
        } else {
            throw new Error('Invalid JSON input. Must be a file path or a JSON object.');
        }

        // Construct paths to the template files
        const llmsTemplatePath = path.join(__dirname, '../templates/llms.txt');
        const llmsFullTemplatePath = path.join(__dirname, '../templates/llms-full.txt');

        // Read the template files
        const llmsTemplate = fs.readFileSync(llmsTemplatePath, 'utf-8');
        const llmsFullTemplate = fs.readFileSync(llmsFullTemplatePath, 'utf-8');

        // Populate the templates with JSON data
        const llmsContent = populateTemplate(llmsTemplate, jsonData);
        const llmsFullContent = populateTemplate(llmsFullTemplate, jsonData);

        // Create the output directory if it doesn't exist
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Write the populated templates to the output directory
        fs.writeFileSync(path.join(outputDir, 'llms.txt'), llmsContent, 'utf-8');
        fs.writeFileSync(path.join(outputDir, 'llms-full.txt'), llmsFullContent, 'utf-8');

        console.log('Generated llms.txt and llms-full.txt successfully!');
    } catch (error) {
        console.error('Error generating files:', error.message);
        throw error; // Re-throw the error to handle it in the caller
    }
}

// Add a .use() method to make it compatible with middleware-style usage
function use(app, jsonInput, outputDir) {
    app.use((req, res, next) => {
        try {
            // Generate the files
            generateLLMSFiles(jsonInput, outputDir);

            // Read the generated file
            const outputFilePath = path.join(outputDir, 'llms.txt'); // or 'llms-full.txt' if needed
            const fileContent = fs.readFileSync(outputFilePath, 'utf-8');

            // Send the file content as a response
            res.send(fileContent);

            // Exit the middleware chain
            return;
        } catch (error) {
            next(error); // Pass the error to Express's error handler
        }
    });
}

function populateTemplate(template, data) {
    return template.replace(/\{\{(.*?)\}\}/g, (_, key) => {
        const keys = key.trim().split('.');
        return keys.reduce((obj, k) => obj && obj[k], data) || '';
    });
}

// Export both the main function and the .use() method
module.exports = generateLLMSFiles;
module.exports.use = use;

if (require.main === module) {
    const [,, jsonInput, outputDir] = process.argv;
    if (!jsonInput || !outputDir) {
        console.error('Usage: llms-generator <json-input> <output-dir>');
        process.exit(1);
    }
    generateLLMSFiles(jsonInput, outputDir);
}