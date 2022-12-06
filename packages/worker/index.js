import { parse } from 'cookie';

const handler = async function (event) {
	const { url } = event.request;
	const { pathname } = new URL(url);

	if (pathname === "/set_permission") {
		const response = new Response("", {
			status: 301,
		});
		response.headers.append("Location", "/");
    response.headers.append("Cache-Control", "no-store")
		response.headers.append(
			"Set-Cookie",
			`Uid=${Math.floor(Math.random() * 100)}; Path=/; HttpOnly; SameSite=Lax;`,
		);
		return response;
	}

  const cookie = parse(event.request.headers.get('Cookie') || '');
  const uid = Number(cookie.Uid);

  const permission = uid % 4;

  console.log(uid, permission)

  const request = new Request("https://7879-61-204-247-129.ap.ngrok.io/", {
    headers: {
      "shinyaigeek-profile-access-permission-level": permission
    }
  })

	return fetch(request);
};

addEventListener("fetch", (event) => {
	event.respondWith(handler(event));
});
