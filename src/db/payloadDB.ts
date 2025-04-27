import { AckPayloadType } from "../types/payload";

export const payloadDB: AckPayloadType[] = [
  {
    _id: "Test_id",
    sdid: "Test_true",
    sid: "Test_sid",
    acknowledge: "Test_ACk",
    status: true,
  },
  {
    _id: "Test_id_false",
    sdid: "Test_false",
    sid: "Test_sid_false",
    acknowledge: "Test_ACk_false",
    status: false,
  },
];
