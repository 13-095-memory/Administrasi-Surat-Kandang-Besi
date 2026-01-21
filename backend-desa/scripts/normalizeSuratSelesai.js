const { PrismaClient } = require('@prisma/client');
const path = require('path');
const prisma = new PrismaClient();

async function main() {
  console.log('Start normalizing fileSuratSelesai...');

  const suratList = await prisma.surat.findMany({
    where: { fileSuratSelesai: { not: null } },
    select: { id: true, fileSuratSelesai: true }
  });

  for (const s of suratList) {
    if (!s.fileSuratSelesai) continue;
    // ambil hanya nama file
    const filename = s.fileSuratSelesai.split('/').pop();
    if (filename && filename !== s.fileSuratSelesai) {
      await prisma.surat.update({
        where: { id: s.id },
        data: { fileSuratSelesai: filename }
      });
      console.log(`Updated id=${s.id} -> ${filename}`);
    }
  }

  console.log('Normalization finished');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error('Error:', e);
    prisma.$disconnect();
    process.exit(1);
  });