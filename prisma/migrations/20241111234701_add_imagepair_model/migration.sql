-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "email" VARCHAR(100),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImagePair" (
    "id" SERIAL NOT NULL,
    "nasaImageUrl" TEXT NOT NULL,
    "aiImageUrl" TEXT NOT NULL,
    "metadataTitle" VARCHAR(150) NOT NULL,
    "metadataDate" TIMESTAMP(3) NOT NULL,
    "metadataExplanation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImagePair_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
