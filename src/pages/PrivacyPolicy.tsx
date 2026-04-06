import { LegalLayout } from '../components/legal/LegalLayout'

export function PrivacyPolicy() {
  return (
    <LegalLayout>
      <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-text-dim text-sm mb-12">Last Updated: April 5, 2026</p>

      <div className="space-y-10 text-text-mid leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">1. Introduction</h2>
          <p>
            TerminalDeck ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, and safeguard information when you use the TerminalDeck desktop
            application ("Software") and our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">2. Information We Collect</h2>
          <h3 className="text-base font-semibold text-text mb-2">2.1 Local Data</h3>
          <p className="mb-3">
            TerminalDeck operates primarily as a local desktop application. The following data is stored
            exclusively on your device and is never transmitted to our servers:
          </p>
          <ul className="list-disc list-inside space-y-1.5 ml-2">
            <li>Workspace configurations and layouts</li>
            <li>Terminal session history and preferences</li>
            <li>Project organization settings</li>
            <li>Theme and customization preferences</li>
            <li>Application settings and keybindings</li>
          </ul>

          <h3 className="text-base font-semibold text-text mt-5 mb-2">2.2 Automatically Collected Data</h3>
          <p>
            We may collect anonymous, aggregated usage analytics to improve the Software, including
            application launch frequency and feature usage patterns. This data cannot be used to identify
            you personally. You may opt out of analytics collection in the application settings.
          </p>

          <h3 className="text-base font-semibold text-text mt-5 mb-2">2.3 Crash Reports</h3>
          <p>
            If the Software encounters an error, a crash report may be generated containing technical
            information about the error (stack traces, system configuration). Crash reports are only sent
            with your explicit consent and do not contain personal data or terminal content.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">3. Information We Do Not Collect</h2>
          <p>We want to be explicit about what we do not collect:</p>
          <ul className="list-disc list-inside space-y-1.5 ml-2 mt-2">
            <li>Terminal input, output, or command history</li>
            <li>File contents accessed through the terminal</li>
            <li>SSH keys, passwords, tokens, or credentials</li>
            <li>Network traffic routed through your terminals</li>
            <li>Personal identification information (name, email, address)</li>
            <li>Browsing or application usage outside of TerminalDeck</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">4. How We Use Information</h2>
          <p>Any information we collect is used solely to:</p>
          <ul className="list-disc list-inside space-y-1.5 ml-2 mt-2">
            <li>Improve application performance and stability</li>
            <li>Identify and fix bugs</li>
            <li>Understand which features are most valuable to users</li>
            <li>Guide development of future features</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">5. Data Sharing</h2>
          <p>
            We do not sell, trade, or rent your information to third parties. We may share anonymous,
            aggregated statistics that cannot identify any individual user.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">6. Data Security</h2>
          <p>
            All workspace data and settings are stored locally on your device using your operating system's
            standard application data directories. We recommend using your operating system's built-in
            encryption features (BitLocker on Windows, FileVault on macOS) for additional security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">7. Third-Party Services</h2>
          <p>
            TerminalDeck does not integrate with or send data to third-party advertising, tracking, or
            social media services. The Software may check for updates by contacting our update server,
            which only transmits your current application version and operating system type.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">8. Children's Privacy</h2>
          <p>
            TerminalDeck is not directed at children under the age of 13. We do not knowingly collect
            information from children under 13.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify users of material changes
            by updating the "Last Updated" date at the top of this page and, where feasible, through an
            in-app notification.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">10. Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy, please open an issue on our{' '}
            <a href="https://github.com/Ibrahem-al/terminaldeck-web" target="_blank" rel="noopener noreferrer"
              className="text-cyan hover:underline">
              GitHub repository
            </a>.
          </p>
        </section>
      </div>
    </LegalLayout>
  )
}
