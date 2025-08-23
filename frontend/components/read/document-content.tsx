"use client"

interface DocumentContentProps {
  selectedText: string
}

export function DocumentContent({ selectedText }: DocumentContentProps) {
  const documentText = `
TERMS AND CONDITIONS OF SERVICE

1. ACCEPTANCE OF TERMS

By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.

2. DESCRIPTION OF SERVICE

This service provides users with access to a rich collection of resources, including various communications tools, forums, shopping services, search engines, and personalized content through its network of properties which may be accessed through any various medium or device now known or hereafter developed.

3. REGISTRATION OBLIGATIONS

In consideration of your use of the service, you agree to: (a) provide true, accurate, current and complete information about yourself as prompted by the service's registration form and (b) maintain and promptly update the registration data to keep it true, accurate, current and complete.

4. USER CONDUCT

You understand that all information, data, text, software, music, sound, photographs, graphics, video, messages or other materials, whether publicly posted or privately transmitted, are the sole responsibility of the person from which such content originated.

5. PRIVACY POLICY

Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices.

6. MODIFICATIONS TO SERVICE

We reserve the right at any time and from time to time to modify or discontinue, temporarily or permanently, the service with or without notice.

7. TERMINATION

You agree that we may, in our sole discretion, terminate your password, account or use of the service, and remove and discard any content within the service, for any reason, including, without limitation, for lack of use or if we believe that you have violated or acted inconsistently with the letter or spirit of the terms.

8. DISCLAIMER OF WARRANTIES

You expressly understand and agree that your use of the service is at your sole risk. The service is provided on an "as is" and "as available" basis.

9. LIMITATION OF LIABILITY

You expressly understand and agree that we shall not be liable for any direct, indirect, incidental, special, consequential or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data or other intangible losses.

10. GENERAL INFORMATION

This agreement constitutes the entire agreement between you and us and governs your use of the service, superseding any prior agreements between you and us.
  `.trim()

  const highlightSelectedText = (text: string, selection: string) => {
    if (!selection) return text

    const parts = text.split(new RegExp(`(${selection.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"))
    return parts.map((part, index) => {
      if (part.toLowerCase() === selection.toLowerCase()) {
        return (
          <mark key={index} className="bg-accent/20 text-accent-foreground">
            {part}
          </mark>
        )
      }
      return part
    })
  }

  return (
    <div className="max-w-none">
      <div className="prose prose-lg max-w-none">
        <div className="text-foreground leading-relaxed font-serif text-base">
          {documentText.split("\n\n").map((paragraph, index) => (
            <p key={index} className="mb-6 text-justify" style={{ maxWidth: "75ch" }}>
              {highlightSelectedText(paragraph, selectedText)}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
