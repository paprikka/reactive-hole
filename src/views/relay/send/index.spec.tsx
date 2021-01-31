import { render, fireEvent } from "@testing-library/react";
import { Send } from ".";
import Peer from "peerjs";

jest.mock("peerjs", () => {
  class MockPeer {
    public static mocks = {
      connection: {
        on: (eventName: string, cb: () => void) => {
          if (eventName === "open") cb();
        },
        send: jest.fn(),
      },
    };
    on = (eventName: string, cb: (...args: any[]) => void) => {
      if (eventName === "open") return cb("peer_id_sender");
      if (eventName === "connection") {
        return cb(MockPeer.mocks.connection);
      }
    };
  }

  return MockPeer;
});

it("should render the waiting screen", () => {
  const { getByText } = render(<Send />);

  expect(getByText(/\[ drag a file here to upload \]/gi)).toBeTruthy();
});

it("should accept a file through drag and drop", async () => {
  const { getByText, findByText } = render(<Send />);

  const uploader = getByText(/\[ drag a file here to upload \]/gi);
  const mockFile = {} as File;

  fireEvent.drop(uploader, {
    dataTransfer: {
      files: [mockFile],
    },
  });

  await findByText(/\[ ready \]/gi);
});

it("should send the file when a peer connects", async () => {
  const { getByText, findByText } = render(<Send />);

  const uploader = getByText(/\[ drag a file here to upload \]/gi);
  const mockFile = {} as File;

  fireEvent.drop(uploader, {
    dataTransfer: {
      files: [mockFile],
    },
  });

  await findByText(/\[ ready \]/gi);
});
