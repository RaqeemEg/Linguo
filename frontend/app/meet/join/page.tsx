import { AuthGuard } from "@/components/auth/auth-guard"
import { JoinMeeting } from "@/components/meet/join-meeting"

export default function JoinMeetPage() {
  return (
    <AuthGuard requireAuth={true}>
      <JoinMeeting />
    </AuthGuard>
  )
}
