-- CreateEnum
CREATE TYPE "EngagementTargetType" AS ENUM ('professional', 'inspiration');

-- CreateTable
CREATE TABLE "engagement_comment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "targetType" "EngagementTargetType" NOT NULL,
    "targetId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "engagement_comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "engagement_like" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "targetType" "EngagementTargetType" NOT NULL,
    "targetId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "engagement_like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "engagement_save" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "targetType" "EngagementTargetType" NOT NULL,
    "targetId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "engagement_save_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "engagement_follow" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "engagement_follow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "engagement_comment_userId_idx" ON "engagement_comment"("userId");

-- CreateIndex
CREATE INDEX "engagement_comment_targetType_targetId_idx" ON "engagement_comment"("targetType", "targetId");

-- CreateIndex
CREATE INDEX "engagement_like_targetType_targetId_idx" ON "engagement_like"("targetType", "targetId");

-- CreateIndex
CREATE UNIQUE INDEX "engagement_like_userId_targetType_targetId_key" ON "engagement_like"("userId", "targetType", "targetId");

-- CreateIndex
CREATE INDEX "engagement_save_targetType_targetId_idx" ON "engagement_save"("targetType", "targetId");

-- CreateIndex
CREATE UNIQUE INDEX "engagement_save_userId_targetType_targetId_key" ON "engagement_save"("userId", "targetType", "targetId");

-- CreateIndex
CREATE INDEX "engagement_follow_profileId_idx" ON "engagement_follow"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "engagement_follow_userId_profileId_key" ON "engagement_follow"("userId", "profileId");

-- AddForeignKey
ALTER TABLE "engagement_comment" ADD CONSTRAINT "engagement_comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "engagement_like" ADD CONSTRAINT "engagement_like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "engagement_save" ADD CONSTRAINT "engagement_save_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "engagement_follow" ADD CONSTRAINT "engagement_follow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
