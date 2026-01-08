
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

async function main() {
    console.log('Connecting to database...');
    try {
        await prisma.$connect();
        console.log('Connected.');

        console.log('Attempting to create task...');
        const task = await prisma.task.create({
            data: {
                text: 'Debug task ' + new Date().toISOString(),
            }
        });
        console.log('Task created successfully:', task);
    } catch (e) {
        console.error('ERROR OCCURRED:');
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
