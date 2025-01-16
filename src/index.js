
const fs = require('fs');
const path = require('path');

function generateLLMSFiles(jsonPath, outputDir) {
    try {
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        const llmsTemplate = fs.readFileSync(path.join(__dirname, '../templates/llms.txt'), 'utf-8');
        const llmsFullTemplate = fs.readFileSync(path.join(__dirname, '../templates/llms-full.txt'), 'utf-8');

        const llmsContent = populateTemplate(llmsTemplate, jsonData);
        const llmsFullContent = populateTemplate(llmsFullTemplate, jsonData);

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFileSync(path.join(outputDir, 'llms.txt'), llmsContent, 'utf-8');
        fs.writeFileSync(path.join(outputDir, 'llms-full.txt'), llmsFullContent, 'utf-8');

        console.log('Generated llms.txt and llms-full.txt successfully!');
    } catch (error) {
        console.error('Error generating files:', error.message);
    }
}

function populateTemplate(template, data) {
    return template.replace(/\{\{(.*?)\}\}/g, (_, key) => {
        const keys = key.trim().split('.');
        return keys.reduce((obj, k) => obj && obj[k], data) || '';
    });
}

module.exports = generateLLMSFiles;

if (require.main === module) {
    const [,, jsonPath, outputDir] = process.argv;
    if (!jsonPath || !outputDir) {
        console.error('Usage: llms-generator <path-to-json> <output-dir>');
        process.exit(1);
    }
    generateLLMSFiles(jsonPath, outputDir);
}
