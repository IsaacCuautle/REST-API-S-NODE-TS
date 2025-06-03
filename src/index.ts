import server from "./server";

server.listen(3000, () => {
    console.log(`REST API is running on http://localhost:3000`);
})