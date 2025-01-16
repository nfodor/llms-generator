const fs = require('fs');
const path = require('path');

function generateLLMSFiles(jsonPath, outputDir) {
    try {
        // Read and parse the JSON file
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

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

function populateTemplate(template, data) {
    return template.replace(/\{\{(.*?)\}\}/g, (_, key) => {
        const keys = key.trim().split('.');
        return keys.reduce((obj, k) => obj && obj[k], data) || '';
    });
}

// Add a .use() method to make it compatible with middleware-style usage
function use(app, jsonPath, outputDir) {
    app.use((req, res, next) => {
        try {
            // Generate the files
            generateLLMSFiles(jsonPath, outputDir);

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

// Export both the main function and the .use() method
module.exports = generateLLMSFiles;
module.exports.use = use;

if (require.main === module) {
    const [,, jsonPath, outputDir] = process.argv;
    if (!jsonPath || !outputDir) {
        console.error('Usage: llms-generator <path-to-json> <output-dir>');
        process.exit(1);
    }
    generateLLMSFiles(jsonPath, outputDir);
}