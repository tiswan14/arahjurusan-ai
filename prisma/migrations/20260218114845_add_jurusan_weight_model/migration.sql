-- CreateTable
CREATE TABLE "jurusan_weights" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "jurusanId" TEXT NOT NULL,
    "dimensi" TEXT NOT NULL,
    "bobot" REAL NOT NULL,
    CONSTRAINT "jurusan_weights_jurusanId_fkey" FOREIGN KEY ("jurusanId") REFERENCES "jurusan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "jurusan_weights_dimensi_idx" ON "jurusan_weights"("dimensi");

-- CreateIndex
CREATE UNIQUE INDEX "jurusan_weights_jurusanId_dimensi_key" ON "jurusan_weights"("jurusanId", "dimensi");
