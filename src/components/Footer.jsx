const Footer = () => {
  return (
    <footer className="bg-[#FCE9E4] text-[#326287] mt-8 py-8 shadow-inner">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">FAQ & Hilfe</h3>
          <ul className="space-y-2">
            <li>
              <a href="/faq#bezahlarten" className="hover:underline">
                Bezahlarten
              </a>
            </li>
            <li>
              <a href="/faq#versand" className="hover:underline">
                Versand
              </a>
            </li>
            <li>
              <a href="/faq#ruecksendung" className="hover:underline">
                Rücksendung
              </a>
            </li>
            <li>
              <a href="/faq#lieferdienste" className="hover:underline">
                Lieferdienste (DHL)
              </a>
            </li>
            <li>
              <a href="/faq#reklamationen" className="hover:underline">
                Reklamationen
              </a>
            </li>
            <li>
              <a href="/datenschutz" className="hover:underline">
                Datenschutz
              </a>
            </li>
            <li>
              <a href="/impressum" className="hover:underline">
                Impressum
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Kontakt</h3>
          <p>glowify@example.com</p>
          <p>+49 123 456789</p>
          <p>Musterstraße 1, 12345 Berlin</p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Newsletter</h3>
          <form>
            <input
              type="email"
              placeholder="E-Mail eingeben"
              className="w-full px-3 py-2 rounded mb-2 text-gray-900"
            />
            <button
              type="submit"
              className="w-full bg-[#326287] hover:bg-[#264a66] transition text-white py-2 rounded"
            >
              Abonnieren
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
