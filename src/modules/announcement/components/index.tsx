export function Emphasis({ children }: { children: string }) {
  return <span className="text-primary">{children}</span>
}

export function PhoneNumber({ phoneNumber }: { phoneNumber: string }) {
  return (
    <a href={`tel:${phoneNumber}`} className="text-primary underline">
      {phoneNumber}
    </a>
  )
}
