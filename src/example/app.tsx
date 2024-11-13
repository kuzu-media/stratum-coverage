import React, { useEffect, useState } from "react";
import { stratumService } from "./stratum";
import { EVENT_ID } from "./catalog";
import { generateCoverageHTML } from "..";

const App = () => {
  const [logHTML, setlogHTML] = useState<string>("");

  useEffect(() => {
    try {
      async function asyncPublish() {
        await stratumService.publish(EVENT_ID.LOADED);
        generateCoverageHTML(EVENT_ID).then((html) => {
          setlogHTML(html);
        })
      };
      asyncPublish();

    } catch (error: any) {
      stratumService.publish(EVENT_ID.GENERIC_ERROR, {
        pluginData: {
          CoveragePlugin: {
            properties: {
              error: error as Error,
              message: error.message,
            },
          },
        },
      });
    }
  }, []);



  return (
    <div style={{ padding: "20px", fontFamily: "Arial", textAlign: "center" }}>
      <h1>React Example</h1>
      <p>This is a simple app running in a simulated React environment.</p>
      <button onClick={() => {
        stratumService.publish(EVENT_ID.BUTTON_CLICKED);
        generateCoverageHTML(EVENT_ID).then((html) => {
          setlogHTML(html);
        })
      }}>Add Event</button>
      <button onClick={() => {
        generateCoverageHTML(EVENT_ID).then((html) => {
          setlogHTML(html);
        })

      }}>Refresh Logs</button>

      <div dangerouslySetInnerHTML={{ __html: logHTML }} />
    </div>
  );
};

export default App;