import Image from "next/image"
import Link from "next/link"
import CompanionBookmark from "./CompanionBookmark"

interface CompanionCardProps {
    id: string,
    name: string,
    topic: string,
    subject: string,
    duration: number,
    color: string
}

const CompanionCard = ({ id, name, topic, subject, duration, color }: CompanionCardProps) => {
    return (
        <article
            className="bg-white rounded-4xl p-8 shadow-lg hover:shadow-xl border-2 transition-all duration-300 hover:scale-[1.02] group flex flex-col gap-6 h-full min-h-[320px] w-full max-w-[420px] mx-auto relative overflow-hidden"
            style={{
                background: `linear-gradient(135deg, ${color}15, ${color}25, white)`,
                borderColor: `${color}60`
            }}
        >
            {/* Color accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-4xl" style={{ backgroundColor: color }}></div>

            <div className="flex justify-between items-center">
                <div className="subject-badge shadow-md" style={{ backgroundColor: color }}>{subject}</div>
                <CompanionBookmark companionId={id} />
            </div>

            <div className="flex-grow space-y-4 min-h-[140px] flex flex-col justify-center">
                <h2 className="text-2xl lg:text-3xl font-bold leading-tight line-clamp-2" style={{ color: `${color}` }}>{name}</h2>
                <p className="text-muted-foreground leading-relaxed text-base lg:text-lg line-clamp-3">{topic}</p>
            </div>

            <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-6 h-6 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: `${color}50` }}>
                    <Image
                        src={'/icons/clock.svg'}
                        alt="duration"
                        height={14}
                        width={14}
                    />
                </div>
                <p className="text-sm font-medium">{duration} minutes</p>
            </div>

            <Link href={`/companions/${id}`} className="w-full">
                <button
                    className="w-full text-white font-semibold py-4 px-6 rounded-4xl transition-all duration-300 group-hover:scale-105 shadow-md hover:shadow-lg cursor-pointer focus:outline-none focus:ring-4 text-lg"
                    style={{
                        backgroundColor: color,
                        boxShadow: `0 4px 14px ${color}40`
                    }}
                >
                    Launch Lesson
                </button>
            </Link>
        </article>
    )
}

export default CompanionCard