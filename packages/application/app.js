const fastify = require("fastify");

const PERMISSION_HEADER = "shinyaigeek-profile-access-permission-level";

const app = fastify();

app.get("/", async (request, response) => {
	const permission = Number(request.headers[PERMISSION_HEADER] ?? 0);
	response.header("Content-Type", "text/html");

	if (permission === 0) {
		return response.send(buildBody("<p>you have no permission!!</p>"));
	}

	let message = "<ul>";

	if (permission > 0) {
		message += "<li>shinyaigeek is Software Engineer</li>";
	}

	if (permission > 1) {
		message += "<li>shinyaigeek is Shinobu Hayashi</li>";
	}

	if (permission > 2) {
		message += "<li>shinyaigeek loves Nikkei!!";
	}

	message += "</ul>";

	response.send(message);
});

const buildBody = function (message) {
	return `<html><head><title>shinyaigeek's profile</title></head><body><h1>This is Shinyaigeek's profile page</h1>${message}</body></html>`;
};

const start = async () => {
	try {
		await app.listen({ port: 3000 });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};
start();
