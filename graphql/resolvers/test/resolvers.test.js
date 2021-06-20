import { createTestConn } from "./testConn";

import resolvers from "../";

const videoQuery = `
  query {
    getVideos {
      id
      url
      createdAt
      email
      votes {
        id
        email
        status
      }
    }
  }
`;

const registerMutation = `
  mutation register($email: String!, $password: String!) {
    register(
      registerInput: {
        email: $email
        password: $password
        confirmPassword: $password
      }
    ) {
      id
      email
      token
    }
  }
`;

const loginMutation = `
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      token
    }
  }
`;

const shareMutation = `
  mutation shareVideo($url: String!) {
    shareVideo(url: $url) {
      id
      url
      email
      votes {
        id
        email
        status
      }
    }
  }
`;

const voteVideoMutation = `
  mutation voteVideo($videoId: ID!, $status: String!) {
    voteVideo(videoId: $videoId, status: $status) {
      id
      votes {
        id
        email
        status
      }
    }
  }
`;

let conn;
jest.setTimeout(1000000);

beforeAll(async () => {
  conn = await createTestConn();
});

afterAll(async () => {
  await conn.close();
});

describe("resolvers", () => {
  it("video query", async () => {
    const videoList = await resolvers.Query.getVideos();
    expect(videoList.length).toBeGreaterThanOrEqual(4);
  });

  it("login mutation: correct user", async () => {
    const validUser = await resolvers.Mutation.login(null, {
      email: "test@gmail.com",
      password: "123",
    });
    expect(validUser.token.length).toBeGreaterThanOrEqual(1);
  });

  it("login mutation: incorrect user", async () => {
    let err = "";
    try {
      const invalidUser = await resolvers.Mutation.login(null, {
        email: "test12345@gmail.com",
        password: "123456789",
      });
    } catch (error) {
      err = error.toString();
    }
    expect(err).toContain("User not found");
  });

  // // Change the input to a new input to pass the test
  // it("register mutation: correct data", async () => {
  //   const input = {
  //     registerInput: {
  //       email: "testtest@gmail.com",
  //       password: "123",
  //       confirmPassword: "123",
  //     },
  //   };
  //   const validRegistration = await resolvers.Mutation.register(null, input);
  //   expect(validRegistration.token.length).toBeGreaterThanOrEqual(1);
  // });

  it("register mutation: existing email error", async () => {
    const input = {
      registerInput: {
        email: "test@gmail.com",
        password: "12345",
        confirmPassword: "12345",
      },
    };
    let err = "";
    try {
      const invalidRegistration = await resolvers.Mutation.register(
        null,
        input
      );
    } catch (error) {
      err = error.toString();
    }
    expect(err).toContain("Email is taken");
  });

  it("register mutation: email format error", async () => {
    const input = {
      registerInput: {
        email: "test12345",
        password: "12345",
        confirmPassword: "12345",
      },
    };
    let err = "";
    try {
      const invalidRegistration = await resolvers.Mutation.register(
        null,
        input
      );
    } catch (error) {
      err = error.toString();
    }
    expect(err).toContain("UserInputError");
  });

  it("register mutation: password error", async () => {
    const input = {
      registerInput: {
        email: "test12345",
        password: "",
        confirmPassword: "",
      },
    };
    let err = "";
    try {
      const invalidRegistration = await resolvers.Mutation.register(
        null,
        input
      );
    } catch (error) {
      err = error.toString();
    }
    expect(err).toContain("UserInputError");
  });

  it("register mutation: password error", async () => {
    const input = {
      registerInput: {
        email: "test12345",
        password: "123",
        confirmPassword: "456",
      },
    };
    let err = "";
    try {
      const invalidRegistration = await resolvers.Mutation.register(
        null,
        input
      );
    } catch (error) {
      err = error.toString();
    }
    expect(err).toContain("UserInputError");
  });

  it("video mutation: share error", async () => {
    let err = "";
    try {
      const invalidShare = await resolvers.Mutation.shareVideo(
        null,
        "www.youtube.com"
      );
    } catch (error) {
      err = error.toString();
    }
    expect(err).toContain("AuthenticationError");
  });

  it("video mutation: vote error", async () => {
    let err = "";
    try {
      const invalidVote = await resolvers.Mutation.voteVideo(null, {
        videoId: "60cde23f6589f01ad4287044",
        status: "down",
      });
    } catch (error) {
      err = error.toString();
    }
    expect(err).toContain("AuthenticationError");
  });
});
