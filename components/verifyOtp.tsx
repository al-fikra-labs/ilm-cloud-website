"use client"

import { REGEXP_ONLY_DIGITS } from "input-otp"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "./ui/button"
import { endpoints } from "@/lib/urls"
import { api } from "@/lib/api"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import Cookie from "js-cookie"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Dispatch, SetStateAction, useState } from "react"

type Props = {
    email: string
    otp: string
    setOtp: Dispatch<SetStateAction<string>>
}

export function VerifyOtp({ email, otp, setOtp }: Props) {

    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const onSubmit = async () => {
        try {
            setLoading(true)
            const res = await api.post(endpoints.verifyOtp, {
                email,
                otp
            })
            Cookie.set("token", res.data.token)
            toast.success("OTP Verified")
            window.location.reload()
        } catch (error: any) {
            setLoading(false)
            toast.error(error.response.data.message || "Something went wrong")
        }
    }

    return (
        <Card className="border-border/50 shadow-lg animate-in slide-in-from-left-5 fade-in-0 duration-700">
            <CardHeader className="space-y-2 text-center">
                <div className="w-16 h-16 bg-[#1DB954]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-[#1DB954] rounded-full"></div>
                </div>
                <CardTitle className="text-2xl font-bold">Enter OTP</CardTitle>
                <CardDescription className="text-muted-foreground">
                    OTP is sent to <span className="font-bold">{email}</span>
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex flex-col justify-center items-center">
                <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} value={otp} onChange={(val) => setOtp(val)}>
                    <InputOTPGroup>
                        <InputOTPSlot className="h-12 w-12" index={0} />
                        <InputOTPSlot className="h-12 w-12" index={1} />
                        <InputOTPSlot className="h-12 w-12" index={2} />
                        <InputOTPSlot className="h-12 w-12" index={3} />
                        <InputOTPSlot className="h-12 w-12" index={4} />
                        <InputOTPSlot className="h-12 w-12" index={5} />
                    </InputOTPGroup>
                </InputOTP>
                <Button type="button" onClick={onSubmit} className="w-full bg-[#1DB954] hover:bg-[#1DB954]/90 cursor-pointer" disabled={loading}>
                    {"Submit"}
                </Button>
            </CardContent>
            <CardFooter className="text-center">
                <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#1DB954] hover:underline font-medium">
                        Sign in
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}