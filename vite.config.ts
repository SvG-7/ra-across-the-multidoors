import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { WebSocketServer, WebSocket } from 'ws';

// In-memory store for honest real-time anonymous response aggregation
const aggregateState = {
  activeAttendees: 0,
  totalSubmissions: 0,
  communityDistribution: {} as Record<string, number>,
  chapter2: {} as Record<string, number>,
  chapter3: {} as Record<string, number>,
  chapter4: {} as Record<string, number>,
  chapter6: {} as Record<string, number>,
  // Track unique attendees to count revisions as updates, not new participants
  attendeeRecords: {} as Record<string, {
    community?: string;
    chapter2?: string;
    chapter3?: string;
    chapter4?: string;
    chapter6?: string;
  }>,
  collectiveContributions: [] as Array<{
    attendeeId: string;
    world: string;
    ch2Choice?: string;
    ch3Choice?: string;
    ch4Choice?: string;
    ch6Choice?: string;
    nodeColor: string;
  }>,
};

function broadcastState(wss: WebSocketServer) {
  const payload = {
    activeAttendees: wss.clients.size,
    totalParticipants: Object.keys(aggregateState.attendeeRecords).length,
    communityDistribution: aggregateState.communityDistribution,
    chapter2: aggregateState.chapter2,
    chapter3: aggregateState.chapter3,
    chapter4: aggregateState.chapter4,
    chapter6: aggregateState.chapter6,
    collectiveContributions: aggregateState.collectiveContributions,
  };
  const message = JSON.stringify({ type: 'AGGREGATE_STATE', payload });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

function syncPlugin() {
  return {
    name: 'multiverse-sync-server',
    configureServer(server: any) {
      if (!server.httpServer) return;
      const wss = new WebSocketServer({ noServer: true });

      server.httpServer.on('upgrade', (request: any, socket: any, head: any) => {
        if (request.url === '/ws-sync') {
          wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
          });
        }
      });

      wss.on('connection', (ws) => {
        // Send initial aggregate counts to newly connected client
        const payload = {
          activeAttendees: wss.clients.size,
          totalParticipants: Object.keys(aggregateState.attendeeRecords).length,
          communityDistribution: aggregateState.communityDistribution,
          chapter2: aggregateState.chapter2,
          chapter3: aggregateState.chapter3,
          chapter4: aggregateState.chapter4,
          chapter6: aggregateState.chapter6,
          collectiveContributions: aggregateState.collectiveContributions,
        };
        ws.send(JSON.stringify({ type: 'AGGREGATE_STATE', payload }));
        broadcastState(wss);

        ws.on('message', (data: any) => {
          try {
            const parsed = JSON.parse(data.toString());
            const { type, payload } = parsed;

            switch (type) {
              case 'SUBMIT_COMMUNITY': {
                const { attendeeId, community } = payload;
                if (!attendeeId || !community) break;
                if (!aggregateState.attendeeRecords[attendeeId]) {
                  aggregateState.attendeeRecords[attendeeId] = {};
                }
                const oldComm = aggregateState.attendeeRecords[attendeeId].community;
                if (oldComm && aggregateState.communityDistribution[oldComm]) {
                  aggregateState.communityDistribution[oldComm] = Math.max(0, aggregateState.communityDistribution[oldComm] - 1);
                }
                aggregateState.attendeeRecords[attendeeId].community = community;
                aggregateState.communityDistribution[community] = (aggregateState.communityDistribution[community] || 0) + 1;
                broadcastState(wss);
                break;
              }

              case 'SUBMIT_ANSWER': {
                const { attendeeId, chapter, optionId, community } = payload;
                if (!attendeeId || !chapter || !optionId) break;
                if (!aggregateState.attendeeRecords[attendeeId]) {
                  aggregateState.attendeeRecords[attendeeId] = {};
                }

                const chKey = `chapter${chapter}` as 'chapter2' | 'chapter3' | 'chapter4' | 'chapter6';
                if (aggregateState[chKey]) {
                  const oldChoice = aggregateState.attendeeRecords[attendeeId][chKey];
                  if (oldChoice && aggregateState[chKey][oldChoice]) {
                    // Count updated answer as a revision, not a duplicate participant
                    aggregateState[chKey][oldChoice] = Math.max(0, aggregateState[chKey][oldChoice] - 1);
                  }
                  aggregateState.attendeeRecords[attendeeId][chKey] = optionId;
                  aggregateState[chKey][optionId] = (aggregateState[chKey][optionId] || 0) + 1;
                }

                // Update collective web node
                let node = aggregateState.collectiveContributions.find(c => c.attendeeId === attendeeId);
                if (!node) {
                  const palette = ['#FF1744', '#00F0FF', '#FFE600', '#FF007F', '#A855F7'];
                  node = {
                    attendeeId,
                    world: community || 'Both',
                    nodeColor: palette[aggregateState.collectiveContributions.length % palette.length],
                  };
                  aggregateState.collectiveContributions.push(node);
                }
                if (community) node.world = community;
                if (chapter === 2) node.ch2Choice = optionId;
                if (chapter === 3) node.ch3Choice = optionId;
                if (chapter === 4) node.ch4Choice = optionId;
                if (chapter === 6) node.ch6Choice = optionId;

                broadcastState(wss);
                break;
              }
            }
          } catch (e) {
            console.error('WebSocket message parsing error:', e);
          }
        });

        ws.on('close', () => {
          broadcastState(wss);
        });
      });
    },
  };
}

export default defineConfig({
  base: '/ra-across-the-multidoors/',
  plugins: [react(), syncPlugin()],
  server: {
    port: 5173,
    host: '0.0.0.0', // Listen on all network interfaces so shared URLs work everywhere
    allowedHosts: true, // Allow all external tunnels, subdomains, and public hosts
    cors: true,
  },
  preview: {
    port: 5173,
    host: '0.0.0.0',
    allowedHosts: true,
    cors: true,
  },
});
