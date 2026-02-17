-- CreateTable
CREATE TABLE "jurusan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nama" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "prospekKerja" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "jurusan_slug_key" ON "jurusan"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "jurusan_alias_key" ON "jurusan"("alias");

-- CreateIndex
CREATE INDEX "jurusan_nama_idx" ON "jurusan"("nama");
