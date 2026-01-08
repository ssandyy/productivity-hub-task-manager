
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
console.log(Object.keys(prisma));

// Also check types if possible by just trying to access it
try {
    console.log('Task property:', (prisma as any).task);
    console.log('Task property (upper):', (prisma as any).Task);
} catch (e) {
    console.error(e);
}
