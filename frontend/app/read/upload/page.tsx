import { AuthGuard } from "@/components/auth/auth-guard"
import { DocumentUpload } from "@/components/read/document-upload"

export default function UploadPage() {
  return (
    <AuthGuard requireAuth={true}>
      <DocumentUpload />
    </AuthGuard>
  )
}
