import fs from "fs";
import path from "path";

// Important: Any code we write here will execute on server and won't available on the client side. Credentials can be used here!
function handler(req, res) {
	if (req.method === "POST") {
		const email = req.body.email; // Note: NextJs automatically parse the incoming request body and therefore the body will conatin the data!
		const feedbackText = req.body.text;

		const newFeedback = {
			id: new Date().toISOString(),
			email,
			text: feedbackText
		};

		// Remark: Store the data in a DB/File.
		const filePath = path.join(process.cwd(), "data", "feedback.json");
		const fileData = fs.readFileSync(filePath);
		const data = JSON.parse(fileData);
		data.push(newFeedback);
		// Warning: Don't check for server side error (5XX) in the browser console. Server side errors will be logged in the server's terminal!
		fs.writeFileSync(filePath, JSON.stringify(data)); // Note: Doing in blocking way!

		res.status(201).json({
			message: "200 = OK, 201 = Success",
			feedback: newFeedback
		});
	} else res.status(200).json({ message: "Hi Nayeem!" });
}

export default handler;
