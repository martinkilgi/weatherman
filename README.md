![Logo](frontend/src/assets/logos/Weatherman_github.png)

# Weatherman

## Setup instructions

You will need:
  * PostgreSQL


1. Clone it from the Github by copying the cloning link and entering it into command line with command 'git clone *link*'.
2. Navigate to the 'frontend' from the command line and enter 'npm install'.

## Task solving and time consumption

I pretty much started off with creating services on the front end to just receieve the needed data.
Then I added some initial design to the app for it to look a little easier for the eye.
Next I defined user inputs and connected them to the API functions.
Then I worked a little bit on the back end for it to be ready for data saving functionality, connected it to the database and created
necessary endpoints, repositories, models etc...
After I got ready with that, I just started to add other needed parts like a map and data saving function.
Finally I just tested that the whole created system was working as expected and did some little finishing touches.

Below is a list of activites with rough time estimates
  -- Design 4h
  -- Front-end functionality 5h
  -- Back-end functionality 3h

## Implement/Skip

As I was reading the instructions, I knew right away that I for sure wanted to try to implement map into this application just because I hadn't done it before.
For the data saving part, I just picked it because a very big part of this project just works on the front end, I also wanted to integrate a little bit of back end
to it.

## Biggest challenges

I don't really know if it categorizes under a big challenge, but one thing that I had to refactor many times was data structuring so that it fits from TypeScript file to HTML file and also is compatible with the backend without too much unnecessary code. Also, since I'm not fully familiar with Angular yet, I needed to check how communicating with backend services work, especially the asynchronous part.

## What did I learn?

As I mentioned in the previous section, I learned that I have to think the application structure more through before I start writing the code. Otherwise I have to
refactor the code which means I have to turn back to the previous thinking process and that takes a lot of time to get into again.
Although I'm doing a side project also with Angular, I still learnt about Angulars peculiarities and got a little more familiar how it works.
