# User Instructions:
Your local development environment organization should look something like this, with the addition of your own .env file. It should contain our main.js file and two other package.json files generated when installing the npm dependencies.
<br />

<br />
*To initialize npm, type on your terminal "npm init -y"
<br />

<br />
*After that, a default package.json file will be generated on your local development environment.
<br />

<br />
*To install the dependencies seen in our package.json file, type "npm i express mysql2 mysql dotenv"
<br />

<br />
*Nodemon is optional, but if you wish to install it type on your terminal "npm i nodemon -D" 
<br />

<br />
*To set up the nodemon command, rewrite under "scripts" on the package.json file something similar to what we wrote on ours.
<br />

<br />
*Create a .env file to connect to the database.
<br /> 

<br />
		*Write and save the following information in the file:

<br /> 
<br />
MYSQL_HOST='host'
<br />
MYSQL_USER='your user'
<br />
MYSQL_PASSWORD='your password'
<br />
MYSQL_DATABASE='database name'
