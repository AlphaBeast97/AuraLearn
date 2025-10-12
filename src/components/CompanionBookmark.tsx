'use client'
import { ToggleBookmark, CheckBookmarkStatus } from "@/lib/actions/companions.actions"
import Image from "next/image"
import { useState, useEffect } from "react"

const CompanionBookmark = ({ companionId }: { companionId: string }) => {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load initial bookmark status
  useEffect(() => {
    const loadBookmarkStatus = async () => {
      try {
        const bookmarkStatus = await CheckBookmarkStatus(companionId)
        setIsBookmarked(bookmarkStatus)
      } catch (error) {
        console.error("Failed to load bookmark status:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadBookmarkStatus()
  }, [companionId])

  const handleClick = async () => {
    if (isLoading) return

    try {
      // Handle bookmark click
      // console.log("Bookmark clicked for companion ID:", companionId);
      const result = await ToggleBookmark(companionId)
      setIsBookmarked(result.bookmarked)
    } catch (error) {
      console.error("Failed to toggle bookmark:", error)
    }
  }
  // console.log("Bookmark state:", isBookmarked);
  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="companion-bookmark">
      <Image
        src={isBookmarked ? '/icons/bookmark-filled.svg' : '/icons/bookmark.svg'}
        alt="bookmark"
        width={12.5}
        height={15}
        style={{ opacity: isLoading ? 0.5 : 1 }}
      />
    </button>
  )
}

export default CompanionBookmark