import { AuthGuard } from "@/components/auth/auth-guard"
import  VideoCallInterface  from "@/components/meet/video-call-interface"

interface MeetingRoomPageProps {
  params: {
    roomId: string
  }
}

export default function MeetingRoomPage({ params }: MeetingRoomPageProps) {
  return (
    <AuthGuard requireAuth={true}>
      <VideoCallInterface roomId={params.roomId} />
    </AuthGuard>
  )
}
