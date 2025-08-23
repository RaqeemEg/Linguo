import { AuthGuard } from "@/components/auth/auth-guard"
import { DocumentViewer } from "@/components/read/document-viewer"

interface DocumentPageProps {
  params: {
    documentId: string
  }
}

export default function DocumentPage({ params }: DocumentPageProps) {
  return (
    <AuthGuard requireAuth={true}>
      <DocumentViewer documentId={params.documentId} />
    </AuthGuard>
  )
}
