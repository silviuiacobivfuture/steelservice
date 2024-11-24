import fs from 'fs';
import path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// Default values for CLI arguments
const DEFAULT_INPUT_FOLDER = 'prisma';
const DEFAULT_OUTPUT_FILE = './dist/prisma/_concatenated-schema.prisma';

// Priority order defined directly in code
const priorityOrder = [
  // Add more files or folders as needed
  "datasource.prisma"
];

// Parse CLI arguments synchronously
const argv = yargs(hideBin(process.argv))
  .option('input', {
    type: 'string',
    default: DEFAULT_INPUT_FOLDER,
    describe: 'Input folder containing .prisma files',
  })
  .option('output', {
    type: 'string',
    default: DEFAULT_OUTPUT_FILE,
    describe: 'Output file path for the concatenated schema',
  })
  .help()
  .parseSync();

// Recursively get all .prisma files in the input directory
const getAllPrismaFiles = (dir: string, files: string[] = []): string[] => {
  const items = fs.readdirSync(dir);

  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      getAllPrismaFiles(fullPath, files);
    } else if (stats.isFile() && path.extname(item) === '.prisma') {
      files.push(fullPath);
    }
  });

  return files;
};

// Sort files based on priority order defined in code
const sortFilesByPriority = (files: string[], priorityOrder: string[]): string[] => {
  return files.sort((a, b) => {
    const aIndex = priorityOrder.findIndex(priority => a.includes(priority));
    const bIndex = priorityOrder.findIndex(priority => b.includes(priority));

    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;

    return 0;
  });
};

// Main function to concatenate Prisma files
const concatenatePrismaFiles = (inputDir: string, outputFile: string): void => {
  const prismaFiles = getAllPrismaFiles(inputDir);
  const sortedPrismaFiles = sortFilesByPriority(prismaFiles, priorityOrder);

  // Clear the output file
  fs.writeFileSync(outputFile, '', 'utf8');

  // Append each .prisma file to the output file
  sortedPrismaFiles.forEach(file => {
    const fileContent = fs.readFileSync(file, 'utf8');
    fs.appendFileSync(outputFile, `${fileContent}\n\n`);
  });

  console.log(`Prisma files concatenated into ${outputFile}`);
};

// Execute the script with provided arguments
concatenatePrismaFiles(argv.input, argv.output);
