import { AuthGuard } from "@/components/auth/auth-guard"
import { DocumentLibrary } from "@/components/read/document-library"

export default function LibraryPage() {
  return (
    <AuthGuard requireAuth={true}>
      <DocumentLibrary />
    </AuthGuard>
  )
}
