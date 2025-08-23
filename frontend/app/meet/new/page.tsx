import { AuthGuard } from "@/components/auth/auth-guard"
import { CreateMeeting } from "@/components/meet/create-meeting"

export default function NewMeetPage() {
  return (
    <AuthGuard requireAuth={true}>
      <CreateMeeting />
    </AuthGuard>
  )
}
