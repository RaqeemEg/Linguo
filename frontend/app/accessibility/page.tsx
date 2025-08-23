import { AuthGuard } from "@/components/auth/auth-guard"
import { AccessibilitySettings } from "@/components/accessibility/accessibility-settings"

export default function AccessibilityPage() {
  return (
    <AuthGuard requireAuth={true}>
      <AccessibilitySettings />
    </AuthGuard>
  )
}
