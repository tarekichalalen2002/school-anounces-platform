import { users } from "./users";
import { Gaming, Sports } from "../assets/icons";

export const myPendingRooms = [
  {
    id: 1,
    requestedAt: "2021/08/01",
    title: "Travleing",
    totalInvitations: 42,
    approuvedInvitations: 12,
    icon: () => <Gaming color="white" />,
    description:
      "This is room for travelers to talk about traveling and stuff.",
  },
  {
    id: 2,
    requestedAt: "2021/08/01",
    title: "Food",
    totalInvitations: 38,
    approuvedInvitations: 22,
    icon: () => <Sports color="white" />,
    description:
      "This is a food room for food lovers to talk about food and stuff.",
  },
];

export const myRooms = [
  {
    id: 1,
    title: "Gaming",
    icon: () => <Gaming color="white" />,
    description:
      "This is a gaming room for gamers to talk about games and stuff.",
    users: [
      users[0],
      users[1],
      users[5],
      users[6],
      users[7],
      users[8],
      users[9],
    ],
    createdAt: "2021/08/01",
  },
  {
    id: 2,
    title: "Sports",
    icon: () => <Sports color="white" />,
    description:
      "This is a sports room for sports fans to talk about sports and stuff.",
    users: [
      users[0],
      users[1],
      users[5],
      users[6],
      users[7],
      users[8],
      users[9],
    ],
    createdAt: "2021/08/01",
  },
];
