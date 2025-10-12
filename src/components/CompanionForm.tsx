"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { subjects } from "@/constants"
import { Textarea } from "./ui/textarea"
import { CreateCompanion } from "@/lib/actions/companions.actions"
import { redirect } from "next/navigation"


const formSchema = z.object({
    name: z.string().min(1, { message: 'Name is Required.' }),
    subject: z.string().min(1, { message: 'Subject is Required.' }),
    topic: z.string().min(1, { message: 'Topic is Required.' }),
    voice: z.string().min(1, { message: 'Voice is Required.' }),
    style: z.string().min(1, { message: 'Style is Required.' }),
    duration: z.coerce.number().min(1, { message: 'Duration is Required.' }),
})

const CompanionForm = () => {

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            subject: '',
            topic: '',
            voice: '',
            style: '',
            duration: 15,
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const Companion = await CreateCompanion(values);

        if (Companion) {
            redirect(`/companions/${Companion.id}`);
        } else {
            // console.log("Error creating companion");
            redirect(`/`);
        }
    }

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Companion Details</h2>
                <p className="text-muted-foreground">Fill in the details below to create your personalized AI learning companion.</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-semibold text-foreground">Companion Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter the companion name - ex: Calculus King"
                                        {...field}
                                        className="bg-white border border-border/50 rounded-4xl px-4 py-3 h-auto shadow-sm hover:shadow-md transition-all duration-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-base"
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm mt-1" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-semibold text-foreground">Subject</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="bg-white border border-border/50 rounded-4xl px-4 py-3 h-auto shadow-sm hover:shadow-md transition-all duration-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 capitalize text-base">
                                            <SelectValue placeholder="Enter the subject - ex: Maths" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border border-border/50 rounded-4xl shadow-lg">
                                            {subjects.map((subject) => (
                                                <SelectItem
                                                    key={subject}
                                                    value={subject}
                                                    className="capitalize cursor-pointer hover:bg-muted/50 focus:bg-muted/50 rounded-3xl mx-1"
                                                >
                                                    {subject}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm mt-1" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="topic"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-semibold text-foreground">What should this companion teach?</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter the topic you want to learn - ex: Derivatives"
                                        {...field}
                                        className="bg-white border border-border/50 rounded-4xl px-4 py-3 shadow-sm hover:shadow-md transition-all duration-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-base resize-none min-h-[100px]"
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm mt-1" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="voice"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-semibold text-foreground">Voice Type</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="bg-white border border-border/50 rounded-4xl px-4 py-3 h-auto shadow-sm hover:shadow-md transition-all duration-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-base">
                                            <SelectValue placeholder="Select voice type" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border border-border/50 rounded-4xl shadow-lg">
                                            <SelectItem
                                                value='formal'
                                                className="capitalize cursor-pointer hover:bg-muted/50 focus:bg-muted/50 rounded-3xl mx-1"
                                            >
                                                Formal
                                            </SelectItem>
                                            <SelectItem
                                                value='casual'
                                                className="capitalize cursor-pointer hover:bg-muted/50 focus:bg-muted/50 rounded-3xl mx-1"
                                            >
                                                Casual
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm mt-1" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="style"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-semibold text-foreground">Speaking Style</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="bg-white border border-border/50 rounded-4xl px-4 py-3 h-auto shadow-sm hover:shadow-md transition-all duration-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-base">
                                            <SelectValue placeholder="Select speaking style" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border border-border/50 rounded-4xl shadow-lg">
                                            <SelectItem
                                                value='male'
                                                className="capitalize cursor-pointer hover:bg-muted/50 focus:bg-muted/50 rounded-3xl mx-1"
                                            >
                                                Male
                                            </SelectItem>
                                            <SelectItem
                                                value='female'
                                                className="capitalize cursor-pointer hover:bg-muted/50 focus:bg-muted/50 rounded-3xl mx-1"
                                            >
                                                Female
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm mt-1" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-semibold text-foreground">Session Duration in Minutes</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter the session duration"
                                        {...field}
                                        className="bg-white border border-border/50 rounded-4xl px-4 py-3 h-auto shadow-sm hover:shadow-md transition-all duration-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-base"
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm mt-1" />
                            </FormItem>
                        )}
                    />
                    <Button
                        className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white font-bold py-5 px-8 rounded-4xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-primary/30 text-lg mt-4 group relative overflow-hidden"
                        type="submit"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            🚀 Build Your Companion
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default CompanionForm