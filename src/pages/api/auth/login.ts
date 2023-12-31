import axios from "axios";
import { withSessionRoute } from "@lib/withSession";
import { User } from "@services/user";

export default withSessionRoute(handler);

async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "Method not supported" });
  }

  if (!process.env.URL_SERVER_API) throw Error("Thiếu biến môi trường!");

  const { username, password } = req.body;

  req.headers.cookie = "";
  req.url = process.env.URL_SERVER_API + req.url;

  try {
    const response = await axios.post(req.url, {
      username,
      password,
    });

    const { accessToken, user } = response.data;

    // const resp = await axios.get(process.env.URL_SERVER_API + "/api/information", {
    //   headers: {
    //     authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    //   },
    // });

    const userCurrent: User = user;

    req.session.accessToken = accessToken;
    req.session.userCurrentRoleCode = userCurrent.role.code;

    await req.session.save();
    res.status(200).json({ message: "Login success" });
  } catch (err) {
    console.log(err);
    res.status(err?.response?.status || 500).json(err?.response?.data || "Server error !!!");
  }
}
