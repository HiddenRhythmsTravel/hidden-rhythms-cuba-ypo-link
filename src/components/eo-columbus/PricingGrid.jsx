import React, { useState } from "react";

export default function PricingGrid() {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const medellinPricing = [
    { tier: "10-20 Passengers", double: "$3,960", single: "$4,460" },
    { tier: "21-31 Passengers", double: "$3,700", single: "$4,300" },
    { tier: "32+ Passengers", double: "$3,445", single: "$4,045" }
  ];

  const bogotaPricing = [
    { tier: "5-14 Passengers (1 Night Extension)", cost: "$1,485", occupancy: "Double Occupancy" },
    { tier: "15+ Passengers (1 Night Extension)", cost: "$1,250", occupancy: "Double Occupancy" },
    { tier: "5-14 Passengers (2 Nights Extension)", cost: "$1,885", occupancy: "Double Occupancy" },
    { tier: "15+ Passengers (2 Nights Extension)", cost: "$1,650", occupancy: "Double Occupancy" }
  ];

  return (
    <div className="pricing-grid-component" style={{ marginTop: "3rem" }}>
      <p style={{ opacity: 0.8, fontSize: "1.05rem", marginBottom: "2rem", maxWidth: "800px" }}>
        Hidden Rhythms delivers transparent, itemized package pricing in USD. The retreat package cost dynamically decreases as more chapter members and spouses enroll.
      </p>

      <div className="responsive-grid-2" style={{ margin: "2rem 0" }}>
        
        {/* Medellin Package Card */}
        <div style={{
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: "16px", padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1.5rem"
        }}>
          <div>
            <span style={{ fontSize: "0.8rem", color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: "bold" }}>Primary Package</span>
            <h3 style={{ fontSize: "1.75rem", fontFamily: "var(--font-serif)", marginTop: "0.5rem" }}>Medellín Retreat</h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.7, margin: 0 }}>Main Chapter Retreat: January 27–31, 2027 (4 Nights)</p>
          </div>

          <table className="pricing-table">
            <thead>
              <tr>
                <th>Passenger Tier</th>
                <th>Double Occupancy</th>
                <th>Single Occupancy</th>
              </tr>
            </thead>
            <tbody>
              {medellinPricing.map((row, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: "bold", fontSize: "0.92rem" }}>{row.tier}</td>
                  <td style={{ color: "var(--accent-gold)", fontWeight: "600", fontSize: "1rem" }}>{row.double} <span style={{fontSize:"0.75rem", opacity:0.6}}>/ pax</span></td>
                  <td style={{ color: "white", fontWeight: "500", fontSize: "1rem" }}>{row.single} <span style={{fontSize:"0.75rem", opacity:0.6}}>/ pax</span></td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ fontSize: "0.82rem", opacity: 0.6, marginTop: "0.5rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1rem" }}>
            *Medellín ground package pricing includes 4 nights accommodations at the Hotel Click Clack, 4 breakfasts, 3 lunches, 2 dinners, professional bilingual guides, local transport, speaker fees, and admissions.
          </div>
        </div>

        {/* Bogota Extension Card */}
        <div style={{
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: "16px", padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1.5rem"
        }}>
          <div>
            <span style={{ fontSize: "0.8rem", color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: "bold" }}>Optional Extension</span>
            <h3 style={{ fontSize: "1.75rem", fontFamily: "var(--font-serif)", marginTop: "0.5rem" }}>Bogotá Extension</h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.7, margin: 0 }}>Capital Immersive: January 31–Feb 1 or 2, 2027 (1 or 2 Nights)</p>
          </div>

          <table className="pricing-table">
            <thead>
              <tr>
                <th>Extension Tier & Nights</th>
                <th>Double Occupancy</th>
                <th>Single Supp.</th>
              </tr>
            </thead>
            <tbody>
              {bogotaPricing.map((row, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: "bold", fontSize: "0.92rem" }}>{row.tier}</td>
                  <td style={{ color: "var(--accent-gold)", fontWeight: "600", fontSize: "1rem" }}>{row.cost} <span style={{fontSize:"0.75rem", opacity:0.6}}>/ pax</span></td>
                  <td style={{ color: "white", fontWeight: "500", fontSize: "0.92rem" }}>+$250 <span style={{fontSize:"0.75rem", opacity:0.6}}>/ night</span></td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ fontSize: "0.82rem", opacity: 0.6, marginTop: "0.5rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1rem" }}>
            *Bogotá extension pricing includes Sofitel Victoria Regia lodging, domestic flight from Medellín to Bogotá, 2 breakfasts, 1 lunch, 2 dinners, professional guides, private local transport, art tours, and admissions.
          </div>
        </div>

      </div>

      {/* Included / Not Included Grids */}
      <div className="responsive-grid-2" style={{ margin: "3rem 0" }}>
        
        {/* Inclusions */}
        <div>
          <h4 style={{ fontSize: "1.3rem", fontFamily: "var(--font-serif)", color: "var(--accent)", marginBottom: "1.2rem", display: "flex", alignItems: "center", gap: "10px" }}>
            <span>✓</span> What is Included in the Ground Package
          </h4>
          <ul style={{ paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: "0.75rem", opacity: 0.9, fontSize: "0.92rem" }}>
            <li><strong>Luxury Accommodations:</strong> 4 nights at Hotel Click Clack (Medellín) & 1 or 2 nights at Sofitel Victoria Regia (Bogotá).</li>
            <li><strong>Curated Dining:</strong> 4 breakfasts, 3 lunches, 2 dinners in Medellín; 2 breakfasts, 1 lunch, 2 dinners in Bogotá.</li>
            <li><strong>Refreshment Inclusions:</strong> Lunches and dinners feature two curated drinks per person.</li>
            <li><strong>Expert Guidance:</strong> Local, professional bilingual curators and event guides dedicated each day.</li>
            <li><strong>Extension Transit:</strong> Economy class domestic flight ticket from Medellín to Bogotá (MDE ➔ BOG).</li>
            <li><strong>Ground Logistics:</strong> Private group transfers in luxury sprinters for all listed activities.</li>
            <li><strong>Speaker & Venues:</strong> Expert fees, VIP venue rentals, and admission charges for all listed museums and ateliers.</li>
          </ul>
        </div>

        {/* Exclusions */}
        <div>
          <h4 style={{ fontSize: "1.3rem", fontFamily: "var(--font-serif)", color: "rgba(255,255,255,0.5)", marginBottom: "1.2rem", display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ color: "#e74c3c" }}>✗</span> What is Not Included
          </h4>
          <ul style={{ paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: "0.75rem", opacity: 0.75, fontSize: "0.92rem" }}>
            <li><strong>International Airfare:</strong> Flights from Columbus (CMH) to Colombia and return.</li>
            <li><strong>Unlisted Excursions:</strong> Optional paragliding at San Felix, Guatapé premium tours, and individual shopping.</li>
            <li><strong>Specialty Beverage Programs:</strong> Top shelf wines, high-end single-barrel spirits, and premium alcohol.</li>
            <li><strong>Personal Incidental Charges:</strong> Mini bar consumption, laundry services, and standard room service.</li>
            <li><strong>Personal Expenses:</strong> Gratuities and other individual expenditures not listed in the main itinerary.</li>
          </ul>
        </div>

      </div>

      {/* Payment Timeline Callout */}
      <div style={{
        background: "rgba(239, 156, 130, 0.04)", border: "1px solid rgba(239, 156, 130, 0.15)",
        borderRadius: "16px", padding: "2rem", marginTop: "3rem"
      }}>
        <strong style={{ color: "var(--accent)", fontSize: "1.1rem", display: "block", marginBottom: "8px" }}>MOU Payment Timeline & Terms</strong>
        <p style={{ fontSize: "0.92rem", opacity: 0.85, margin: 0, lineHeight: "1.6" }}>
          To secure your position, a **deposit of $1,000 per person** and a signed copy of the Memorandum of Understanding are due by **June 27, 2026**. The **full program payment is due on October 27, 2026**. 
          <br /><br />
          Payments can be completed by check, ACH, or Zelle. Checks should be made payable to **Hidden Rhythms Travel** and mailed to our principal office: Attn: EO Columbus - Colombia, 136 Sequams Lane W., West Islip, NY 11795. Digital and ACH invoice backup will be generated upon registration.
        </p>
      </div>
    </div>
  );
}
