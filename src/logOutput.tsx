import { readLogs } from "./logger/read";

function calculateCoverage(totalEvents: (string | number)[], filteredEvents: { count: number; name: string | number; }[]) {
  return ((filteredEvents.length / totalEvents.length) * 100).toFixed(2);
}
export async function generateCoverageHTML(EVENT_ID: { [key: string]: string | number }) {

  // Convert EVENT_ID object values to an array of events
  const events = Object.keys(EVENT_ID);
  const logs = await readLogs();

  // Count occurrences of each event
  const eventCounts = events.map(event => {
    return {
      count: logs.filter(e => e?.event.id === EVENT_ID[event]).length,
      name: event
    };
  }).sort((a, b) => b.count - a.count);

  // Calculate coverage percentage
  const coveragePercentage = calculateCoverage(
    events,
    eventCounts.filter(e => e.count > 0)
  );

  // Build HTML string
  let html = `
        <div style="padding: 20px; font-family: Arial, sans-serif; text-align: center;">
            <h1>Coverage: ${coveragePercentage}%</h1>
            <table style="border-collapse: collapse; width: 50%; margin: 0 auto;">
                <thead>
                    <tr>
                        <th style="padding: 9px; border: 1px solid #ddd;">Event</th>
                        <th style="padding: 9px; border: 1px solid #ddd;">Run # Times</th>
                    </tr>
                </thead>
                <tbody>
    `;

  // Append each event count as a table row
  eventCounts.forEach(event => {
    const rowStyle = event.count === 0 ? 'background-color: red;' : 'background-color: white;';
    html += `
            <tr style="${rowStyle}">
                <td style="padding: 9px; border: 1px solid #ddd;">${event.name}</td>
                <td style="padding: 9px; border: 1px solid #ddd;">${event.count}</td>
            </tr>
        `;
  });

  // Close the HTML tags
  html += `
                </tbody>
            </table>
        </div>
    `;

  return html;
}
