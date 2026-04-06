import { Link } from 'react-router-dom'
import { LegalLayout } from '../components/legal/LegalLayout'

export function TermsOfService() {
  return (
    <LegalLayout>
      <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
      <p className="text-text-dim text-sm mb-12">Last Updated: April 5, 2026</p>

      <div className="space-y-10 text-text-mid leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">1. Acceptance of Terms</h2>
          <p>
            By downloading, installing, or using TerminalDeck ("Software"), you agree to be bound by these
            Terms of Service ("Terms"). If you do not agree to these Terms, do not install or use the Software.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">2. Description of Software</h2>
          <p>
            TerminalDeck is a desktop application that provides a spatial canvas workspace for managing
            terminal instances. The Software allows users to arrange terminals freely, organize them into
            projects and workspaces, and customize their workflow environment.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">3. License</h2>
          <p>
            Subject to your compliance with these Terms, we grant you a limited, non-exclusive,
            non-transferable, revocable license to download, install, and use the Software on your personal
            devices. This license is governed by the{' '}
            <Link to="/eula" className="text-cyan hover:underline">End User License Agreement (EULA)</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">4. User Responsibilities</h2>
          <p>You agree to:</p>
          <ul className="list-disc list-inside space-y-1.5 ml-2 mt-2">
            <li>Use the Software in compliance with all applicable laws and regulations</li>
            <li>Not use the Software to execute, facilitate, or conceal any illegal activity</li>
            <li>Not attempt to circumvent any security features of the Software</li>
            <li>Not distribute, sublicense, or resell the Software without authorization</li>
            <li>Accept responsibility for all commands executed through terminals within the Software</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">5. Intellectual Property</h2>
          <p>
            The Software, including its code, design, graphics, logos, and documentation, is the intellectual
            property of TerminalDeck and its contributors. These Terms do not grant you any rights to use our
            trademarks, trade names, or branding without prior written consent.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">6. Updates and Modifications</h2>
          <p>
            We may release updates, patches, or new versions of the Software at our discretion. While we
            strive to improve the Software, we do not guarantee that any specific features will be maintained,
            added, or available in future versions. Continued use of the Software after an update constitutes
            acceptance of any modified terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">7. Third-Party Software</h2>
          <p>
            TerminalDeck may interact with third-party shells, tools, and applications installed on your system.
            We are not responsible for the behavior, security, or output of third-party software accessed through
            the terminal environment. Your use of such software is governed by their respective terms and licenses.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">8. Disclaimer of Warranties</h2>
          <p>
            THE SOFTWARE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS
            OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
            PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SOFTWARE WILL BE UNINTERRUPTED,
            ERROR-FREE, OR FREE OF HARMFUL COMPONENTS.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">9. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL TERMINALDECK, ITS DEVELOPERS,
            OR CONTRIBUTORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
            INCLUDING BUT NOT LIMITED TO:
          </p>
          <ul className="list-disc list-inside space-y-1.5 ml-2 mt-2">
            <li>Loss of data or data corruption</li>
            <li>Loss of profits or revenue</li>
            <li>System damage or security breaches</li>
            <li>Business interruption</li>
            <li>Damages arising from commands executed through the terminal</li>
          </ul>
          <p className="mt-3">
            OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU FOR THE SOFTWARE, IF ANY.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">10. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless TerminalDeck and its developers from and against
            any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out
            of or in any way connected with your use of the Software or violation of these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">11. Termination</h2>
          <p>
            We reserve the right to terminate or suspend your license to use the Software at any time if you
            violate these Terms. Upon termination, you must cease all use of the Software and delete all copies
            from your devices. Sections 5, 8, 9, and 10 shall survive termination.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">12. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in
            which the developer resides, without regard to conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">13. Changes to These Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be effective upon posting
            the updated Terms with a revised "Last Updated" date. Your continued use of the Software after
            changes are posted constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">14. Contact</h2>
          <p>
            For questions about these Terms, please open an issue on our{' '}
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
