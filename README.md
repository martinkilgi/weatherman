![Logo](frontend/src/assets/logos/Weatherman_github.png)

# Weatherman

## Setup instructions

You will need:
  * PostgreSQL (Server and preferrably PgAdmin)
  * IntelliJ Idea Ultimate


1. Clone it from the Github by copying the cloning link and entering it into command line with command ```git clone https://github.com/martinkilgi/weatherman.git```.
2. Navigate to the 'frontend' from the command line and enter ```npm install```.
3. Start PostgreSQL server (if it's not running yet), open PgAdmin and log in with the credentials you set during installation.
4. Under 'Databases' create a new database named "weatherman"
5. Open 'weatherman_backend' in IntelliJ Idea
6. Click on 'Database' on the ribbon on the right side to connect the backend to the database.
7. Click on '+' sign -> 'Data Source' -> 'PostgreSQL' and insert your database name, user and password. After that, test connection with the button in the left bottom.
8. Open file named 'application.properties' in 'Resources' folder and configure it according to your database.
9. Start backend service by clicking on the green arrow (or Shift+F10) on the top ribbon.
10. Being in a 'frontend' folder, type ```ng serve --open``` for the front end to start.

## Task solving and time consumption

I pretty much started off with creating services on the front end to just receieve the needed data.
Then I added some initial design to the app for it to look a little easier for the eye.
Next I defined user inputs and connected them to the API functions.
Then I worked a little bit on the back end for it to be ready for data saving functionality, connected it to the database and created
necessary endpoints, repositories, models etc...
After I got ready with that, I just started to add other needed parts like a map and data saving function.
Finally I just tested that the whole created system was working as expected and did some little finishing touches.

In some places I had to improvise. For example I made it so that the user can only choose between one to three days to get forecasts about because
one's API free version only returns forecast for the 3 next days. Also since the precipitation info varies (one API returns it in millimeters, one returns boolean
if it rains or not and one return precipitation chance in percents) I made correctures about this in some places too.

Below is a list of activites with very rough time estimates
  * Design 6h
  * Front-end functionality 8h
  * Back-end functionality 4h

## Implement/Skip

As I was reading the instructions, I knew right away that I for sure wanted to try to implement map into this application just because I hadn't done it before.
For the data saving part, I just picked it because a very big part of this project just works on the front end, I also wanted to integrate a little bit of back end
to it. The only stage I skipped was the automatic scheduling one just because it didn't feel to add a lot of value to the project in this context.

## Biggest challenges

I don't really know if it categorizes under a big challenge, but one thing that I had to refactor many times was data structuring so that it fits from TypeScript file to HTML file and also is compatible with the backend without too much unnecessary code. Also, since I'm not fully familiar with Angular yet, I needed to check how communicating with backend services work, especially the asynchronous part.

## What did I learn?

As I mentioned in the previous section, I learned that I have to think the application structure more through before I start writing the code. Otherwise I have to
refactor the code which means I have to turn back to the previous thinking process and that takes a lot of time to get into again.
Although I'm doing a side project also with Angular, I still learnt about Angulars peculiarities and got a little more familiar how it works.
