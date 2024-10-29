## Intro
Climbing scales are defined in the '.csv' files within this folder.

Each discipline have dedicated files:
 - [aid](./aid.csv) climbing
 - [bouldering](./boulder.csv)
 - [ice](./ice.csv) climbing
 - [sport/trad](./routes.csv) climbing

In each file is defined a *score* representing a discrete virtual grade starting from 0.
For each score it is reported the correspective grade for each supported scale.
A grade in a given scale (e.g. french 6a) can corrispond to multiple scores.

## Adding/Editing scales

The main step to add or modify a scale is to add or modify the correspective column in the desired csv file.

Scales are converted into json files with [this](./csvtojson.ts) script (see instruction within the script).
