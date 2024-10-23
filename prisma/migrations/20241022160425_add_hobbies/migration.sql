-- AlterTable
ALTER TABLE "User" ADD COLUMN     "openToCollaborating" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Hobby" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "hobby" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hobby_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Hobby" ADD CONSTRAINT "Hobby_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("githubId") ON DELETE RESTRICT ON UPDATE CASCADE;
