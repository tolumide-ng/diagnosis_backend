1. Clone this repo
2. Create a local image of this with `docker build -t prefered-name`
3. Run the container with `docker run --rm -v $(pwd)/app:/src/app -v $(pwd)/public:/src/public -p 3000:3000 node-docker`
4. Exit from the container on your terminal with `ctrl + c`
5. Start your database using the Postgres Image with: `docker run --rm -v $(pwd)/app:/src/app -v $(pwd)/public:/src/public -p 3000:3000 node-docker`
