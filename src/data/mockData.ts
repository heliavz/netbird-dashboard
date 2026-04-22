// Types

export type OS = "linux" | "macos" | "windows" | "ios" | "android";
export type PeerStatus = "online" | "offline";

export interface Peer {
  id: string;
  name: string;
  fqdn: string;
  ip: string;
  status: PeerStatus;
  os: OS;
  groups: string[];
  lastSeen: string;
  version: string;
  country: string;
}

export interface Group {
  id: string;
  name: string;
  peersCount: number;
  policiesCount: number;
  routesCount: number;
  dnsCount: number;
  isDefault: boolean;
}

export type Direction = "bidirectional" | "unidirectional";
export type Protocol = "ALL" | "TCP" | "UDP" | "ICMP";

export interface Policy {
  id: string;
  name: string;
  description: string;
  active: boolean;
  sources: string[];
  destinations: string[];
  direction: Direction;
  protocol: Protocol;
  ports: string[];
  postureChecks: string[];
}

export interface Network {
  id: string;
  name: string;
  resourcesCount: number;
  policiesCount: number;
  routingPeers: string[];
  status: "active" | "inactive";
}

// Peers

export const peers: Peer[] = [
  {
    id: "p1",
    name: "ubuntuvps",
    fqdn: "ubuntuvps.netbird.cloud",
    ip: "100.114.67.217",
    status: "online",
    os: "linux",
    groups: ["All", "Servers"],
    lastSeen: "just now",
    version: "0.48.0",
    country: "DE",
  },
  {
    id: "p2",
    name: "SynologyNAS",
    fqdn: "synologynas.netbird.cloud",
    ip: "100.114.231.36",
    status: "online",
    os: "linux",
    groups: ["All", "Storage"],
    lastSeen: "just now",
    version: "0.48.0",
    country: "DE",
  },
  {
    id: "p3",
    name: "pve",
    fqdn: "pve.netbird.cloud",
    ip: "100.114.217.175",
    status: "online",
    os: "linux",
    groups: ["All", "Servers"],
    lastSeen: "just now",
    version: "0.46.0",
    country: "US",
  },
  {
    id: "p4",
    name: "netbirdpi",
    fqdn: "netbirdpi.netbird.cloud",
    ip: "100.114.77.164",
    status: "online",
    os: "linux",
    groups: ["All", "Routing"],
    lastSeen: "just now",
    version: "0.46.0",
    country: "DE",
  },
  {
    id: "p5",
    name: "iPhone-helia",
    fqdn: "iphone-helia.netbird.cloud",
    ip: "100.114.92.11",
    status: "offline",
    os: "ios",
    groups: ["All"],
    lastSeen: "2 days ago",
    version: "0.44.0",
    country: "DE",
  },
  {
    id: "p6",
    name: "misha.local",
    fqdn: "misha.netbird.cloud",
    ip: "100.121.118.110",
    status: "online",
    os: "macos",
    groups: ["All", "Admins"],
    lastSeen: "just now",
    version: "0.48.0",
    country: "DE",
  },
  {
    id: "p7",
    name: "dev-windows",
    fqdn: "dev-windows.netbird.cloud",
    ip: "100.114.55.23",
    status: "offline",
    os: "windows",
    groups: ["All"],
    lastSeen: "5 days ago",
    version: "0.45.0",
    country: "US",
  },
];

// Groups

export const groups: Group[] = [
  {
    id: "g1",
    name: "All",
    peersCount: 7,
    policiesCount: 2,
    routesCount: 1,
    dnsCount: 1,
    isDefault: true,
  },
  {
    id: "g2",
    name: "Servers",
    peersCount: 2,
    policiesCount: 1,
    routesCount: 0,
    dnsCount: 0,
    isDefault: false,
  },
  {
    id: "g3",
    name: "Admins",
    peersCount: 1,
    policiesCount: 2,
    routesCount: 0,
    dnsCount: 0,
    isDefault: false,
  },
  {
    id: "g4",
    name: "Routing",
    peersCount: 1,
    policiesCount: 0,
    routesCount: 2,
    dnsCount: 0,
    isDefault: false,
  },
  {
    id: "g5",
    name: "Storage",
    peersCount: 1,
    policiesCount: 1,
    routesCount: 0,
    dnsCount: 1,
    isDefault: false,
  },
];

// Policies

export const policies: Policy[] = [
  {
    id: "pol1",
    name: "Default",
    description: "Default policy that allows all peers to connect",
    active: true,
    sources: ["All"],
    destinations: ["All"],
    direction: "bidirectional",
    protocol: "ALL",
    ports: [],
    postureChecks: [],
  },
  {
    id: "pol2",
    name: "Admins to Servers",
    description: "Allow admin machines to SSH into servers",
    active: true,
    sources: ["Admins"],
    destinations: ["Servers"],
    direction: "bidirectional",
    protocol: "TCP",
    ports: ["22"],
    postureChecks: [],
  },
  {
    id: "pol3",
    name: "Storage Access",
    description: "Allow server group to access NAS storage",
    active: true,
    sources: ["Servers"],
    destinations: ["Storage"],
    direction: "bidirectional",
    protocol: "TCP",
    ports: ["445", "5000"],
    postureChecks: [],
  },
  {
    id: "pol4",
    name: "Monitoring",
    description: "Allow metrics scraping from all peers",
    active: false,
    sources: ["Admins"],
    destinations: ["All"],
    direction: "unidirectional",
    protocol: "TCP",
    ports: ["9100", "9090"],
    postureChecks: [],
  },
];

// Networks

export const networks: Network[] = [
  {
    id: "net1",
    name: "Home Network",
    resourcesCount: 2,
    policiesCount: 2,
    routingPeers: ["netbirdpi", "pve"],
    status: "active",
  },
  {
    id: "net2",
    name: "AWS — EU Central",
    resourcesCount: 3,
    policiesCount: 1,
    routingPeers: ["ubuntuvps"],
    status: "active",
  },
];

// Summary stats (derived)

export const stats = {
  totalPeers: peers.length,
  onlinePeers: peers.filter((p) => p.status === "online").length,
  offlinePeers: peers.filter((p) => p.status === "offline").length,
  activePolicies: policies.filter((p) => p.active).length,
  totalGroups: groups.length,
  totalNetworks: networks.length,
};
