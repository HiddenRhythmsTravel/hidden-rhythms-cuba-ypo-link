import React from "react";

const flightOptions = [
  {
    carrier: "American Airlines",
    type: "Option 1 (Main Program: Jan 27 - Jan 31)",
    route: "Columbus (CMH) ➔ Medellín (MDE)",
    inbound: "CMH ➔ MIA: 6:10 AM – 9:09 AM (AA 3437) | Layover: 1h 20m | MIA ➔ MDE: 10:29 AM – 2:09 PM (AA 1127)",
    outbound: "MDE ➔ MIA: 3:10 PM – 7:02 PM (AA 1128) | Layover: 2h 43m | MIA ➔ CMH: 9:45 PM – 12:44 AM+1 (AA 3607)",
    duration: "Inbound: 7h 59m | Outbound: 8h 34m",
    notes: "Perfect connection timings for the main program. Early arrival in Medellin to maximize day 1."
  },
  {
    carrier: "Delta Air Lines",
    type: "Option 2 (1-Night Bogotá Extension: Jan 27 - Feb 1)",
    route: "Inbound to MDE via MIA | Return Bogotá (BOG) ➔ CMH",
    inbound: "Refer to Option 1 for CMH ➔ MDE inbound flight details.",
    outbound: "BOG ➔ ATL: 3:40 PM – 8:40 PM (DL 983) | Layover: 1h 45m | ATL ➔ CMH: 10:25 PM – 11:55 PM (DL 1459)",
    duration: "Outbound: 8h 15m",
    notes: "Delta connection via Atlanta. Ideal for those concluding the extension on February 1st."
  },
  {
    carrier: "American Airlines",
    type: "Option 3 (2-Night Bogotá Extension: Jan 27 - Feb 2)",
    route: "Inbound to MDE via MIA | Return Bogotá (BOG) ➔ CMH",
    inbound: "Refer to Option 1 for CMH ➔ MDE inbound flight details.",
    outbound: "BOG ➔ MIA: 3:15 PM – 7:35 PM (AA 916) | Layover: 2h 10m | MIA ➔ CMH: 9:45 PM – 12:44 AM+1 (AA 3607)",
    duration: "Outbound: 8h 29m",
    notes: "American Airlines return via Miami. Matches perfectly with the full 2-night Bogota extension."
  }
];

export default function FlightSuggestions() {
  return (
    <div className="flight-suggestions" style={{ marginTop: "3rem" }}>
      <p style={{ opacity: 0.8, fontSize: "1.05rem", marginBottom: "2rem", maxWidth: "800px" }}>
        *Please note that international flights are not included in the ground package. We recommend booking early to secure the best rates and connection schedules. Prioritize these preferred morning connections to maximize your experience.
      </p>

      <div className="flight-table-wrapper">
        <table className="flight-table">
          <thead>
            <tr>
              <th>Carrier & Option</th>
              <th>Route Focus</th>
              <th>Inbound Schedule (Jan 27)</th>
              <th>Outbound Schedule</th>
              <th>Total Travel Time</th>
            </tr>
          </thead>
          <tbody>
            {flightOptions.map((opt, idx) => (
              <tr key={idx} style={{ background: idx % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                <td>
                  <div style={{ fontWeight: "bold", color: "var(--accent)", fontSize: "1rem" }}>{opt.carrier}</div>
                  <div style={{ fontSize: "0.8rem", opacity: 0.6, marginTop: "4px" }}>{opt.type}</div>
                </td>
                <td>
                  <div style={{ fontSize: "0.9rem", fontWeight: "500" }}>{opt.route}</div>
                  <div style={{ fontSize: "0.8rem", opacity: 0.7, marginTop: "6px", fontStyle: "italic" }}>{opt.notes}</div>
                </td>
                <td style={{ fontSize: "0.85rem", opacity: 0.9, lineHeight: "1.4" }}>{opt.inbound}</td>
                <td style={{ fontSize: "0.85rem", opacity: 0.9, lineHeight: "1.4" }}>{opt.outbound}</td>
                <td style={{ fontSize: "0.85rem", fontWeight: "500", color: "var(--accent-gold)" }}>{opt.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
