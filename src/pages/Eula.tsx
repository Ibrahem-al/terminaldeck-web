import { Link } from 'react-router-dom'
import { LegalLayout } from '../components/legal/LegalLayout'

export function Eula() {
  return (
    <LegalLayout>
      <h1 className="text-4xl font-bold mb-2">End User License Agreement</h1>
      <p className="text-text-dim text-sm mb-12">Last Updated: April 5, 2026</p>

      <div className="space-y-10 text-text-mid leading-relaxed">
        <section>
          <p>
            PLEASE READ THIS END USER LICENSE AGREEMENT ("AGREEMENT") CAREFULLY BEFORE INSTALLING OR USING
            TERMINALDECK ("SOFTWARE"). BY INSTALLING OR USING THE SOFTWARE, YOU ("USER") AGREE TO BE BOUND
            BY THE TERMS OF THIS AGREEMENT. IF YOU DO NOT AGREE, DO NOT INSTALL OR USE THE SOFTWARE.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">1. License Grant</h2>
          <p>
            The developer ("Licensor") grants you a non-exclusive, non-transferable, revocable license to
            install and use the Software on devices that you own or control, for personal or commercial use,
            subject to the terms and conditions of this Agreement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">2. Restrictions</h2>
          <p>You may not:</p>
          <ul className="list-disc list-inside space-y-1.5 ml-2 mt-2">
            <li>Modify, adapt, translate, reverse engineer, decompile, or disassemble the Software</li>
            <li>Create derivative works based on the Software</li>
            <li>Rent, lease, lend, sell, sublicense, or distribute the Software to third parties</li>
            <li>Remove, alter, or obscure any proprietary notices, labels, or marks on the Software</li>
            <li>Use the Software for any purpose that is unlawful or prohibited by this Agreement</li>
            <li>Use the Software to develop a competing product or service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">3. Intellectual Property</h2>
          <p>
            The Software and all copies thereof are the intellectual property of and are owned by the Licensor.
            The structure, organization, source code, and design of the Software are trade secrets and
            confidential information of the Licensor. The Software is protected by copyright, trademark, and
            other intellectual property laws. This Agreement does not grant you any ownership interest in or to
            the Software, but only a limited right of use.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">4. Data and Privacy</h2>
          <p>
            The Software operates primarily on your local device. Your workspace configurations, terminal
            sessions, and user preferences are stored locally on your machine. For full details about how we
            handle data, please review our{' '}
            <Link to="/privacy" className="text-cyan hover:underline">Privacy Policy</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">5. Updates and Maintenance</h2>
          <p>
            The Licensor may, at its discretion, provide updates, upgrades, patches, or other modifications
            to the Software. Such updates may be automatic or may require manual action. This Agreement applies
            to all updates unless a separate license agreement is provided with the update. The Licensor is
            under no obligation to provide support, maintenance, updates, or modifications.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">6. Disclaimer of Warranties</h2>
          <p>
            THE SOFTWARE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
            IMPLIED. THE LICENSOR SPECIFICALLY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO THE
            IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND
            NON-INFRINGEMENT. THE LICENSOR DOES NOT WARRANT THAT THE SOFTWARE WILL MEET YOUR REQUIREMENTS,
            OPERATE WITHOUT INTERRUPTION, OR BE ERROR-FREE.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">7. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE LICENSOR BE LIABLE FOR
            ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION
            DAMAGES FOR LOSS OF DATA, LOSS OF PROFITS, LOSS OF GOODWILL, BUSINESS INTERRUPTION, COMPUTER
            FAILURE OR MALFUNCTION, OR ANY OTHER DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OR INABILITY TO
            USE THE SOFTWARE, EVEN IF THE LICENSOR HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>
          <p className="mt-3">
            THE LICENSOR'S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THIS AGREEMENT SHALL NOT
            EXCEED THE TOTAL AMOUNT PAID BY YOU FOR THE SOFTWARE DURING THE TWELVE (12) MONTHS PRECEDING THE
            CLAIM, OR TEN DOLLARS ($10.00), WHICHEVER IS GREATER.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">8. Assumption of Risk</h2>
          <p>
            You acknowledge that the Software provides a terminal environment through which system commands
            are executed. You accept full responsibility for all commands executed within the Software and any
            consequences thereof. The Licensor bears no liability for actions performed through terminal
            sessions within the Software.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">9. Termination</h2>
          <p>
            This Agreement is effective until terminated. Your rights under this Agreement will terminate
            automatically without notice if you fail to comply with any term of this Agreement. Upon
            termination, you must cease all use of the Software and destroy all copies, full or partial,
            of the Software in your possession. Sections 3, 6, 7, 8, and 11 shall survive any termination
            of this Agreement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">10. Export Compliance</h2>
          <p>
            You agree to comply with all applicable export and re-export control laws and regulations,
            including any restrictions on destinations, end users, and end use.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">11. Governing Law and Dispute Resolution</h2>
          <p>
            This Agreement shall be governed by and construed in accordance with the laws of the jurisdiction
            in which the Licensor resides, without regard to its conflict of law provisions. Any disputes
            arising from this Agreement shall be resolved through good-faith negotiation, and if unresolved,
            in the courts of competent jurisdiction where the Licensor is located.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">12. Severability</h2>
          <p>
            If any provision of this Agreement is found to be unenforceable or invalid, that provision shall
            be limited or eliminated to the minimum extent necessary so that this Agreement shall otherwise
            remain in full force and effect.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">13. Entire Agreement</h2>
          <p>
            This Agreement, together with the{' '}
            <Link to="/privacy" className="text-cyan hover:underline">Privacy Policy</Link> and{' '}
            <Link to="/terms" className="text-cyan hover:underline">Terms of Service</Link>, constitutes the
            entire agreement between you and the Licensor regarding the Software and supersedes all prior
            negotiations, representations, or agreements relating to the Software.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">14. Contact Information</h2>
          <p>
            For questions about this Agreement, please open an issue on our{' '}
            <a href="https://github.com/Ibrahem-al/terminaldeck-web" target="_blank" rel="noopener noreferrer"
              className="text-cyan hover:underline">
              GitHub repository
            </a>.
          </p>
        </section>

        <section className="pt-4 border-t border-border">
          <p className="text-text-dim text-sm">
            By installing or using TerminalDeck, you acknowledge that you have read this Agreement,
            understand it, and agree to be bound by its terms and conditions.
          </p>
        </section>
      </div>
    </LegalLayout>
  )
}
