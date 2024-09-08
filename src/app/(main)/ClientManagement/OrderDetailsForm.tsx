// app/billing/OrderDetailsForm.tsx
import React, { ChangeEvent, Dispatch, SetStateAction } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface OrderDetailsFormProps {
    advancePayment: string
    setAdvancePayment: Dispatch<SetStateAction<string>>
    paymentMethod: string
    setPaymentMethod: Dispatch<SetStateAction<string>>
    paymentStatus: string
    setPaymentStatus: Dispatch<SetStateAction<string>>
    deliveryDate: Date | undefined
    setDeliveryDate: Dispatch<SetStateAction<Date | undefined>>
}

export function OrderDetailsForm({
    advancePayment, setAdvancePayment, paymentMethod, setPaymentMethod,
    paymentStatus, setPaymentStatus, deliveryDate, setDeliveryDate
}: OrderDetailsFormProps) {
    return (
        <div className="flex flex-wrap gap-3">
            <InputField
                label="Advance Payment"
                type="number"
                value={advancePayment}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setAdvancePayment(e.target.value)}
            />
            <SelectField
                label="Payment Method"
                value={paymentMethod}
                onChange={(value: string) => setPaymentMethod(value)}
                options={['Cash', 'Credit Card', 'Debit Card']}
            />
            <SelectField
                label="Payment Status"
                value={paymentStatus}
                onChange={(value: string) => setPaymentStatus(value)}
                options={['Paid', 'Unpaid']}
            />
            <DatePicker
                label="Delivery Date"
                date={deliveryDate}
                onDateChange={setDeliveryDate}
            />
        </div>
    )
}

interface InputFieldProps {
    label: string
    type: string
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function InputField({ label, type, value, onChange }: InputFieldProps) {
    return (
        <div className="flex flex-col space-y-1">
            <Label>{label}</Label>
            <Input type={type} value={value} onChange={onChange} />
        </div>
    )
}

interface SelectFieldProps {
    label: string
    value: string
    onChange: (value: string) => void
    options: string[]
}

function SelectField({ label, value, onChange, options }: SelectFieldProps) {
    return (
        <div className="flex flex-col space-y-1">
            <Label>{label}</Label>
            <select className="p-2 border rounded-md" value={value} onChange={(e) => onChange(e.target.value)}>
                {options.map((option, idx) => (
                    <option key={idx} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

interface DatePickerProps {
    label: string
    date: Date | undefined
    onDateChange: (date: Date | undefined) => void
}

function DatePicker({ label, date, onDateChange }: DatePickerProps) {
    return (
        <div className="space-y-1">
            <Label>{label}</Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={onDateChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        required
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}