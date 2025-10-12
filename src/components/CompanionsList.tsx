import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import Link from "next/link"
import { getSubjectColor } from "@/lib/utils"

interface companionListProps {
  title: string,
  companions?: Companion[],
  classNames?: string
}

const CompanionsList = ({ title, companions, classNames }: companionListProps) => {
  return (
    <article className={`${classNames}`}>
      {title && (
        <div className="mb-6">
          <h2 className="font-bold text-2xl lg:text-3xl text-foreground">{title}</h2>
        </div>
      )}

      <div className="bg-gradient-to-br from-muted/20 to-muted/40 rounded-4xl p-6">
        <Table className="">
          <TableHeader>
            <TableRow className="border-border/30 hover:bg-transparent">
              <TableHead className="text-lg w-2/3 text-foreground font-semibold">Lessons</TableHead>
              <TableHead className="text-lg text-foreground font-semibold">Subject</TableHead>
              <TableHead className="text-lg text-right text-foreground font-semibold">Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companions?.map(({ id, name, subject, topic, duration }) => (
              <TableRow key={id} className="border-border/20 hover:bg-white/50 transition-colors cursor-pointer">
                <TableCell className="font-medium py-4">
                  <Link href={`/companions/${id}`} className="group block">
                    <div className="flex items-center gap-4">
                      <div className="size-[72px] flex items-center justify-center rounded-4xl max-md:hidden shadow-md group-hover:scale-105 transition-transform" style={{ backgroundColor: getSubjectColor(subject) }}>
                        <Image
                          src={`/icons/${subject}.svg`}
                          alt={subject}
                          width={35}
                          height={35}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="font-bold text-2xl text-foreground group-hover:text-primary transition-colors">{name}</p>
                        <p className="text-lg text-muted-foreground">{topic}</p>
                      </div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="subject-badge w-fit max-md:hidden" style={{ backgroundColor: getSubjectColor(subject) }}>{subject}</div>
                  <div className="flex items-center justify-center rounded-4xl w-fit p-2 md:hidden shadow-sm" style={{ backgroundColor: getSubjectColor(subject) }}>
                    <Image
                      src={`/icons/${subject}.svg`}
                      alt={subject}
                      width={18}
                      height={18}
                    />
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center gap-2 w-full justify-end">
                    <p className="text-2xl font-semibold text-foreground">{duration} {' '}
                      <span className="max-md:hidden text-muted-foreground font-normal">mins</span>
                    </p>
                    <div className="w-5 h-5 rounded-full bg-muted/40 flex items-center justify-center md:hidden">
                      <Image
                        src={'/icons/clock.svg'}
                        alt="clock"
                        width={12}
                        height={12}
                      />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </article>
  )
}

export default CompanionsList