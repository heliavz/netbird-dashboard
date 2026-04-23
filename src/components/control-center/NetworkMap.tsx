import { groups, peers, policies } from "@/data/mockData";
import {
  Background,
  BackgroundVariant,
  Controls,
  type Edge,
  type Node,
  ReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useMemo } from "react";
import { GroupNode, PeerNode, type NodeData } from "./NetworkMapNode";

const nodeTypes = {
  peer: PeerNode,
  group: GroupNode,
};

function buildGraph(): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Place group nodes in a column on the right
  const groupSpacingY = 110;
  const groupStartY = 60;
  const groupX = 480;

  groups.forEach((group, i) => {
    nodes.push({
      id: `group-${group.id}`,
      type: "group",
      position: { x: groupX, y: groupStartY + i * groupSpacingY },
      data: {
        label: group.name,
        kind: "group",
        peerCount: group.peersCount,
      } satisfies NodeData,
    });
  });

  // Place peer nodes in a column on the left
  const peerSpacingY = 90;
  const peerStartY = 80;
  const peerX = 60;

  peers.forEach((peer, i) => {
    nodes.push({
      id: `peer-${peer.id}`,
      type: "peer",
      position: { x: peerX, y: peerStartY + i * peerSpacingY },
      data: {
        label: peer.name,
        ip: peer.ip,
        status: peer.status,
        kind: "peer",
        os: peer.os,
      } satisfies NodeData,
    });

    // Connect each peer to its groups
    peer.groups.forEach((groupName) => {
      const group = groups.find((g) => g.name === groupName);
      if (group) {
        edges.push({
          id: `e-${peer.id}-${group.id}`,
          source: `peer-${peer.id}`,
          target: `group-${group.id}`,
          type: "smoothstep",
          style: {
            stroke:
              peer.status === "online"
                ? "rgba(49, 228, 245, 0.35)"
                : "rgba(97, 110, 121, 0.25)",
            strokeWidth: 1.5,
            strokeDasharray: peer.status === "online" ? "0" : "4 3",
          },
          animated: peer.status === "online",
        });
      }
    });
  });

  // Add policy edges between groups
  policies
    .filter((p) => p.active)
    .forEach((policy) => {
      policy.sources.forEach((srcName) => {
        policy.destinations.forEach((dstName) => {
          if (srcName === dstName) return;
          const src = groups.find((g) => g.name === srcName);
          const dst = groups.find((g) => g.name === dstName);
          if (src && dst) {
            edges.push({
              id: `policy-${policy.id}-${src.id}-${dst.id}`,
              source: `group-${src.id}`,
              target: `group-${dst.id}`,
              type: "smoothstep",
              label: policy.name,
              labelStyle: {
                fill: "#7c8994",
                fontSize: 10,
              },
              labelBgStyle: {
                fill: "#1c1e21",
              },
              style: {
                stroke: "rgba(246, 131, 48, 0.4)",
                strokeWidth: 1.5,
              },
            });
          }
        });
      });
    });

  return { nodes, edges };
}

function NetworkMapInner() {
  const { nodes, edges } = useMemo(() => buildGraph(), []);

  return (
    <div className="w-full h-[560px] rounded-lg border border-nb-gray-900 overflow-hidden bg-nb-gray-960">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.4}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#2e3238"
        />
        <Controls
          className="!bg-nb-gray-920 !border-nb-gray-800 !rounded-lg"
          showInteractive={false}
        />
      </ReactFlow>
    </div>
  );
}

export default function NetworkMap() {
  return (
    <ReactFlowProvider>
      <NetworkMapInner />
    </ReactFlowProvider>
  );
}
