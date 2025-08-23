import { AuthGuard } from "@/components/auth/auth-guard"
import { MeetingLobby } from "@/components/meet/meeting-lobby"

export default function MeetPage() {
  return (
    <AuthGuard requireAuth={true}>
      <MeetingLobby />
    </AuthGuard>
  )
}
