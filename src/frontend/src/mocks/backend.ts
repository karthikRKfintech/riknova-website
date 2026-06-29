import type { backendInterface } from "../backend";

export const mockBackend: backendInterface = {
  __demoRequests: async () => [
    {
      id: BigInt(1),
      name: "John Smith",
      createdAt: BigInt(Date.now()),
      email: "john@example.com",
      company: "Acme Finance",
      message: "Interested in a demo of Finance Pro",
    },
    {
      id: BigInt(2),
      name: "Sarah Johnson",
      createdAt: BigInt(Date.now()),
      email: "sarah@example.com",
      company: "Global Lending",
      message: "Looking for enterprise solution",
    },
  ],
  __nextDemoId: async () => BigInt(3),
  listDemoRequests: async () => [
    {
      id: BigInt(1),
      name: "John Smith",
      createdAt: BigInt(Date.now()),
      email: "john@example.com",
      company: "Acme Finance",
      message: "Interested in a demo of Finance Pro",
    },
    {
      id: BigInt(2),
      name: "Sarah Johnson",
      createdAt: BigInt(Date.now()),
      email: "sarah@example.com",
      company: "Global Lending",
      message: "Looking for enterprise solution",
    },
  ],
  submitDemoRequest: async (req) => ({
    id: BigInt(3),
    name: req.name,
    createdAt: BigInt(Date.now()),
    email: req.email,
    company: req.company,
    message: req.message,
  }),
};
